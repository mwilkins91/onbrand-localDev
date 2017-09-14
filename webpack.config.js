const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const devOptions = require('./dev-options.js');
const browserSync = require('browser-sync');


const javascript = {
	test: /\.(js)$/,
	use: [{
		loader: 'babel-loader',
		options: { presets: ['es2015'] }
	}],
};

const postcss = {
	loader: 'postcss-loader',
	options: {
		sourceMap: false,
		plugins() {
			return [
				autoprefixer({ browsers: 'last 3 versions' })
			];
		}
	}
};

const cssLoader = {
	loader: 'css-loader',
	options: {
		sourceMap: false
	}
}

const sassLoader = {
	loader: 'sass-loader',
	options: {
		sourceMap: true
	}
}

const styles = {
	test: /\.(scss)$/,
	use: ['style-loader', cssLoader, postcss, sassLoader]
};

module.exports = (env) => {
	return {
		context: resolve(__dirname),
		entry: './onbrand.js',
		output: {
			path: resolve(__dirname, 'build'),
			filename: 'onbrand.bundle.js',
			publicPath: '/build/'
		},
		devtool: 'source-map',
		module: {
			rules: [
				javascript,
				styles
			]
		},
		plugins: [
			new ExtractTextPlugin('style.css'),
		],
		watch: true,
		stats: {
			children: false
		},
		devServer: {
			proxy: {
				port: 3000,
				'**': {
					target: devOptions.fullHubUrl,
					secure: true,
					changeOrigin: true, 
				}
			}
		}
	};
};


browserSync({
  proxy: {
  	target: devOptions.fullHubUrl
  },
  logLevel: "debug",
  serveStatic: ['.'],
  files: ["./build/**/*.js", "./build/**/*.css", "./build/**/*.map", "./includes/**/*.html"]

});