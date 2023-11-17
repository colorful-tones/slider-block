module.exports = {
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended' ],
	rules: {
		'import/no-unresolved': [ 2, { ignore: [ '^@wordpress/', 'swiper' ] } ],
	},
};
