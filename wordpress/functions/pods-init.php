<?php
/**
 * Pods initialization
 */

// Check if Pods is active
if (!function_exists('pods')) {
    return;
}

function initialize_pods() {
    // Register Restaurant post type
    pods_register_type('post_type', 'restaurant', array(
        'label' => 'Restaurant',
        'labels' => array(
            'name' => 'Restaurants',
            'singular_name' => 'Restaurant'
        ),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_nav_menus' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'thumbnail')
    ));

    // Register Restaurant Listing Page post type
    pods_register_type('post_type', 'restaurant_listing_page', array(
        'label' => 'Restaurant Listing Page',
        'labels' => array(
            'name' => 'Restaurant Listing Pages',
            'singular_name' => 'Restaurant Listing Page'
        ),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_nav_menus' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor')
    ));
}
add_action('init', 'initialize_pods');

// Add meta fields for Restaurant Listing Page
function add_restaurant_listing_fields() {
    if (!function_exists('pods_register_field')) {
        return;
    }

    // Register fields for restaurant_listing_page
    pods_register_field('restaurant_listing_page', 'display_type', array(
        'label' => 'Display Type',
        'type' => 'pick',
        'pick_format_type' => 'single',
        'pick_format_single' => 'radio',
        'pick_object' => 'custom-simple',
        'options' => array(
            'grid' => 'Grid',
            'list' => 'List',
            'masonry' => 'Masonry'
        ),
        'default' => 'grid'
    ));

    pods_register_field('restaurant_listing_page', 'items_per_page', array(
        'label' => 'Items Per Page',
        'type' => 'number',
        'default' => 12
    ));

    pods_register_field('restaurant_listing_page', 'enable_filters', array(
        'label' => 'Enable Filters',
        'type' => 'boolean',
        'default' => true
    ));

    // Register fields for restaurant
    pods_register_field('restaurant', 'restaurant_name', array(
        'label' => 'Restaurant Name',
        'type' => 'text',
        'required' => true
    ));

    pods_register_field('restaurant', 'restaurant_logo', array(
        'label' => 'Logo',
        'type' => 'file',
        'file_type' => 'image'
    ));

    pods_register_field('restaurant', 'cuisine_types', array(
        'label' => 'Cuisine Types',
        'type' => 'pick',
        'pick_format_type' => 'multi',
        'pick_object' => 'custom-simple',
        'options' => array(
            'asian' => 'Asian',
            'italian' => 'Italian',
            'mexican' => 'Mexican',
            'american' => 'American',
            'mediterranean' => 'Mediterranean'
        )
    ));
}
add_action('init', 'add_restaurant_listing_fields'); 