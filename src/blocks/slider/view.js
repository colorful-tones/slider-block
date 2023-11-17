/**
 * Shared Swiper config.
 */
import { SwiperInit } from './swiper-init';

document.addEventListener( 'DOMContentLoaded', () => {
	const containers = document.querySelectorAll( '.swiper' );

	if ( ! containers.length ) {
		return;
	}

	containers.forEach( ( element ) => {
		let options = {};

		try {
			options = JSON.parse( element.dataset.swiper );
		} catch ( e ) {
			// eslint-disable-next-line no-console
			console.error( e );
			return;
		}

		const slides = element.querySelectorAll( '.wp-block-slide' );
		options.totalSlides = slides.length;

		SwiperInit( element, options );
	} );
} );
