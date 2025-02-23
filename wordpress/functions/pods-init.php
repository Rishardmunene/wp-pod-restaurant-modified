<?php

function initialize_pods() {
    if (!function_exists('pods')) {
        return;
    }

    // Hook into pods pre-save to sync with WordPress title
    add_filter('pods_api_pre_save_pod_item', 'sync_pods_with_wp_title', 10, 2);
    
    // Hook into pods for dynamic field creation
    add_action('pods_api_post_save_pod_item', 'handle_dynamic_field_creation', 10, 3);

    // Register REST API endpoints for Pods
    add_action('rest_api_init', function () {
        // Dynamic field creation endpoint
        register_rest_route('wp/v2', '/create-field', array(
            'methods' => 'POST',
            'callback' => 'create_dynamic_field',
            'permission_callback' => 'check_admin_permissions',
            'args' => array(
                'pod_name' => array(
                    'required' => true,
                    'sanitize_callback' => 'sanitize_text_field'
                ),
                'field_name' => array(
                    'required' => true,
                    'sanitize_callback' => 'sanitize_text_field'
                ),
                'field_type' => array(
                    'required' => true,
                    'sanitize_callback' => 'sanitize_text_field'
                )
            )
        ));

        // Restaurant endpoints
        register_rest_route('wp/v2', '/restaurant', array(
            'methods' => 'GET',
            'callback' => 'get_restaurants',
            'permission_callback' => 'check_restaurant_permissions',
            'args' => array(
                'page' => array(
                    'default' => 1,
                    'sanitize_callback' => 'absint'
                ),
                'per_page' => array(
                    'default' => 12,
                    'sanitize_callback' => 'absint'
                ),
                'cuisine_type' => array(
                    'default' => '',
                    'sanitize_callback' => 'sanitize_text_field'
                ),
                'rating' => array(
                    'default' => '',
                    'sanitize_callback' => 'absint'
                ),
                'price_range' => array(
                    'default' => '',
                    'sanitize_callback' => 'sanitize_text_field'
                ),
                'location' => array(
                    'default' => '',
                    'sanitize_callback' => 'sanitize_text_field'
                ),
                'display_type' => array(
                    'default' => 'grid',
                    'enum' => array('grid', 'list', 'masonry'),
                    'sanitize_callback' => 'sanitize_text_field'
                )
            )
        ));
        
        register_rest_route('wp/v2', '/restaurant/(?P<id>\d+)', array(
            'methods' => 'GET',
            'callback' => 'get_single_restaurant',
            'permission_callback' => '__return_true'
        ));

        // Menu endpoints
        register_rest_route('wp/v2', '/menu', array(
            'methods' => 'GET',
            'callback' => 'get_menus',
            'permission_callback' => '__return_true'
        ));

        register_rest_route('wp/v2', '/menu-item', array(
            'methods' => 'GET',
            'callback' => 'get_menu_items',
            'permission_callback' => '__return_true'
        ));
    });
}
add_action('init', 'initialize_pods');

// New permission callback functions
function check_restaurant_permissions($request) {
    // Add your permission logic here
    return true;
}

function check_menu_permissions($request) {
    // Add your permission logic here
    return true;
}

function get_restaurants($request) {
    global $wpdb;
    
    $params = array(
        'limit' => $request['per_page'],
        'page' => $request['page'],
        'where' => $wpdb->prepare('post_status.meta_value = %s', 'publish')
    );

    // Build where clause using prepared statements
    if (!empty($request['cuisine_type'])) {
        $params['where'] .= $wpdb->prepare(" AND cuisine_types LIKE %s", '%' . $wpdb->esc_like($request['cuisine_type']) . '%');
    }

    if (!empty($request['rating'])) {
        $params['where'] .= $wpdb->prepare(" AND rating >= %d", $request['rating']);
    }

    if (!empty($request['price_range'])) {
        $params['where'] .= $wpdb->prepare(" AND price_range = %s", $request['price_range']);
    }

    if (!empty($request['location'])) {
        $params['where'] .= $wpdb->prepare(" AND address LIKE %s", '%' . $wpdb->esc_like($request['location']) . '%');
    }
    
    $pods = pods('restaurant', $params);
    $restaurants = array();
    
    while ($pods->fetch()) {
        $restaurants[] = array(
            'id' => $pods->field('ID'),
            'restaurant_name' => $pods->field('restaurant_name'),
            'restaurant_logo' => $pods->field('restaurant_logo'),
            'restaurant_images' => $pods->field('restaurant_images'),
            'cuisine_types' => $pods->field('cuisine_types'),
            'address' => $pods->field('address'),
            'coordinates' => $pods->field('coordinates'),
            'operating_hours' => $pods->field('operating_hours'),
            'price_range' => $pods->field('price_range'),
            'rating' => $pods->field('rating')
        );
    }

    $total = $pods->total();
    $total_pages = ceil($total / $request['per_page']);

    return array(
        'data' => $restaurants,
        'meta' => array(
            'total' => $total,
            'pages' => $total_pages,
            'current_page' => $request['page'],
            'display_type' => $request['display_type']
        )
    );
}

