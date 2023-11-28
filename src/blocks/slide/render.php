<?php
/**
 * Slide
 *
 * @var array     $attributes Block attributes.
 * @var string    $content    Block default content.
 * @var \WP_Block $block      Block instance.
 *
 * @package wpe/slider-block
 */

// Pass along Swiper desired class.
$extra_attributes = array(
	'class' => 'swiper-slide',
);

?>

<div
	<?php echo wp_kses_data( get_block_wrapper_attributes( $extra_attributes ) ); ?>
>
	<div class="wp-block-slide__wrapper">
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div><!-- .wp-block-slide__wrapper -->
</div><!-- .swiper-slide -->
