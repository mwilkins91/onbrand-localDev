# Welcome to the Onbrand Webpack Project Template

- [How to](#user-content-how-to)
- [Possible Errors](#user-content-possible-errors)
- [Snippets](#user-content-add-to-hub)
- [Deploying](#user-content-deploying-to-production)




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
- *svg fonts* We have no included support for svg fonts, but this can be added if neccesary. By default webpack will assume svgs are images, and load them accordingly. 


# Add to hub 


## CSS
```
/** =-=-= DEVELOPMENT =-=-= **/
/** 
 *  onBrand CSS – WARNING: Do not remove code block below.
 */

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
<script>
        var url = window.location.href;
    window.hasOnbrand = false;

    if (url.indexOf('?onbrand') != -1) {
        window.hasOnbrand = true;
    } else if (url.indexOf('&onbrand') != -1) {
        window.hasOnbrand = true;
    } else {
        window.hasOnbrand = false;
    }
</script>
<script id="onbrand__styles--script">//<![CDATA[
    if(window.hasOnbrand){
         document.write("<link id=\"onbrand__styles\" rel=\"stylesheet\" href=\"\/build/style.css\">");
    } else {
        document.write("<link id=\"onbrand__styles\" rel=\"stylesheet\" href=\"\/\/cihost.uberflip.com/${cihostFolder}/build/style.css\">");
    }
//]]></script>
<style>
/* Write your CSS rules here */
</style>
```

## HTML
```
<!-- =-=-= DEVELOPMENT =-=-= -->
<!--OnBrand-Dev Tag -- HTML-->
<script id="__bs_script__">//<![CDATA[
    document.write("<script async src='/browser-sync/browser-sync-client.js?v=2.18.13'><\/script>".replace("HOST", location.hostname));
//]]></script>
<script async="" src="/browser-sync/browser-sync-client.js?v=2.18.13"></script>


```


## JS
```
/** =-=-= DEVELOPMENT =-=-= **/
/** 
 *  onBrand JS – WARNING: Do not remove code block below.
 */


<script id="onbrand__styles--script">//<![CDATA[
if (window.hasOnbrand) {
    document.write("<script id=\"onbrand__scripts\" src=\"/build/onbrand.bundle.js\"><\/script>");
} else {
    document.write("<script id=\"onbrand__scripts\" src=\"\/\/cihost.uberflip.com/${cihostFolder}/build/onbrand.bundle.js\"><\/script>");
}
//]]></script>
<script>
/*  Write your JavaScript here */
</script>
	
```


# Deploying to Production

- in your terminal, run `npm run prod`
- After the build completes, the new production snippets will be printed in your terminal. Double check you included the correct cihostFolder in dev-options!
- commit all your changes to git.
- ssh into the onbrand server, and navigate to your project's folder
- git pull
**You're Done!**

**NOTE:** if you need to reset the cihost repo, you can use `git reset --hard` to return the repo to its last commit. Careful though, if you made any changes on cihost they'll be gone!
