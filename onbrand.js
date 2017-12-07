// -- Imports -- //
const devOptions = require('./dev-options.js'); //Development options
const onbrand_scss = require('./onbrand.scss'); //Onbrand styles
const client_scss = require('./client/client.scss'); //client styles
const htmlHeader = require('./includes/header.html');
const htmlFooter = require('./includes/footer.html');
const onbrandUtilityFunctions = require('onbrandutilityfunctions');
// -- Startup -- //
production ? null : onbrandUtilityFunctions.devMode(devOptions);
$('body').prepend(htmlHeader);
$('body').append(htmlFooter);
window.onbrandLoaded = false;
onbrandUtilityFunctions.fixShareWidgetImproved();

// -- Custom Functions -- //

// -- Hub Events -- //
const onLoadAndPageChange = function() {
	onbrandUtilityFunctions.blockCtaFix();
	onbrandUtilityFunctions.fadeOutItem();
};
Hubs.Events.on('load', function() {
	if (!window.onbrandLoaded) {
		onLoadAndPageChange();
		// Add your onloads here...

		// end your onloads before here...
		window.onbrandLoaded = true;
	}
})
	.on('pageChange', function() {
		onLoadAndPageChange();
	})
	.on('itemsLoaded', function(itemIds, selectors) {})
	.on('resize', function() {
		sideCtaFix();
		addThisFix();
	})
	.on('scroll', function() {
		sideCtaFix();
		addThisFix();
		onbrandUtilityFunctions.blockCtaFix();
		onbrandUtilityFunctions.fadeOutItem();
	})
	.on('ctaActivate', function(ctaId) {})
	.on('ctaFormSubmitSuccess', function(ctaId, mappedData, ctaName) {})
	.on('search', function() {});

//The new hub events can trigger before cihost scripts are loaded. This will ensure your scripts fire no matter what, but not more than once for 'load'.
if (!window.onbrandLoaded) {
	Hubs.Events.trigger('load');
}
