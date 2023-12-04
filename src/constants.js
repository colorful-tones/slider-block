/**
 * These are the block we'll allow to be inserted
 * as a slide.
 */
export const ALLOWED_BLOCKS = [ 'core/cover' ];

/**
 * This is the default block we'll use for our slide.
 */
export const DEFAULT_BLOCK = 'core/cover';

/**
 * These are the attributes we assign for our DEFAULT_BLOCK.
 */
export const DEFAULT_BLOCK_ATTRIBUTES = {
	align: 'center',
	className: 'swiper-slide',
	contentPosition: 'bottom left',
	dimRatio: 0,
	layout: {
		type: 'constrained',
	},
};

/**
 * These are the default inner blocks we'll use
 * when our DEFAULT_BLOCK is inserted.
 */
export const DEFAULT_INNERBLOCK = 'core/paragraph';

/**
 * These are the attributes we assign for our default
 * inner blocks.
 */
export const DEFAULT_INNERBLOCK_ATTRIBUTES = {
	backgroundColor: 'contrast',
	fontSize: 'large',
	style: {
		spacing: {
			padding: {
				top: '0',
				bottom: '0',
				left: '0.5rem',
				right: '0.5rem',
			},
		},
	},
};
