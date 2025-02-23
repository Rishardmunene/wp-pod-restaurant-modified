<?php
/**
 * The main template file
 *
 * @package wp-react-pods
 */

get_header(); ?>

<div id="root"></div>

<?php
// Enqueue React built files
function enqueue_react_app() {
    // Get the manifest file
    $manifest_path = get_template_directory() . '/bundled/manifest.json';
    
    if (file_exists($manifest_path)) {
        $manifest = json_decode(file_get_contents($manifest_path), true);
        
        // Enqueue main CSS file
        if (isset($manifest['src/main.css'])) {
            wp_enqueue_style(
                'react-app',
                get_template_directory_uri() . '/bundled/' . $manifest['src/main.css']['file'],
                [],
                null
            );
        }
        
        // Enqueue main JS file
        if (isset($manifest['src/main.tsx'])) {
            wp_enqueue_script(
                'react-app',
                get_template_directory_uri() . '/bundled/' . $manifest['src/main.tsx']['file'],
                [],
                null,
                true
            );
        }
    } else {
        // Development mode - use Vite dev server
        function vite_head_module_hook() {
            echo '<script type="module" src="http://localhost:3000/@vite/client"></script>';
            echo '<script type="module" src="http://localhost:3000/src/main.tsx"></script>';
        }
        add_action('wp_head', 'vite_head_module_hook');
    }
}
add_action('wp_enqueue_scripts', 'enqueue_react_app');

get_footer();
