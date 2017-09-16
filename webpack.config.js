const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const devOptions = require('./dev-options.js');
const browserSync = require('browser-sync');
const calc = require("postcss-calc");
const mqpacker = require("css-mqpacker");
const cssnano = require('cssnano');


//LOADER *RULE* - JS
const javascript = {
	test: /\.(js)$/,
	use: [{
		loader: 'babel-loader',
		options: {
			presets: ['es2015']
		}
	}],
};



//LOADER *RULES* - CSS/SASS
const postcss = {
	loader: 'postcss-loader',
	options: {
		sourceMap: true,
		plugins() {
			return [
				autoprefixer({
					browsers: 'last 3 versions'
				}),
				calc(), //turns calc(10px + 20px) to 30px... optimization
				mqpacker(), //puts all media quires into one
				cssnano({
					zindex: false
				}) //minifiy
			];
		}
	}
};

const cssLoader = {
	loader: 'css-loader',
	options: {
		sourceMap: true
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
	use: ExtractTextPlugin.extract({
		fallback: 'style-loader',
		//resolve-url-loader may be chained before sass-loader if necessary 
		use: [cssLoader, postcss, sassLoader]
	})
};

//LOADER *RULES* - HTML

const html = {
	test: /\.(html)$/,
	use: [{
		loader: 'html-loader',
		options: {

		}
	}]
}


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
				styles,
				html
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
	serveStatic: ['./build'],
	files: ["./build/**/*.js", "./build/**/*.css", "./build/**/*.map", "./includes/**/*.html"]

});