/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import {
	useBlockProps,
	useInnerBlocksProps,
	useBlockEditContext,
	store as blockEditorStore,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	PanelBody,
	PanelRow,
	ToggleControl,
} from '@wordpress/components';
import { useRefEffect } from '@wordpress/compose';
import { useSelect, useDispatch, select, subscribe } from '@wordpress/data';
import { memo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Shared Swiper config.
 */
import { SwiperInit } from './swiper-init';

/**
 * Slider Toolbar - '+ Add a Slide'
 *
 * @param {string} clientId Block's clientsId.
 *
 * @return {Element} Returns ToolbarGroup.
 */
const SliderToolbar = ( { clientId } ) => {
	const { insertBlock, selectBlock } = useDispatch( blockEditorStore );
	const innerBlocks = useSelect(
		(
			select // eslint-disable-line no-shadow
		) => select( blockEditorStore ).getBlock( clientId ).innerBlocks
	);

	const addSlide = () => {
		const block = createBlock( 'colorful-tones/slide' );
		insertBlock( block, innerBlocks.length, clientId, false );
		selectBlock( block.clientId );
	};

	return (
		<ToolbarGroup>
			<ToolbarButton icon="plus" onClick={ addSlide }>
				{ __( 'Add slide', 'slider-block' ) }
			</ToolbarButton>
		</ToolbarGroup>
	);
};

/**
 * Slides component.
 */
const Slides = memo( () => {
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'swiper-wrapper' },
		{
			allowedBlocks: [ 'colorful-tones/slide' ],
			template: [
				[ 'colorful-tones/slide' ],
				[ 'colorful-tones/slide' ],
			],
			orientation: 'horizontal',
		}
	);

	return <div { ...innerBlocksProps } />;
} );

/**
 * Slider component.
 */
const Slider = memo( ( { clientId, attributes } ) => {
	const { navigation, pagination } = attributes;

	const sliderRef = useRefEffect( ( element ) => {
		const options = {
			...attributes,
			...{
				autoplay: false,
				drag: false,
			},
		};

		// Initialize slider.
		let slider = SwiperInit( element, options );

		// Store the current slide order to detect changes, such as adding, removing, or reordering slides.
		let slideOrder = select( blockEditorStore ).getBlockOrder( clientId );

		// Subscribe slider update events like adding, removing, or reordering slides.
		const unsubscribeSliderUpdateListener = subscribe( () => {
			const currentSlidesOrder =
				select( blockEditorStore ).getBlockOrder( clientId );

			// Check if the slider has been changed.
			if ( currentSlidesOrder.toString() !== slideOrder.toString() ) {
				const selectedBlock =
					select( blockEditorStore ).getSelectedBlock();
				const slideAdded =
					currentSlidesOrder.length > slideOrder.length;
				const slideRemoved =
					currentSlidesOrder.length < slideOrder.length;
				const slideMoved =
					currentSlidesOrder.length === slideOrder.length;
				const activeIndex = slider.activeIndex;

				// Store the current slide order before destroying the slider instance.
				slideOrder = currentSlidesOrder;
				slider.destroy();

				window.requestAnimationFrame( () => {
					// Initialize slider.
					slider = SwiperInit( element, options );

					// Determine where the slider should go.
					let slideToIndex = activeIndex;
					if ( slideAdded ) {
						slideToIndex = slideOrder.length;
					} else if ( slideRemoved ) {
						slideToIndex = activeIndex - 1;
					} else if ( slideMoved ) {
						slideToIndex = slideOrder.findIndex(
							( clientId ) => clientId === selectedBlock.clientId // eslint-disable-line no-shadow
						);
					}

					if ( slideToIndex < 0 ) {
						slideToIndex = 0;
					}

					slider.slideTo( slideToIndex, 0 );
				} );
			}
		} );

		return () => {
			unsubscribeSliderUpdateListener();
			slider.destroy();
		};
	} );

	return (
		<>
			<BlockControls>
				<SliderToolbar clientId={ clientId } />
			</BlockControls>

			<div className="swiper" ref={ sliderRef }>
				<Slides />

				{ navigation && (
					<>
						<div className="swiper-button-next"></div>
						<div className="swiper-button-prev"></div>
					</>
				) }
				{ pagination && (
					<>
						<div className="swiper-pagination"></div>
					</>
				) }
			</div>
		</>
	);
} );

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { autoplay, navigation, pagination } = attributes;
	const { clientId } = useBlockEditContext();
	const blockProps = useBlockProps();

	return (
		<>
			<div { ...blockProps }>
				<Slider clientId={ clientId } attributes={ attributes } />
			</div>

			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'slider-block' ) }>
					<PanelRow>
						<ToggleControl
							label={ __( 'Autoplay', 'slider-block' ) }
							checked={ autoplay }
							onChange={ ( value ) =>
								setAttributes( { autoplay: value } )
							}
							help={ __(
								'“Autoplay” will automatically advance the slides. Note: this is intentionally disabled in the editor, but will affect the front end.'
							) }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Navigation', 'slider-block' ) }
							checked={ navigation }
							onChange={ ( value ) =>
								setAttributes( { navigation: value } )
							}
							help={ __(
								'“Navigation” will display arrows so user can navigate forward/backward.'
							) }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Pagination', 'slider-block' ) }
							checked={ pagination }
							onChange={ ( value ) =>
								setAttributes( { pagination: value } )
							}
							help={ __(
								'“Pagination” will display dots along the bottom for user to click through slides.'
							) }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
