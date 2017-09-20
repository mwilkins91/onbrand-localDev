
//npm run dev => Builds dev code
//npm run prod => Builds prod code (previously you changed production: to true)

const devOptions = {
	shortHubUrl: 'mark3.ufcontent.com/', //change me to the base url of your hub (no http(s) or www)
	fullHubUrl: 'http://mark3.ufcontent.com/', //exact url to access hub
	cihostFolder: 'markwilkins', //change me to the cihost folder name
	remindMeToGit: true,
	notifyOnBuildSuccess: true //Gives a (slightly annoying?) message whenever a build completes successfully
};


module.exports = devOptions;
