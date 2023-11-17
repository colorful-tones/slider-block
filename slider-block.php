<?php
/**
 * Plugin Name:       Slider Block
 * Description:       A slider carousel block for WordPress with SwiperJS.
 * Requires at least: 6.4
 * Requires PHP:      7.0
 * Version:           0.1.4
 * Author:            Damon Cook
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        null
 * Text Domain:       slider-block
 *
 * @package           colorful-tones/slider-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function slider_block_init() {
	// Register Slide block.
	register_block_type( __DIR__ . '/build/blocks/slide' );
	// Register Slider block.
	register_block_type( __DIR__ . '/build/blocks/slider' );
}
add_action( 'init', 'slider_block_init' );
