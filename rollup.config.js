import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

let config = {
	babelrc: false,
	presets: ["es2015-rollup", "react"],
	plugins: ["transform-object-rest-spread"],
	exclude: ['node_modules/**']
};

export default [
	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// the `targets` option which can specify `dest` and `format`)
	{
		input: 'components/index.js',
		external: Object.keys(pkg.dependencies),
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		],
		plugins: [
			resolve(),
			postcss({ extensions: ['.css'], extract: true }),
			babel(config)
		]
	}
];