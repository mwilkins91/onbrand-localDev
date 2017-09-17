# Welcome to the Onbrand Webpack Project Template

- [How to](#How-to)
- [Possible Errors](#Possible-Errors)
- [Snippets](#Add-to-hub)
- [Deploying](#Deploying-to-Production)




# How to:

1. ssh into the onbrand server, and run `generate`. Follow the instructions. (in this case, select the webpack tempalate)
2. after the generator is finished, and you have entered the git username and password, copy the gitlab address that is displayed
3. exit the ssh with `exit` (or open a new terminal tab) and navigate to your projects directory on your local terminal
4. in your project directory, type `git clone <fetch url>`
5. after the clone is done, navigate inside and run `npm install`
6. open your new project in your text editor, and open the _dev-options.js_ file.
7. Edit the options to match your current project.
8. In the uberflip backend app, add the below snippets to the appropriate areas of the custom code section.
9. in your terminal, run `npm run dev`.
**You're ready! Go!**

# Possible Errors
- To be added...


# Add to hub 


## CSS
```

/** 
 *  onBrand CSS – WARNING: Do not remove code block below.
 */
</style>
     <link rel="stylesheet" href="/build/style.css">
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
<script src="/build/onbrand.bundle.js"></script>
<script>
(function($, Hubs, undefined) {
/*  Add your JavaScript below */
	
```


# Deploying to Production

- in _dev-options.js_ switch `production` to `true`
- in your terminal, run `npm run prod`
- in the uberflip backend, update the custom code snippets to point to the appropriate cihost folder EX `<script src="//cihost.uberflip.com/mycompany/build/onbrand.js"></script>`
- commit all your changes to git.
- ssh into the onbrand server, and navigate to your project's folder
- git pull
**You're Done!**

**NOTE:** if you need to reset the cihost repo, you can use `git reset --hard` to return the repo to its last commit. Careful though, if you made any changes on cihost they'll be gone!
