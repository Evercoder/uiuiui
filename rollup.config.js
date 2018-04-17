import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

const postcss_config = { 
	extensions: ['.css'], 
	extract: pkg.style,
	plugins: [
		autoprefixer()
	]
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
		{ file: pkg.module, format: 'es' }
	],
	plugins: [
		resolve(),
		postcss(postcss_config),
		babel(babel_config)
	]
}, {
	input: 'components/index.js',
	external: Object.keys(pkg.dependencies).filter(dep => dep.indexOf('react') === 0),
	output: {
		file: pkg.browser,
		format: 'umd',
		name: 'uiuiui'
	},
	plugins: [
		resolve(),
		postcss(postcss_config),
		babel(babel_config)
	]
}];