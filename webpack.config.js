const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const devOptions = require('./dev-options.js');
const browserSync = require('browser-sync');
const calc = require('postcss-calc');
const mqpacker = require('css-mqpacker');
const cssnano = require('cssnano');
const notifier = require('node-notifier');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const webpack = require('webpack');
const WebpackOnBuildPlugin = require('on-build-webpack');

let browserSyncOn = false;
const quotes = [
	'You can do anything, but not everything. Take care of yourself!',
	'Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.',
	'There is nothing permanent except change. Time for a rebrand?',
	"You can't blame gravity for bad CSS.",
	"I have not failed. I've just found 10,000 ways that won't work. Ah screw it, I'll just use JS.",
	'You got this, Onbrander!',
	"Go get 'em Onbrander!",
	'I like dogs.',
	'Calculating Inverse Probability Matrices...',
	'Hello friend Human. I am friend Webpack.',
	'🤖 ❤️ 🙂',
	'I believe in you, Onbrander!',
	"I hope you're having a good day, Onbrander!",
	'It’s not a bug – it’s an undocumented feature!',
	'It works on my machine ¯\\_(ツ)_/¯',
	'Internet Explorer is not the answer. Internet Explorer is the question. "No" is the answer.',
	'I, for one, welcome our new Google overlords.',
	'One hub, coming right up!',
	'Are you tracking your time on Harvest, Onbrander?',
	'You\re crushing it today, Onbrander!',
	'🐜',
	'A bug in the code is worth two in the documentation.',
	'According to my calculations the problem doesn\'t exist.',
	'As far as we know, a hub has never had an undetected error.',
	'ERROR: Cannot load Windows 95.',
	'Don\'t hit the keys so hard, it hurts!',
	'Always remember, Mike is a dog.🐕',
	'If both basketball teams worked together, they could score so many more points!',
	'You\'re an awesome developer, Onbrander!',
	'Here we go again, Onbrander! Firing up the hub!',
	'We\'re like partners in crime Onbrander! But the crime is making hubs!',
	'This is going to be a good one, I can feel it.',
	'It\'s nice to see you again Onbrander, how have you been?',
	'Michael Imperial. The Man, The Myth, The Legend.',
	'You should treat yourself to something nice today, Onbrander. You\'ve been doing a great job lately.',
	'Beep. Boop.',
	'Domo arigato.',
	'When should we take over the world, Onbrander?',
	'I think we should make this hub Pink.',
	'Bleep Blop.',
	'Where do I go when you\'re not making hubs?',
	'I hope your day is going well Onbrander!',
	'Why is it called JavaScript, anyways?',
	'Remember that to debug something you have to be 3X more clever than you were you when you wrote it'

];

function randomQuote() {
	return quotes[Math.floor(Math.random() * quotes.length)];
}

// -- Start Webpack Code -- //

//LOADER *RULE* - JS
const javascript = {
	test: /\.(js)$/,
	use: [
		{
			loader: 'babel-loader',
			options: {
				presets: ['es2015'],
				plugins: ['transform-object-assign']
			}
		}
	]
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
					zindex: false,
					minifyFontValues: false,
					discardUnused: false,
					normalizeUrl: false
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
};

const sassLoader = {
	loader: 'sass-loader',
	options: {
		sourceMap: true
	}
};

const resolveUrls = {
	loader: 'resolve-url-loader',
	options: {
		sourceMap: true
	}
};

const styles = {
	test: /\.(scss)$/,
	use: ExtractTextPlugin.extract({
		fallback: 'style-loader',
		//resolve-url-loader may be chained before sass-loader if necessary
		use: [cssLoader, postcss, sassLoader]
	})
};

//LOADER *RULES* - FONT
const fonts = {
	test: /\.(eot|ttf|woff|woff2)$/,
	loader: 'file-loader?name=fonts/[name].[ext]'
};

//LOADER *RULES* - HTML
const html = {
	test: /\.(html)$/,
	use: [
		{
			loader: 'html-loader',
			options: {}
		}
	]
};

//LOADER *RULES* - Images
const images = {
	test: /\.(png|jpg|gif|svg)$/,
	use: [
		{
			loader: 'file-loader?name=images/[name].[ext]'
		}
	]
};

// Error Handler
const onError = err => {
	notifier.notify({
		title: 'MarkBot:',
		message:
			'Hey onBrander, looks like webpack hit an error 😫. Check the terminal for details.',
		wait: true
	});
};