function get_single_restaurant($request) {
    $id = $request['id'];
    $pod = pods('restaurant', $id);
    
    if (!$pod->exists()) {
        return new WP_Error('not_found', 'Restaurant not found', array('status' => 404));
    }
    
    return array(
        'id' => $pod->field('ID'),
        'restaurant_name' => $pod->field('restaurant_name'),
        'restaurant_logo' => $pod->field('restaurant_logo'),
        'restaurant_images' => $pod->field('restaurant_images'),
        'cuisine_types' => $pod->field('cuisine_types'),
        'address' => $pod->field('address'),
        'coordinates' => $pod->field('coordinates'),
        'operating_hours' => $pod->field('operating_hours'),
        'menus' => get_restaurant_menus($id)
    );
}

function get_restaurant_menus($restaurant_id) {
    $params = array(
        'where' => 'parent_restaurant.meta_value = ' . absint($restaurant_id)
    );
    
    $pods = pods('menu', $params);
    $menus = array();
    
    while ($pods->fetch()) {
        $menus[] = array(
            'id' => $pods->field('ID'),
            'menu_name' => $pods->field('menu_name'),
            'menu_description' => $pods->field('menu_description'),
            'menu_category' => $pods->field('menu_category')
        );
    }
    
    return $menus;
}

function get_menu_items($request) {
    $menu_id = $request['menu_id'] ?? null;
    
    $params = array(
        'where' => 'post_status.meta_value = "publish"'
    );
    
    if ($menu_id) {
        $params['where'] .= ' AND parent_menu.meta_value = ' . absint($menu_id);
    }
    
    $pods = pods('menu_item', $params);
    $items = array();
    
    while ($pods->fetch()) {
        $items[] = array(
            'id' => $pods->field('ID'),
            'item_name' => $pods->field('item_name'),
            'item_description' => $pods->field('item_description'),
            'item_price' => $pods->field('item_price'),
            'item_images' => $pods->field('item_images'),
            'ingredients' => $pods->field('ingredients'),
            'allergens' => $pods->field('allergens'),
            'nutritional_info' => $pods->field('nutritional_info'),
            'preparation_time' => $pods->field('preparation_time')
        );
    }
    
    return $items;
}

function sync_pods_with_wp_title($pieces, $is_new_item) {
    // Get the pod configuration
    $pod = pods($pieces['pod']);
    
    // List of pods that should sync with WP title
    $title_sync_pods = array(
        'restaurant' => 'restaurant_name',
        'menu' => 'menu_name',
        'menu_item' => 'item_name',
        'base_page' => 'page_title',
        'restaurant_listing_page' => 'page_title'
    );
    
    // Check if this pod should sync with WP title
    if (isset($title_sync_pods[$pieces['pod']])) {
        $title_field = $title_sync_pods[$pieces['pod']];
        
        // If the title field exists in the data, sync it with post_title
        if (isset($pieces['data'][$title_field])) {
            $pieces['data']['post_title'] = $pieces['data'][$title_field];
            $pieces['data']['post_name'] = sanitize_title($pieces['data'][$title_field]);
        }
    }
    
    return $pieces;
}

function handle_dynamic_field_creation($pieces, $id, $pod) {
    if (!empty($pieces['data']['new_fields'])) {
        $new_fields = json_decode($pieces['data']['new_fields'], true);
        
        if (is_array($new_fields)) {
            foreach ($new_fields as $field) {
                create_dynamic_field_internal($pieces['pod'], $field);
            }
        }
    }
}

// Add example usage for dynamic field creation
add_action('pods_api_post_save_pod_item_restaurant', function($pieces, $id, $pod) {
    if (!$pod->field_exists('cuisine_types')) {
        create_dynamic_field_internal('restaurant', array(
            'name' => 'cuisine_types',
            'type' => 'pick'
        ));
    }
}, 10, 3);
