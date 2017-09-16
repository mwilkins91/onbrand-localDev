  // -- Imports -- //
  const devOptions = require('./dev-options.js'); //Development options
  const onbrand_scss = require('./onbrand.scss'); //Onbrand AND client styles
  const htmlHeader = require('./includes/header.html');
  const htmlFooter = require('./includes/footer.html');
  const onbrandUtilities = require('./onbrandUtilities.js'); //helper functions for dev

  // -- Startup -- //
  devOptions.production ? null : onbrandUtilities(devOptions);
  $('body').prepend(htmlHeader);
  $('body').append(htmlFooter);

  // -- Custom Functions -- //





  // -- Hub Events -- //
  const onLoadAndPageChange = function () {

  };
  Hubs.Events.on('load', function () {
      onLoadAndPageChange();
      fixShareWidget();
    }).on('pageChange', function () {
      onLoadAndPageChange();
    }).on('itemsLoaded', function (itemIds, selectors) {


    }).on('resize', function () {
      sideCtaFix();
      addThisFix();
    }).on('scroll', function () {
      sideCtaFix();
      addThisFix();
    }).on('ctaActivate', function (ctaId) {


    }).on('ctaFormSubmitSuccess', function (ctaId, mappedData, ctaName) {


    }).on('search', function () {

    });