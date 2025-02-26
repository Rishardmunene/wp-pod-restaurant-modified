<?php
/**
 * Template Name: Restaurant Listing
 * 
 * @package wp-react-pods
 */

get_header();

// Get initial data for React
$initial_data = array(
    'post_type' => get_post_type(),
    'post_id' => get_the_ID(),
    'template' => get_page_template_slug(),
    'settings' => array(
        'display_type' => get_post_meta(get_the_ID(), 'display_type', true) ?: 'grid',
        'items_per_page' => get_post_meta(get_the_ID(), 'items_per_page', true) ?: 12,
        'enable_filters' => get_post_meta(get_the_ID(), 'enable_filters', true) ?: true
    )
);

// Debug output
echo '<!-- Debug Info -->';
echo '<!-- Template: ' . get_page_template_slug() . ' -->';
echo '<!-- Post Type: ' . get_post_type() . ' -->';
echo '<!-- Post ID: ' . get_the_ID() . ' -->';
?>

<div id="root"></div>

<script>
    window.wpReactPodsData = <?php echo json_encode([
        'initialData' => $initial_data,
        'apiUrl' => rest_url('wp-react-pods/v1'),
        'nonce' => wp_create_nonce('wp_rest')
    ]); ?>;
</script>

<?php if (defined('WP_DEBUG') && WP_DEBUG): ?>
    <script type="module">
        import RefreshRuntime from 'http://localhost:5173/@react-refresh'
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
    </script>
    <script type="module" src="http://localhost:5173/@vite/client"></script>
    <script type="module" src="http://localhost:5173/src/main.tsx"></script>
<?php else: ?>
    <?php
    $manifest_path = get_template_directory() . '/bundled/manifest.json';
    if (file_exists($manifest_path)) {
        $manifest = json_decode(file_get_contents($manifest_path), true);
        foreach ($manifest as $file) {
            if (str_ends_with($file['file'], '.css')) {
                wp_enqueue_style('wp-react-pods-' . basename($file['file']), get_template_directory_uri() . '/bundled/' . $file['file']);
            }
            if (str_ends_with($file['file'], '.js')) {
                wp_enqueue_script('wp-react-pods-' . basename($file['file']), get_template_directory_uri() . '/bundled/' . $file['file'], array(), null, true);
            }
        }
    }
    ?>
<?php endif; ?>

<?php get_footer(); ?> 