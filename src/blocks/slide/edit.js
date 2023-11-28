/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal Dependencies
 */
import image3 from '../slider/assets/image3.jpg';

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
	const allowedBlocks = applyFilters( 'wpe.sliderBlock.allowedBlocks', [
		'core/button',
		'core/buttons',
		'core/cover',
		'core/heading',
		'core/image',
		'core/paragraph',
	] );

	const blockProps = useBlockProps( { className: 'swiper-slide' } );
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'wp-block-slide__wrapper' },
		{
			allowedBlocks,
			renderAppender: false,
			template: [
				[
					'core/image',
					{
						aspectRatio: '16/9',
						scale: 'cover',
						sizeSlug: 'full',
						url: `${ image3 }`,
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
