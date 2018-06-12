import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import cssbundle from 'rollup-plugin-css-bundle';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

const css_config = { 
	output: pkg.style,
	transform: code => postcss([autoprefixer]).process(code, {})
};

const babel_config = {
	babelrc: false,
	presets: ["es2015-rollup", "react"],
	plugins: ["transform-object-rest-spread"],
	exclude: ['node_modules/**']
};

export default [{
	input: 'components/index.js',
	external: Object.keys(pkg.dependencies),
	output: [
		{ file: pkg.main, format: 'cjs' },
		{ file: pkg.module, format: 'es' },
		{
			file: pkg.browser,
			format: 'umd',
			name: 'uiuiui',
			globals: {
				'react': 'React',
				'react-dom': 'ReactDOM',
				'react-event-listener': 'EventListener'
			}
		}
	],
	plugins: [
		resolve(),
		cssbundle(css_config),
		babel(babel_config)
	]
}];