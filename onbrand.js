// -- Imports -- //
require('babel-polyfill'); // use all the things!
require('./onbrand.scss'); // Onbrand styles
require('./client/client.scss'); // client styles
const devOptions = require('./dev-options.js'); // Development options
const htmlHeader = require('./includes/header.html');
const htmlFooter = require('./includes/footer.html');
const onbrandUtilityFunctions = require('onbrandutilityfunctions');

// -- Startup -- //
if (production) onbrandUtilityFunctions.devMode(devOptions);
window.onbrandLoaded = false;
$('body').prepend(htmlHeader);
$('body').append(htmlFooter);

// old time embed error throw "fix" (TODO: make this better)
onbrandUtilityFunctions.legacyEmbedTileFix();
// Remove the "touch" class on touchscreen laptops
onbrandUtilityFunctions.removeTouchForLaptops();
// Remove the hub function updateOverlaySize
onbrandUtilityFunctions.overrideHubFuctions();
// Adds body classes for content type (blogPost, youtube, sales-stream etc)
onbrandUtilityFunctions.helpfulClasses();
// Rebuild the share widget for the top-nav
onbrandUtilityFunctions.fixShareWidgetImproved();
// warns you if your query string is missing.
onbrandUtilityFunctions.noQueryStringSafeguard();
// makes the reco engine sticky to the target / top of screen
onbrandUtilityFunctions.recoEnginePositioning('.top-nav');
// Pre hub event hub events (Note: disabled by default)
// onbrandUtilityFunctions.legacyEvents();

// -- Custom Functions -- //

// -- Hub Events -- //
const onLoadAndPageChange = function () {
  onbrandUtilityFunctions.blockCtaFix();
  onbrandUtilityFunctions.fadeOutItem();
};

Hubs.Events.on('load', () => {
  if (!window.onbrandLoaded) {
    onLoadAndPageChange();
    // Add your onloads here...

    // end your onloads before here...
    window.onbrandLoaded = true;
  }
})
  .on('pageChange', () => {
    onLoadAndPageChange();
  })
  .on('itemsLoaded', (itemIds, selectors) => {})
  .on('resize', () => {
    onbrandUtilityFunctions.sideCtaFix();
    onbrandUtilityFunctions.addThisFix();
  })
  .on('scroll', () => {
    onbrandUtilityFunctions.sideCtaFix();
    onbrandUtilityFunctions.addThisFix();
    onbrandUtilityFunctions.blockCtaFix();
    onbrandUtilityFunctions.fadeOutItem();
  })
  .on('ctaActivate', (ctaId) => {})
  .on('ctaFormSubmitSuccess', (ctaId, mappedData, ctaName) => {})
  .on('search', () => {});

// The new hub events can trigger before cihost scripts are loaded. This will ensure your scripts fire no matter what, but not more than once for 'load'.
if (!window.onbrandLoaded) {
  Hubs.Events.trigger('load');
}
