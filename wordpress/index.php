<?php
/**
 * The main template file
 *
 * @package wp-react-pods
 */

get_header(); ?>

<div id="root" 
     data-page-type="<?php echo get_post_type(); ?>"
     data-initial-data="<?php 
        echo esc_attr(wp_json_encode([
            'post_type' => get_post_type(),
            'post_id' => get_the_ID(),
            'template' => get_page_template_slug()
        ])); 
     ?>"
></div>

<?php get_footer(); ?> 