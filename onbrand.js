(function($, Hubs, undefined) {


//Switch me to true when you deploy
  var production = false;
//change me to the base url of your hub (no http(s) or www)
  var hubUrl = 'markwilkins.uberflip.com';



  /** 
   *  Header & Footer Ajax
   */
  var subdir = "default",
    version = 1;

  var urlPath;
  if (!production) {
    urlPath = '/includes/'
  } else {
    urlPath = '//cihost.uberflip.com/' + subdir + '/includes/'
  }


  /* Insert Header */
  $.ajax({
    url: urlPath + 'header.html?' + version
  }).done(function(data) {
    $('body').prepend(data);
  });

  /* Insert Footer */
  $.ajax({
    url: urlPath + 'footer.html?' + version
  }).done(function(data) {
    $('body > footer').remove();
    $('body').append(data);
  });

  /** 
   *  Custom Functions
   */

  var relativeLinks = function(url) {
    var matchThis = new RegExp('^((http[s]?|ftp):\/)?\/?([^:\/\s]+)?(' + url + ')', 'gi');
    $('a').each(function(index, el) {
      var testThis = $(this).attr('href');
      if (matchThis.test(testThis)) {
        var newHref = testThis.replace(matchThis, '');
        $(this).attr('href', newHref);
        $(this).attr('target', '');
      }
    });
  }

  /** 
   *  Events
   */

  if (!production) {
    Hubs.Events.on('load', function() {
      relativeLinks(hubUrl)
    })
    Hubs.Events.on('pageChange', function() {
      relativeLinks(hubUrl)
    })
    Hubs.Events.on('itemsLoaded', function() {
      relativeLinks(hubUrl)
    })
  }

  $(window).on('load', function() {
    fixShareWidget();
  }).on('pageChange', function() {}).on('loadAdditionalItems', function() {}).on('resize', function() {
    sideCtaFix();
    addThisFix();
  }).on('scroll', function() {
    sideCtaFix();
    addThisFix();
  }).on('activateFormCta', function() {

  }).on('submitCtaForm', function() {

  }).on('trackCta', function() {

  }).on('trackCtaView', function() {

  }).on('loadExtraInfo', function() {

  }).on('search', function() {

  }).on('loadFormFieldValues', function() {

  }).on('trackPageView', function() {

  }).on('trackSocial', function() {

  }).on('signalMetricsTemp', function() {

  }).on('updateMAPUsers', function() {

  });

}(window.jQuery, window.Hubs));