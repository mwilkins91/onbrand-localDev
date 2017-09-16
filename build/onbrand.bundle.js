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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// -- Imports -- //
var devOptions = __webpack_require__(1); //Development options
var onbrand_scss = __webpack_require__(2); //Onbrand AND client styles
var htmlHeader = __webpack_require__(3);
var htmlFooter = __webpack_require__(4);
var onbrandUtilities = __webpack_require__(5); //helper functions for dev

// -- Startup -- //
devOptions.production ? null : onbrandUtilities(devOptions);
$('body').prepend(htmlHeader);
$('body').append(htmlFooter);

// -- Custom Functions -- //


// -- Hub Events -- //
var onLoadAndPageChange = function onLoadAndPageChange() {};
Hubs.Events.on('load', function () {
  onLoadAndPageChange();
  fixShareWidget();
}).on('pageChange', function () {
  onLoadAndPageChange();
}).on('itemsLoaded', function (itemIds, selectors) {}).on('resize', function () {
  sideCtaFix();
  addThisFix();
}).on('scroll', function () {
  sideCtaFix();
  addThisFix();
}).on('ctaActivate', function (ctaId) {}).on('ctaFormSubmitSuccess', function (ctaId, mappedData, ctaName) {}).on('search', function () {});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var devOptions = {
	production: false, //Switch me to true when you deploy
	shortHubUrl: 'mark3.ufcontent.com/', //change me to the base url of your hub (no http(s) or www)
	fullHubUrl: 'http://mark3.ufcontent.com/', //exact url to access hub
	remindMeToGit: true,
	notifyOnBuildSuccess: true
};

module.exports = devOptions;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<div id=\"injected-header\">\n\t\n</div>";

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "<div id=\"injected-footer\">\n\t\n\t\n</div>";

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (devOptions) {
  console.warn('Hey Onbrander, Just letting you know that we\'re in dev mode!');
  /** 
   *  Utility Functions
   */
  var _internalLink = function _internalLink(e) {
    e.preventDefault();
    Hubs.changePage(e.target.href);
  };

  var _relativeLinks = function _relativeLinks(url) {
    //We need relative links for local dev, so we regex for the url as the href
    var matchThis = new RegExp('^((http[s]?|ftp):\/)?\/?([^:\/\s]+)?(' + url + ')', 'gi');
    $('a').not('.onBrand--LocalDevLink').each(function (index, el) {
      var testThis = $(this).attr('href');
      if (matchThis.test(testThis)) {
        var newHref = testThis.replace(matchThis, '');
        if (!(newHref[0] === '/')) {
          newHref = '/' + newHref;
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

  if (!devOptions.production) {
    Hubs.Events.on('load', function () {
      _relativeLinks(devOptions.shortHubUrl);
      Hubs.Config.hubBaseUrl = 'http://localhost:3000/';
    });
    Hubs.Events.on('pageChange', function () {
      _relativeLinks(devOptions.shortHubUrl);
      Hubs.Config.hubBaseUrl = 'http://localhost:3000/';
    });
    Hubs.Events.on('itemsLoaded', function () {
      _relativeLinks(devOptions.shortHubUrl);
    });
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=onbrand.bundle.js.map