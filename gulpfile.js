
//https://markwilkins.uberflip.com/
//Include the address of your hub here:
const devHub = 'https://markwilkins.uberflip.com/';



//Assorted dependencies
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const precss = require('precss');
const calc = require("postcss-calc");
const mqpacker = require("css-mqpacker");
const cssnano = require('cssnano');
const rename = require("gulp-rename");
const gutil = require('gulp-util');
const notifier = require('node-notifier');
const browserSync = require('browser-sync').create();




//Our post-css plugins
const plugins = [
	precss({}), //Sass
	calc(), //turns calc(10px + 20px) to 30px... optimization
	mqpacker(), //puts all media quires into one
	cssnano() //minifiy
]

//If you make a mistake in your css, do this
function onError(err) {
	gutil.beep();
	notifier.notify({
		title: 'MarkBot:',
		message: 'Hey onBrander, looks like gulp hit an error 😫. Check the terminal for details.',
		wait: true
	});
	console.log(err);
	this.emit('end');
}


//Compile our scss, run our plugins, autoprefix and do sourcemaps etc
gulp.task('onbrand-css', function() {
	return gulp.src('./onbrand.css')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sourcemaps.init())
		.pipe(postcss(plugins))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./build/'));
}).on('error', function(error) { onError(error) });

//Compile our client's scss, run our plugins, autoprefix and do sourcemaps etc
gulp.task('client-css', function() {
	return gulp.src('./client/client.css')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sourcemaps.init())
		.pipe(postcss(plugins))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./build/'));
}).on('error', function(error) { onError(error) });


//fire up the local dev server, serve all the files 
gulp.task('bs', function() {
	return browserSync.init({
		proxy: {
			target: devHub
		},
		// logLevel: "debug",
		serveStatic: ['.'],
		files: ["onbrand.js", "./includes/header.html", "./includes/footer.html", "./build/onbrand.css", "./build/client.css"]
	});
})


gulp.task('default', ['bs','onbrand-css', 'client-css'], () => {
	gulp.watch('./onbrand.css', ['onbrand-css']);
	gulp.watch('./client/client.css', ['client-css']);
});