const browserSync = require('browser-sync');

browserSync({
  proxy: {
  	target: 'https://markwilkins.uberflip.com/'
  },
  logLevel: "debug",
  serveStatic: ['.'],
  files: ["./onbrand.css", "onbrand.js", "./client/client.css", "./includes/header.html", "./includes/footer.html"]

});