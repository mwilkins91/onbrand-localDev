  // -- Imports -- //
  const devOptions = require('./dev-options.js');
  const onbrand_scss = require('./onbrand.scss');
  const htmlHeader = require('./includes/header.html');
  const htmlFooter = require('./includes/footer.html');
  const onbrandUtilities = require('./onbrandUtilities.js');
  
  // -- Startup -- //
  devOptions.production ? null : onbrandUtilities(devOptions);
  $('body').prepend(htmlHeader);
  $('body').append(htmlFooter);







  // -- Hub Events -- //
const onLoadAndPageChange = function() {

};
  Hubs.Events.on('load', function() {
    onLoadAndPageChange();
      fixShareWidget();
    })
    .on('pageChange', function() {
      onLoadAndPageChange();
    }).on('itemsLoaded', function(itemIds, selectors) {


    }).on('resize', function() {
      sideCtaFix();
      addThisFix();
    }).on('scroll', function() {
      sideCtaFix();
      addThisFix();
    }).on('ctaActivate', function(ctaId) {


    }).on('ctaFormSubmitSuccess', function(ctaId, mappedData, ctaName) {


    }).on('search', function() {

    });