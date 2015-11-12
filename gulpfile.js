var gulp = require('gulp');
var path = require('path');
var zip = require('gulp-zip');
var fs = require('fs');
var packagename = "Package.zip";

gulp.task('default', function () {

	var packagePaths = ['**', 
					'!**/_package/**', 
					'!**/typings/**',
					'!typings', 
					'!_package', 
					'!gulpfile.js']
	
	//add exclusion patterns for all dev dependencies
	var packageJSON = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
	var devDeps = packageJSON.devDependencies;

	for(var propName in devDeps)
	{
		var excludePattern1 = "!**/node_modules/" + propName + "/**";
		var excludePattern2 = "!**/node_modules/" + propName;
		packagePaths.push(excludePattern1);
		packagePaths.push(excludePattern2);
	}

	var stagingpath = process.env.BUILD_STAGINGDIRECTORY;
	
	console.log("Creating file " + stagingpath + "\\" + packagename);
	
		return gulp.src(packagePaths)
			.pipe(zip(packagename))
			.pipe(gulp.dest(stagingpath));
});
