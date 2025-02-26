<?php
/**
 * Theme functions and definitions
 */

// Include Pods initialization
$pods_init_file = get_template_directory() . '/functions/pods-init.php';
if (file_exists($pods_init_file)) {
    require_once $pods_init_file;
}

// Add theme support
function wp_react_pods_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-templates');
}
add_action('after_setup_theme', 'wp_react_pods_setup');

// Register page templates
function wp_react_pods_add_templates($templates) {
    $templates['templates/restaurant-listing.php'] = 'Restaurant Listing';
    return $templates;
}
add_filter('theme_page_templates', 'wp_react_pods_add_templates');

// Handle WordPress 6.4+ style enqueuing
function wp_react_pods_enqueue_wp_styles() {
    if (function_exists('wp_enqueue_emoji_styles')) {
        wp_enqueue_emoji_styles();
    }
    
    if (function_exists('wp_enqueue_admin_bar_header_styles')) {
        wp_enqueue_admin_bar_header_styles();
    }
    
    if (function_exists('wp_enqueue_admin_bar_bump_styles')) {
        wp_enqueue_admin_bar_bump_styles();
    }
    
    if (function_exists('wp_enqueue_block_template_skip_link')) {
        wp_enqueue_block_template_skip_link();
    }
}
add_action('wp_enqueue_scripts', 'wp_react_pods_enqueue_wp_styles');

// Remove wp_enqueue_scripts action for development
if (defined('WP_DEBUG') && WP_DEBUG) {
    // Don't remove all actions, just remove specific ones
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
}

// Add CORS headers for development
function add_cors_http_headers() {
    if (defined('WP_DEBUG') && WP_DEBUG) {
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        } else {
            header('Access-Control-Allow-Origin: http://localhost:5173');
        }
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
        
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            status_header(200);
            exit();
        }
    }
}
add_action('init', 'add_cors_http_headers');
add_action('rest_api_init', 'add_cors_http_headers');

// Register REST API endpoints
function register_restaurant_endpoints() {
    register_rest_route('wp-react-pods/v1', '/restaurants', array(
        'methods' => 'GET',
        'callback' => 'get_restaurants',
        'permission_callback' => '__return_true'
    ));
}
add_action('rest_api_init', 'register_restaurant_endpoints');

function get_restaurants() {
    $args = array(
        'post_type' => 'restaurant',
        'posts_per_page' => -1,
        'post_status' => 'publish'
    );

    $restaurants = get_posts($args);
    $formatted_restaurants = array();

    foreach ($restaurants as $restaurant) {
        $cuisine_types = get_post_meta($restaurant->ID, 'cuisine_types', true);
        // Ensure cuisine_types is always an array
        if (!is_array($cuisine_types)) {
            $cuisine_types = $cuisine_types ? array($cuisine_types) : array();
        }

        $formatted_restaurants[] = array(
            'id' => $restaurant->ID,
            'restaurant_name' => get_post_meta($restaurant->ID, 'restaurant_name', true),
            'restaurant_logo' => get_post_meta($restaurant->ID, 'restaurant_logo', true),
            'cuisine_types' => $cuisine_types,
            'address' => get_post_meta($restaurant->ID, 'address', true),
            'rating' => get_post_meta($restaurant->ID, 'rating', true),
            'price_range' => get_post_meta($restaurant->ID, 'price_range', true)
        );
    }

    return array(
        'restaurants' => $formatted_restaurants,
        'total' => count($formatted_restaurants),
        'page' => 1,
        'per_page' => -1
    );
}

// Remove specific scripts in development mode
function remove_default_scripts() {
    if (defined('WP_DEBUG') && WP_DEBUG) {
        wp_dequeue_script('wp-embed');
        wp_dequeue_script('jquery');
    }
}
add_action('wp_enqueue_scripts', 'remove_default_scripts', 100); 

/**
 * Synchronize custom field values with WordPress post title
 */
function wp_react_pods_sync_post_titles($pieces, $is_new_item, $id) {
    $pod_name = $pieces['params']->pod;
    
    // Define field mappings for different post types
    $title_field_mappings = array(
        'restaurant' => 'restaurant_name',
        'menu' => 'menu_name',
        'menu_item' => 'item_name'
    );
    
    // Check if we have a mapping for this pod
    if (isset($title_field_mappings[$pod_name])) {
        $field_name = $title_field_mappings[$pod_name];
        $new_title = pods_field_raw($pod_name, $id, $field_name);
        
        // Ensure we have a string value
        if (!empty($new_title) && is_string($new_title)) {
            wp_update_post(array(
                'ID' => $id,
                'post_title' => sanitize_text_field($new_title)
            ));
        }
    }
    
    return $pieces;
}

// Add hooks for each post type
add_action('pods_api_post_save_pod_item_restaurant', 'wp_react_pods_sync_post_titles', 10, 3);
add_action('pods_api_post_save_pod_item_menu', 'wp_react_pods_sync_post_titles', 10, 3);
add_action('pods_api_post_save_pod_item_menu_item', 'wp_react_pods_sync_post_titles', 10, 3);