<?php namespace cmk\swiperGallery;

/**
 * Plugin Name:       Swiper Gallery
 * Description:       Gutenberg Block providing a media Gallery based on Swiper.js.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Cédric Moris Kelly
 * Author URI:        http://moriskelly.com
 * License:           GPL-3.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       swiper-gallery
 *
 * @package CreateBlock
 */

defined( 'ABSPATH' ) || exit;

add_action( 'init', function () {
	register_block_type( __DIR__ . '/build/swiper-gallery' );
} );

