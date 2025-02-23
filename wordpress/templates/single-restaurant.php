<?php
/**
 * Template Name: Single Restaurant
 * 
 * @package wp-react-pods
 */

get_header();

$restaurant = pods('restaurant', get_the_ID());
?>

<div id="root" 
     data-page-type="single-restaurant"
     data-initial-data="<?php echo esc_attr(wp_json_encode([
         'id' => get_the_ID(),
         'restaurant_name' => $restaurant->field('restaurant_name'),
         'restaurant_logo' => $restaurant->field('restaurant_logo'),
         'restaurant_images' => $restaurant->field('restaurant_images'),
         'cuisine_types' => $restaurant->field('cuisine_types'),
         'address' => $restaurant->field('address'),
         'coordinates' => $restaurant->field('coordinates'),
         'operating_hours' => $restaurant->field('operating_hours'),
         'price_range' => $restaurant->field('price_range'),
         'rating' => $restaurant->field('rating'),
         'menus' => get_restaurant_menus(get_the_ID())
     ])); ?>"
></div>

<?php get_footer(); ?>
