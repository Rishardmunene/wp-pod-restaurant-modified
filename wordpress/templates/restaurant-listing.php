<?php
/**
 * Template Name: Restaurant Listing
 * 
 * @package wp-react-pods
 */

get_header();
?>

<div id="root" 
     data-page-type="restaurant-listing"
     data-initial-data="<?php echo esc_attr(wp_json_encode([
         'navigation_type' => get_field('navigation_type'),
         'page_layout' => get_field('page_layout'),
         'enable_hero' => get_field('enable_hero'),
         'hero_type' => get_field('hero_type'),
         'hero_content' => get_field('hero_content'),
         'hero_images' => get_field('hero_images'),
         'display_type' => get_field('display_type', 'grid'),
         'items_per_page' => get_field('items_per_page', 12),
         'enable_filters' => get_field('enable_filters', true)
     ])); ?>"
></div>

<?php get_footer(); ?>
