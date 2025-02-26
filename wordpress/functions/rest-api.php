<?php
/**
 * REST API endpoints for WP React Pods
 */

// Check if REST API is available
if (!defined('REST_API_VERSION')) {
    return;
}

/**
 * Register custom REST API endpoints
 */
function register_pods_rest_routes() {
    // Get all restaurants
    register_rest_route('wp-react-pods/v1', '/restaurants', array(
        'methods' => 'GET',
        'callback' => 'get_restaurants_callback',
        'permission_callback' => '__return_true'
    ));

    // Get single restaurant
    register_rest_route('wp-react-pods/v1', '/restaurants/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'get_single_restaurant_callback',
        'permission_callback' => '__return_true'
    ));

    // Get restaurant listing page settings
    register_rest_route('wp-react-pods/v1', '/restaurant-listing/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'get_restaurant_listing_callback',
        'permission_callback' => '__return_true'
    ));
}
add_action('rest_api_init', 'register_pods_rest_routes');

/**
 * Callback for getting all restaurants
 */
function get_restaurants_callback($request) {
    $pods = pods('restaurant');
    if (!$pods->fetch()) {
        return new WP_Error('no_restaurants', 'No restaurants found', array('status' => 404));
    }

    $restaurants = array();
    while ($pods->fetch()) {
        $restaurants[] = array(
            'id' => $pods->field('id'),
            'restaurant_name' => $pods->field('restaurant_name'),
            'restaurant_logo' => $pods->field('restaurant_logo'),
            'cuisine_types' => $pods->field('cuisine_types'),
            'address' => $pods->field('address'),
            'operating_hours' => $pods->field('operating_hours'),
            'price_range' => $pods->field('price_range'),
            'rating' => $pods->field('rating')
        );
    }

    return rest_ensure_response($restaurants);
}

/**
 * Callback for getting a single restaurant
 */
function get_single_restaurant_callback($request) {
    $id = $request['id'];
    $pods = pods('restaurant', $id);

    if (!$pods->exists()) {
        return new WP_Error('no_restaurant', 'Restaurant not found', array('status' => 404));
    }

    $restaurant = array(
        'id' => $pods->field('id'),
        'restaurant_name' => $pods->field('restaurant_name'),
        'restaurant_logo' => $pods->field('restaurant_logo'),
        'restaurant_images' => $pods->field('restaurant_images'),
        'cuisine_types' => $pods->field('cuisine_types'),
        'address' => $pods->field('address'),
        'coordinates' => $pods->field('coordinates'),
        'operating_hours' => $pods->field('operating_hours'),
        'price_range' => $pods->field('price_range'),
        'rating' => $pods->field('rating'),
        'menus' => $pods->field('menus')
    );

    return rest_ensure_response($restaurant);
}

/**
 * Callback for getting restaurant listing page settings
 */
function get_restaurant_listing_callback($request) {
    $id = $request['id'];
    $pods = pods('restaurant_listing_page', $id);

    if (!$pods->exists()) {
        return new WP_Error('no_page', 'Restaurant listing page not found', array('status' => 404));
    }

    $settings = array(
        'display_type' => $pods->field('display_type'),
        'items_per_page' => (int) $pods->field('items_per_page'),
        'enable_filters' => (bool) $pods->field('enable_filters')
    );

    return rest_ensure_response($settings);
} 