/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

// eslint-disable-next-line jsdoc/require-returns-type
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
	/**
	 * Filters the list of allowed blocks.
	 */
	const allowedBlocks = applyFilters(
		'colorful-tones.sliderBlock.allowedBlocks',
		[
			'core/button',
			'core/buttons',
			'core/cover',
			'core/heading',
			'core/image',
			'core/paragraph',
		]
	);

	const blockProps = useBlockProps( { className: 'swiper-slide' } );
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'wp-block-slide__wrapper' },
		{
			allowedBlocks,
			template: [
				[
					'core/image',
					{
						aspectRatio: '16/9',
						scale: 'cover',
						sizeSlug: 'full',
						url: 'https://dummyimage.com/16:9x1400/6b6b6b/ebebeb.png&text=Replace+Me',
					},
				],
			],
		}
	);

	return (
		<>
			<div { ...blockProps }>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
