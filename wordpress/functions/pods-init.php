<?php

function initialize_pods() {
    if (!function_exists('pods')) {
        return;
    }

    // Register REST API endpoints for Pods
    add_action('rest_api_init', function () {
        // Restaurant endpoints
        register_rest_route('wp/v2', '/restaurant', array(
            'methods' => 'GET',
            'callback' => 'get_restaurants',
            'permission_callback' => '__return_true',
            'args' => array(
                'page' => array(
                    'default' => 1,
                    'sanitize_callback' => 'absint'
                ),
                'per_page' => array(
                    'default' => 10,
                    'sanitize_callback' => 'absint'
                ),
                'cuisine_type' => array(
                    'default' => '',
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

function get_restaurants($request) {
    $params = array(
        'limit' => $request['per_page'],
        'page' => $request['page'],
        'where' => 'post_status.meta_value = "publish"'
    );

    if (!empty($request['cuisine_type'])) {
        $params['where'] .= " AND cuisine_types LIKE '%" . esc_sql($request['cuisine_type']) . "%'";
    }
    
    $pods = pods('restaurant', $params);
    $restaurants = array();
    
    while ($pods->fetch()) {
        $restaurants[] = array(
            'id' => $pods->field('ID'),
            'restaurant_name' => $pods->field('restaurant_name'),
            'restaurant_logo' => $pods->field('restaurant_logo'),
            'cuisine_types' => $pods->field('cuisine_types'),
            'address' => $pods->field('address'),
            'coordinates' => $pods->field('coordinates'),
            'operating_hours' => $pods->field('operating_hours')
        );
    }

    $total = $pods->total();
    $total_pages = ceil($total / $request['per_page']);

    return array(
        'data' => $restaurants,
        'meta' => array(
            'total' => $total,
            'pages' => $total_pages,
            'current_page' => $request['page']
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
