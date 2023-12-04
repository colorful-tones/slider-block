# Slider Block plugin

__Fork it, or download the [latest release](https://github.com/colorful-tones/slider-block/releases), and make it your own!__

This is a demonstration of how you might create a custom Slider Block, which is a slider carousel UI. We're using SwiperJS (3rd-party dependency) for the slider JavaScript and CSS (mostly).

## Installation

### Manual

1. Upload the `slider-block` folder to the plugins directory (typically `wp-content/plugins`) in your WordPress installation.
2. Activate the Slider Block plugin.
3. Create a new post or page, and insert the Slider block.
4. That's it.

## Changelog

### 0.1.2 – 2023-12-04

- 🐛 FIX: missing memoization
- 👌 IMPROVE: Allowed Blocks = core/cover only

### 0.1.1 – 2023-12-04

- Major refactor 😎:
  - Remove need to have two custom blocks: Slider and Slide (`"parent": ['wpe/slider]`). This was just unnecessary and mildly confusing. We're ultimately utilising `InnerBlocks` and `useInnerBlocksProps()` to nest things.
  - Create `constants.js` to try and allow builders to drop in their own default blocks for slides.
  - Generally "cleaner" codebase.

### 0.1.0 – 2023-11-28

Initial release, which includes:

- Slider Block which uses [SwiperJS](https://swiperjs.com/) (v11.0.5)

## Resources

- Need help converting your block markup to PHP nested arrays or JS objects? Check out [WPHTML Converter](https://happyprime.github.io/wphtml-converter/)
- [SwiperJS](https://swiperjs.com/).
