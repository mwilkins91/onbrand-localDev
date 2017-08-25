(function($, Hubs, undefined) {
  /** 
   *  Header & Footer Ajax
   */
  var subdir = "default",
    version = 1;

  /* Insert Header */
  $.ajax({
    url: '//cihost.uberflip.com/' + subdir + '/includes/header.html?' + version
  }).done(function(data) {
    $('body').prepend(data);
  });

  /* Insert Footer */
  $.ajax({
    url: '//cihost.uberflip.com/' + subdir + '/includes/footer.html?' + version
  }).done(function(data) {
    $('body > footer').remove();
    $('body').append(data);
  });

  /** 
   *  Custom Functions
   */

  /** 
   *  Events
   */

  $(window).on('load', function() {
    fixShareWidget();
    $('a').each(function(index, el) {
      $(this).attr('href', $(this).attr('href').replace('https://markwilkins.uberflip.com/', '/'));
    });
  }).on('pageChange', function() {
    $('a').each(function(index, el) {
      $(this).attr('href', $(this).attr('href').replace('https://markwilkins.uberflip.com/', '/'));
    });
  }).on('loadAdditionalItems', function() {
    $('a').each(function(index, el) {
      $(this).attr('href', $(this).attr('href').replace('https://markwilkins.uberflip.com/', '/'));
    });
  }).on('resize', function() {
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