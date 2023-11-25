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
		autoplay: options?.autoplay ?? true,
		centeredSlides: options?.centerSlides ?? false,
		createElements: true,
		direction: 'horizontal',
		grabCursor: options?.drag ?? true,
		initialSlide: 0,
		keyboard: true,
		modules: [ Autoplay, Keyboard, Navigation, Pagination ],
		navigation: options?.navigation ?? false,
		observer: true,
		observeSlideChildren: true,
		observeParents: true,
		pagination: options?.pagination ?? false,
		simulateTouch: options?.drag ?? true,
		slidesPerView: options?.slidesPerView ?? 1,
		speed: options?.speed ?? 300,
	};

	return new Swiper( container, parameters );
}
