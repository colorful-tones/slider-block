module.exports = () => {
	const config = {
		plugins: {
			'postcss-import': {},
			'postcss-preset-env': {
				stage: 0,
				features: {
					'custom-properties': false,
				},
			},
		},
	};
	return config;
};
