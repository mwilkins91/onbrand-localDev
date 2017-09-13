# How to:

1. ssh into the onbrand server, and run `onbrand companyName`.
2. after the generator is finished, and you have entered the git password, type `git remote -v`
3. copy the fetch url that is provided by the command entered in step 2.
4. exit the ssh with `exit` (or open a new terminal tab) and naviate to your projects directory on your local terminal
5. in your project directory, type `git clone <fetch url>`
6. after the clone is done, navigate inside and run `npm install`
7. open your new project in your text editor, and open the _dev-options.js_ file.
8. Edit the options to match your current project.
9. In the uberflip backend app, add the below snippets to the appropriate areas of the custom code section.
10. in your terminal, run `gulp`.
**You're ready! Go!**

# Possible Errors
- when I gulp, the wrong page opens in my browser:

**This is probably either due to a redirect, or the urls being wrong in dev-options.js. Double check they are correct, and they match the url at the end of the redirect chain. If a client changed their url while you were working, you may need to update them.**

- My sourcemaps don't seem to be working...:

**I'm not sure if this is a bug in chome's dev tools, or gulp, or both, but if you load the page with chrome's network tab (in the dev tools) open, the source maps should then work. ¯\\_(ツ)_/¯**


# Add to hub 


## CSS
```

/** 
 *  onBrand CSS – WARNING: Do not remove code block below.
 */
</style>
    <link rel="stylesheet" href="/build/client.css">
    <link rel="stylesheet" href="/build/onbrand.css">
<!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">-->
<style>
/* Add your CSS rules below */

```

## HTML
```

<!--OnBrand-Dev Tag -- HTML-->
<script id="__bs_script__">//<![CDATA[
    document.write("<script async src='/browser-sync/browser-sync-client.js?v=2.18.13'><\/script>".replace("HOST", location.hostname));
//]]></script>
<script async="" src="/browser-sync/browser-sync-client.js?v=2.18.13"></script>


```


## JS
```

/** 
 *  onBrand JS – WARNING: Do not remove code block below.
 */
}(window.jQuery, window.Hubs));
</script>
<script src="//cihost.uberflip.com/onBrand/libs/dist/onbrand-libs.js"></script>
<script src="/build/onbrand.js"></script>
<script>
(function($, Hubs, undefined) {
/*  Add your JavaScript below */
	
```


# Deploying to Production

- in _dev-options.js_ switch `production` to `true`
- in the uberflip backend, update the custom code snippets to point to the appropriate cihost folder EX `<script src="//cihost.uberflip.com/mycompany/build/onbrand.js"></script>`
- commit all your changes to git.
- ssh into the onbrand server, and navigate to your project's folder
- git pull
**You're Done!**
