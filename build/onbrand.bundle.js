/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Loop over each tile, and if the tag specified (1st param) is present, execute yesTagFn (2nd param)
 * if the tag is not present, execute noTagFn (3rd param). In both callbacks, **this** reffers to the tile currently being
 * checked
 * 
 * @param {string} filterBy --> The tag to look for
 * @param {function} [yesTagFn=function() {}] --> The function to run if a tile has the desired tag.
 * @param {function} [noTagFn=function() {}] --> The function to run if a tile does NOT have the desired tag.
 * @returns {boolean} --> returns true if the front end tags are enabled, otherwise returns false and logs an error.
 */
exports.doIfTag = function (filterBy) {
	var yesTagFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	var noTagFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

	if ($('body').hasClass('include_fe_item_tags')) {
		$('.tile').each(function (i, el) {
			//Get the tags for this tile.
			var allTagsString = el.dataset.tags;

			//assume it doesn't have the tag we want
			var hasTag = false;

			//If there is any tags to even check...
			if (allTagsString) {
				//split the tags into an array
				var allTagsArray = allTagsString.split(',');

				//loop over the array
				allTagsArray.forEach(function (tag) {
					//if the tag matches what we're looking for, change hasTag to true
					if (tag.toLowerCase() === filterBy.toLowerCase()) {
						hasTag = true;
					}
				});
			}
			//Do this if the tile has the tag
			if (hasTag) {
				yesTagFn.call(this);
				//Do this if the tile doesn't...
				return true;
			} else {
				noTagFn.call(this);
				return true;
			}
		});
	} else {
		console.error('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
		console.error('  Onbrander: You called doIfTag, but front end tags are NOT enabled !');
		console.error('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
		return false;
	}
};

/**
 * Take the hub share window, rip it out, and make our own. On page change, replace our new share window with the appropriate one
 * for that page. Applies event listeners for load and page change, simply call near the begining of your code. 
 * 
 * @returns {function} --> The function that updates on page change.
 */
exports.fixShareWidgetImproved = function () {
	$('head').append('<style id="shareWidgetFix">\n\t.relativeDiv {\n\t\tposition: relative;\n\t\tfloat: right;\n\t\t}\n\t\t\n\t\t.relativeDiv.relativeDiv--search {\n\t\tfloat: left;\n\t\t}\n\t\t\n\t\t.relativeDiv--share:hover .share-hub {\n\t\tdisplay: block;\n\t\t}\n\t\t\n\t\t.share-hub,\n\t\t.share-item {\n\t\tmargin: auto;\n\t\t}\n\t\t\n\t\t.search-drop-down {\n\t\tposition: absolute;\n\t\t}\n\t\t\n\t\t@media all and (min-width: 860px) {\n\t\t.share-hub,\n\t\t.share-item {\n\t\tright: auto;\n\t\tposition: absolute;\n\t\tleft: -450% !important;\n\t\ttop: 51px !important;\n\t\t}\n\t\t.search-drop-down {\n\t\tright: 0;\n\t\tposition: absolute;\n\t\tleft: -4% !important;\n\t\ttop: 55px !important;\n\t\t}\n\t\t}\n\t\t\n\t\t@media all and (max-width: 860px) {\n\t\t.share-hub,\n\t\t.share-item {\n\t\tright: auto;\n\t\tposition: absolute;\n\t\tleft: -576% !important;\n\t\ttop: 45px !important;\n\t\t}\n\t\t}\n\t\t\n\t\t@media all and (max-width: 720px) {\n\t\t.share-hub,\n\t\t.share-item {\n\t\tright: auto;\n\t\tposition: absolute;\n\t\tleft: -465% !important;\n\t\ttop: 45px !important;\n\t\t}\n\t\t}\n\t</style>');
	//rip out share window, put inside of relative div (in the same place)
	//create div to house elements
	$('.right-side-btns').prepend('<div class="relativeDiv relativeDiv--share"><div class="insertFlag--share"></div></div>');
	//rip share-main and place after the flag div
	$('#share-main-hub').clone().insertAfter('.insertFlag--share');
	$('.share-toggle').insertAfter('.insertFlag--share');

	//do the same to search box
	$('.right-side-btns').prepend('<div class="relativeDiv relativeDiv--search"><div class="insertFlag--search"></div></div>');
	$('.search-drop-down').insertAfter('.insertFlag--search');
	$('.search-container').insertAfter('.insertFlag--search');
	//This function will update the share widget for different pages
	var $shareMain = $('#share-main-hub');
	var update = function update() {
		if ($('.meta-inner .share-container').length) {
			$('.right-side-btns .share-hub').remove();
			$('.right-side-btns .share-container').remove();
			$('.meta-inner .share-container').insertAfter('.insertFlag--share');
		} else if ($('.share-item.type-collection').length && !$('body').hasClass('hub-page')) {
			$('.right-side-btns .share-hub').remove();
			$('.right-side-btns .share-container').remove();
			$('#hubs-container .page-aligner>.share-container').insertAfter('.insertFlag--share');
		} else {
			$('.right-side-btns .share-hub').remove();
			$('.right-side-btns .share-container').remove();
			if ($('#share-main-hub').length) {
				$('#share-main-hub').clone().insertAfter('.insertFlag--share');
			} else {
				$shareMain.clone().insertAfter('.insertFlag--share');
			}
		}
	};
	Hubs.Events.on('load', update);
	Hubs.Events.on('pageChange', update);
	return update;
};

/**
 * This function is to be called on scroll, and will keep the block CTAs within the bounds of the article they are
 * supposed to be blocking (preventing them from overlapping the injected header and footer).
 */
exports.blockCtaFix = function () {
	var $blockCta = $('.block-cta:not(.embed-cta)');

	if ($blockCta.length && !$('.level-three .block-cta').length) {
		var $main = $('.main');
		var ctaHalfHeight = $blockCta.height() / 2;
		var top = $main.offset().top;
		var bottom = $main.offset().top + $main.height();
		var bottomFromBottom = $(document).height() - bottom;
		var middleScreen = $(window).scrollTop() + $(window).height() / 2;

		var middleScreenTop = middleScreen - ctaHalfHeight;
		var middleScreenBottom = middleScreen + ctaHalfHeight;
		// console.log(middleScreenTop)
		if (middleScreenTop < top) {
			$blockCta.css({
				position: 'absolute',
				top: top,
				bottom: '',
				transform: 'translate(-50%, -50%)',
				margin: 0
			});
		} else if (middleScreenBottom > bottom) {
			$blockCta.css({
				position: 'absolute',
				top: bottom - $blockCta.height() - ctaHalfHeight,
				transform: 'translate(-50%, -50%)',
				margin: 0
			});
		} else {
			$blockCta.css({
				position: 'fixed',
				top: '50vh',
				bottom: '',
				transform: 'translate(-50%, -50%)',
				margin: 0
			});
		}
	}
};

/**
 * When called on scroll, thi function will fade out the next-item-flyout before it can overlap with the
 * injected-footer
 */
exports.fadeOutItem = function () {
	if ($('body').hasClass('single-page')) {
		var footerHeight = $('footer').height();
		var pageHeight = document.body.scrollHeight - $(window).height();
		var sweetSpot = pageHeight - (footerHeight + $(window).height());
		if ($(window).scrollTop() > sweetSpot) {
			$('.item-next-prev').fadeOut('fast');
		} else {
			$('.item-next-prev').fadeIn('fast');
		}
	}
};

/**
 * Simply adds the css required to have tile descriptions slide up on hover
 */
exports.descriptionSlideUp = function () {
	$('head').append('<style id="descriptionsSlideUp">\n\t/*-- Tile Description Pop-up Hover --*/\n\t#collection-items .tile .description {\n\t\t-webkit-transition: all 0.4s ease-out;\n\t\ttransition: all 0.4s ease-out;\n\t}\n\t#collection-items .tile .description .long-h3 {\n\t\tdisplay: block !important;\n\t}\n\t\n\t#collection-items .tile:hover .description {\n\t\theight: 100%;\n\t\t-webkit-transition: all 0.3s ease-out;\n\t\ttransition: all 0.3s ease-out;\n\t}\n\t\n\t#collection-items .tile .share-single {\n\t\tdisplay: none;\n\t}\n\t</style>');
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// -- Imports -- //
var devOptions = __webpack_require__(2); //Development options
var onbrand_scss = __webpack_require__(3); //Onbrand styles
var client_scss = __webpack_require__(4); //client styles
var htmlHeader = __webpack_require__(5);
var htmlFooter = __webpack_require__(6);
var onbrandUtilities = __webpack_require__(7); //helper functions for dev
var onbrandFunctions = __webpack_require__(0);
// -- Startup -- //
 false ? null : onbrandUtilities(devOptions);
$('body').prepend(htmlHeader);
$('body').append(htmlFooter);
window.onbrandLoaded = false;
onbrandFunctions.fixShareWidgetImproved();

// -- Custom Functions -- //

// -- Hub Events -- //
var onLoadAndPageChange = function onLoadAndPageChange() {};
Hubs.Events.on('load', function () {
	if (!window.onbrandLoaded) {
		onLoadAndPageChange();
		fixShareWidget();
		// Add your onloads here...

		// end your onloads before here...
		window.onbrandLoaded = true;
	}
}).on('pageChange', function () {
	onLoadAndPageChange();
}).on('itemsLoaded', function (itemIds, selectors) {}).on('resize', function () {
	sideCtaFix();
	addThisFix();
}).on('scroll', function () {
	sideCtaFix();
	addThisFix();
	onbrandFunctions.blockCtaFix();
	onbrandFunctions.fadeOutItem();
}).on('ctaActivate', function (ctaId) {}).on('ctaFormSubmitSuccess', function (ctaId, mappedData, ctaName) {}).on('search', function () {});

//The new hub events can trigger before cihost scripts are loaded. This will ensure your scripts fire no matter what, but not more than once for 'load'.
if (!window.onbrandLoaded) {
	Hubs.Events.trigger('load');
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//npm run dev => Builds dev code
//npm run prod => Builds prod code (previously you changed production: to true)

var devOptions = {
	shortHubUrl: 'mark3.ufcontent.com/', //change me to the base url of your hub (no http(s) or www)
	fullHubUrl: 'http://mark3.ufcontent.com/' + '?onbrand', //exact url to access hub, leave onbrand query string
	cihostFolder: '${cihostFolder}', //change me to the cihost folder name
	remindMeToGit: true,
	notifyOnBuildSuccess: true //Gives a (slightly annoying?) message whenever a build completes successfully
};

module.exports = devOptions;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "<div id=\"injected-header\">\n\n</div>";

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "<div id=\"injected-footer\">\n\t\n\t\n</div>";

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var onbrandFunctions = __webpack_require__(0);

module.exports = function (devOptions) {
	console.log(' ');
	console.log(' ');
	console.warn('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
	console.warn("   Hey Onbrander, Just letting you know that we're in dev mode!");
	console.warn('   You have access to the following functions:', onbrandFunctions);
	console.warn('   More info available here: http://cihost.uberflip.com/docs/');
	console.warn('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
	console.log(' ');
	console.log(' ');

	/** 
   *  Utility Functions
   */
	var _internalLink = function _internalLink(e) {
		e.preventDefault();
		Hubs.changePage(e.target.href);
	};

	/**
   * 
   * @param {string} url - the url to replace with a relative path
   */
	var _relativeLinks = function _relativeLinks(url) {
		//We need relative links for local dev, so we regex for the url as the href
		var matchThis = new RegExp('^((http[s]?|ftp):/)?/?([^:/s]+)?(' + url + ')', 'gi');
		$('a').not('.onBrand--LocalDevLink').each(function (index, el) {
			var testThis = $(this).attr('href');
			if (matchThis.test(testThis)) {
				var newHref = testThis.replace(matchThis, '');
				if (!(newHref[0] === '/')) {
					newHref = '/' + newHref + '?onbrand';
				}
				$(this).attr('href', newHref);
				$(this).attr('target', '');
				//add event listener to do internal page change instead of full reload
				$(this).on('click', _internalLink);
				$(this).addClass('onBrand--LocalDevLink');
			}
		});
	};

	/** 
   *  Local Development Events
   */

	if (true) {
		//run right away to catch any early clickers out there...
		_relativeLinks(devOptions.shortHubUrl);
		Hubs.Config.hubBaseUrl = 'http://localhost:3000/';

		//run on load to catch any links added via scripts or anything
		Hubs.Events.on('load', function () {
			_relativeLinks(devOptions.shortHubUrl);
			Hubs.Config.hubBaseUrl = 'http://localhost:3000/';
		});
		//run on page change to get links on different pages
		Hubs.Events.on('pageChange', function () {
			_relativeLinks(devOptions.shortHubUrl);
			Hubs.Config.hubBaseUrl = 'http://localhost:3000/';
		});
		//get all the links on extra tiles added in
		Hubs.Events.on('itemsLoaded', function () {
			_relativeLinks(devOptions.shortHubUrl);
		});
	}
};

/***/ })
/******/ ]);
//# sourceMappingURL=onbrand.bundle.js.map