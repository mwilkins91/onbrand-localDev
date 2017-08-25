const browserSync = require('browser-sync');

browserSync({
  proxy: {
  	target: 'https://markwilkins.uberflip.com/'
  },
  logLevel: "debug",
  serveStatic: ['.'],

});