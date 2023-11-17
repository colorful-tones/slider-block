/**
 * Swiper dependencies
 */
import { Swiper } from 'swiper';
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules';

/**
 * Initialize the slider.
 *
 * @param {Element} container HTMLElement.
 * @param {Object}  options   Slider parameters.
 * @return {Object} Returns initialized slider instance.
 */
export function SwiperInit( container, options = {} ) {
	const parameters = {
		autoplay: false,
		centeredSlides: options?.centerSlides ?? false,
		direction: 'horizontal',
		grabCursor: options?.drag ?? true,
		keyboard: true,
		modules: [ Keyboard ],
		navigation: false,
		pagination: false,
		simulateTouch: options?.drag ?? true,
		slidesPerView: options?.slidesPerView ?? 1,
		speed: options?.speed ?? 300,
	};

	// Autoplay module.
	if ( options?.autoplay ) {
		parameters.modules.push( Autoplay );
		parameters.autoplay = {
			delay: options?.autoplayInterval ?? 3000,
			pauseOnMouseEnter: options?.autoplayPauseOnHover ?? false,
		};
	}

	// Navigation module.
	if ( options?.navigation ) {
		parameters.modules.push( Navigation );
		parameters.navigation = {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		};
	}

	// Pagination module.
	if ( options?.pagination ) {
		parameters.modules.push( Pagination );
		parameters.pagination = {
			el: '.swiper-pagination',
			type: options?.paginationType ?? 'bullets',
			clickable: options?.pagination?.clickable ?? false,
		};

		if (
			'bullets' === parameters.pagination.type &&
			undefined === options?.pagination?.clickable
		) {
			parameters.pagination.clickable = true;
		}
	}

	return new Swiper( container, parameters );
}
