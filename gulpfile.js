const devOptions = require('./dev-options.js')

//https://markwilkins.uberflip.com/
//Include the address of your hub here:
const devHub = devOptions.fullHubUrl;



//Assorted dependencies
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const notifier = require('node-notifier');
const browserSync = require('browser-sync').create();
const rename = require("gulp-rename");

//CSS
const precss = require('precss');
const postcss = require('gulp-postcss');
const autoprefixer = require('gulp-autoprefixer');
const calc = require("postcss-calc");
const mqpacker = require("css-mqpacker");
const cssnano = require('cssnano');

//JS
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const livereload = require('gulp-livereload');
const es2015 = require('babel-preset-es2015');



//Our post-css plugins
const plugins = [
	precss({}), //Sass
	calc(), //turns calc(10px + 20px) to 30px... optimization
	mqpacker(), //puts all media quires into one
	cssnano({
		zindex: false,
		minifyFontValues: false, 
		discardUnused: false 
	}) //minifiy
]

//If you make a mistake in your css, do this
function onError(err, that) {
	gutil.beep();
	notifier.notify({
		title: 'MarkBot:',
		message: 'Hey onBrander, looks like gulp hit an error 😫. Check the terminal for details.',
		wait: true
	});

	if(!this.emit) { //JS err
		console.log("\x1b[33m", 'File:', "\x1b[0m", err.filename);
		console.log("\x1b[33m", 'Line:', "\x1b[0m", err.loc.line);
		console.log(err.codeFrame)
		that.emit('end');

	} else { //CSS err
		console.log("\x1b[33m", 'Name:', "\x1b[0m", err.name);
		console.log("\x1b[33m", 'Reason:', "\x1b[0m", err.reason);
		console.log("\x1b[33m", 'File:', "\x1b[0m", err.file);
		console.log("\x1b[33m", 'Line:', "\x1b[0m", err.line);
		this.emit('end');	
	}
}

if(devOptions.remindMeToGit){
	//Git reminder 
	setInterval(function() {
		notifier.notify({
			title: 'MarkBot:',
			message: 'Hey OnBrander, you\'ve been working for a while now, it might be time for a git commit! 😎',
			wait: true
		});
	}, 1200000)
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
		.pipe(sourcemaps.write('./sourceMaps'))
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
		.pipe(sourcemaps.write('./sourceMaps'))
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
		files: ["./build/**/*.js", "./build/**/*.css", "./build/**/*.map", "./includes/**/*.html"]
	});
})

//Babel and browser out JS
gulp.task('js', function () {
    // app.js is your main JS file with all your module inclusions
    return browserify({entries: './onbrand.js', debug: true})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .on('error', function(error) { onError(error, this) })
        .pipe(source('onbrand.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./sourceMaps'))
        .pipe(gulp.dest('./build'))
        // .pipe(livereload());
});


gulp.task('default', ['bs', 'onbrand-css', 'client-css', 'js'], () => {
	gulp.watch('./onbrand.css', ['onbrand-css']);
	gulp.watch('./client/client.css', ['client-css']);
	gulp.watch('./onbrand.js', ['js']);
});