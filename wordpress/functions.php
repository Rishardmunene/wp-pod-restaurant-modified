<?php
/**
 * Theme functions and definitions
 *
 * @package wp-react-pods
 */

// Include Pods initialization
require_once get_template_directory() . '/functions/pods-init.php';

// Add theme support
function wp_react_pods_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', [
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ]);
}
add_action('after_setup_theme', 'wp_react_pods_setup');

// Add CORS headers for development
function add_cors_headers() {
    if (defined('WP_DEBUG') && WP_DEBUG) {
        header('Access-Control-Allow-Origin: http://localhost:3000');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
    }
}
add_action('init', 'add_cors_headers');

// Add REST API endpoints
function register_rest_routes() {
    register_rest_route('wp-react/v1', '/settings', [
        'methods' => 'GET',
        'callback' => function () {
            return [
                'site_name' => get_bloginfo('name'),
                'site_description' => get_bloginfo('description'),
                'home_url' => home_url(),
                'admin_url' => admin_url(),
                'template_directory' => get_template_directory_uri(),
            ];
        },
        'permission_callback' => '__return_true',
    ]);
}
add_action('rest_api_init', 'register_rest_routes');