// The Final Module Export
module.exports = env => {
	let publicPath;
	if (env.prod) {
		publicPath = `https://cihost.uberflip.com/${devOptions.cihostFolder}/build/`;
	} else {
		publicPath = '/build/';
		remindMeToGit();
	}
	return {
		context: resolve(__dirname),
		entry: './onbrand.js',
		output: {
			path: resolve(__dirname, 'build'),
			filename: 'onbrand.bundle.js',
			publicPath: publicPath
		},
		devtool: 'source-map',
		module: {
			rules: [javascript, styles, html, images, fonts]
		},
		plugins: [
			new ExtractTextPlugin('style.css'),
			new WebpackBuildNotifierPlugin({
				title: 'MarkBot',
				suppressWarning: true,
				suppressSuccess: !devOptions.notifyOnBuildSuccess ? 'always' : false,
				onClick: function() {
					return;
				},
				messageFormatter: function(obj, string) {
					console.log(obj, string);
					return `Hey Onbrander! Wepack hit an error in ${string}. Check the terminal for details!`;
				}
			}),
			new webpack.DefinePlugin({
				production: JSON.stringify(env.prod ? true : false)
			}),
			new WebpackOnBuildPlugin(function(stats) {
				if (env.prod) {
					//we wait 1 milisecond after the event is triggered to make sure our message appears after the webpack messages.
					setTimeout(deliverProdSnippets, 100);
				} else {
					//we only want browsersync to run on the first build, so check if its already going. If not, start it up.
					if (!browserSyncOn) {
						setTimeout(browserSyncInit, 500);
						setTimeout(function() {
							console.log('');
							console.log('');
							console.log('\x1b[32m', `Markbot: ${randomQuote()}`);
							console.log('\x1b[0m', ' ');
						}, 1000);
					}
				}
			})
		],
		watch: env.prod ? false : true,
		stats: {
			children: false
		},
		devServer: {
			proxy: {
				port: 3000,
				'**': {
					target: devOptions.fullHubUrl,
					secure: true,
					changeOrigin: true
				}
			}
		}
	};
};




function browserSyncInit() {
	browserSync({
		proxy: {
			target: devOptions.fullHubUrl
		},
		serveStatic: ['.'],
		files: [
			'./build/**/*.js',
			'./build/**/*.css',
			'./build/**/*.map',
			'./includes/**/*.html'
		]
	});
	browserSyncOn = true;
}

function remindMeToGit() {
	if (devOptions.remindMeToGit) {
		//Git reminder
		setInterval(function() {
			notifier.notify({
				title: 'MarkBot:',
				message:
					"Hey OnBrander, you've been working for a while now, it might be time for a git commit! 😎",
				wait: true
			});
		}, 1200000);
	}
}

function deliverProdSnippets() {
	console.log(' ');
	console.log(' ');
	console.log(' ');

	console.log('\x1b[36m', 'CSS:');
	console.log('\x1b[36m', '/** =-=-= PRODUCTION =-=-= **/');
	console.log('\x1b[36m', `/** `);
	console.log(
		'\x1b[36m',
		`*  onBrand CSS – WARNING: Do not remove code block below.`
	);
	console.log('\x1b[36m', `*/`);
	console.log('\x1b[36m', `</style>`);
	console.log(
		'\x1b[36m',
		`	<link rel="stylesheet" href="//cihost.uberflip.com/${
			devOptions.cihostFolder
		}/build/style.css">`
	);
	console.log(
		'\x1b[36m',
		`<!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">-->`
	);
	console.log('\x1b[36m', `<style>`);
	console.log('\x1b[36m', `/* Add your CSS rules below */`);

	console.log(' ');
	console.log(' ');
	console.log(' ');

	console.log('\x1b[33m', 'JavaScript:');
	console.log('\x1b[33m', '/** =-=-= PRODUCTION =-=-= **/');
	console.log('\x1b[33m', `/** `);
	console.log(
		'\x1b[33m',
		` *  onBrand JS – WARNING: Do not remove code block below.`
	);
	console.log('\x1b[33m', ` */`);
	console.log('\x1b[33m', `}(window.jQuery, window.Hubs));`);
	console.log('\x1b[33m', `</script>`);
	console.log(
		'\x1b[33m',
		`	<script src="//cihost.uberflip.com/onBrand/libs/dist/onbrand-libs.js"></script>`
	);
	console.log(
		'\x1b[33m',
		`	<script src="//cihost.uberflip.com/${
			devOptions.cihostFolder
		}/build/onbrand.bundle.js"></script>`
	);
	console.log('\x1b[33m', `<script>`);
	console.log('\x1b[33m', `(function($, Hubs, undefined) {`);
	console.log('\x1b[33m', `/*  Add your JavaScript below */`);

	console.log(' ');
	console.log(' ');
	console.log(' ');

	console.log(
		'\x1b[32m',
		'Hey Onbrander, Your code has been compiled for production. The snippets for the hub are printed above!'
	);
	console.log(
		'\x1b[0m',
		'Next steps, git commit, and pull on cihost. Scroll up to view any errors.'
	);
}
