const { src, dest, watch } = require("gulp");
const minifyJs = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const path = require("path");

// Bundle JavaScript files
const bundleJs = () => {
    const sourcePaths = [
        path.resolve("./code/*.js"),
        path.resolve("./code1/*.js"),
        path.resolve("./code2/*.js")
    ];
    
    const destinationPaths = [
        path.resolve("dist/minify"),
        path.resolve("dist/minify1"),
        path.resolve("dist/minify2")
    ];

    console.log("Source Paths: ", sourcePaths);
    console.log("Destination Paths: ", destinationPaths);

    const tasks = sourcePaths.map((sourcePath, index) => {
        return new Promise((resolve, reject) => {
            src(sourcePath, { allowEmpty: true })
                .pipe(sourcemaps.init()) // Initialize sourcemaps
                .pipe(minifyJs())
                .pipe(sourcemaps.write('.')) // Write sourcemaps to the same directory
                .pipe(dest(destinationPaths[index]))
                .on('end', () => {
                    console.log(`Gulp task complete for ${sourcePath}`);
                    resolve();
                })
                .on('error', (err) => {
                    console.error(`Error processing ${sourcePath}: ${err.message}`);
                    reject(err);
                });
        });
    });

    return Promise.all(tasks);
};

// Watch for changes in source files and run bundleJs
const devWatch = () => {
    const sourcePaths = [
        path.resolve("./code/*.js"),
        path.resolve("./code1/*.js"),
        path.resolve("./code2/*.js")
    ];

    console.log("Watching paths: ", sourcePaths);

    sourcePaths.forEach(sourcePath => {
        watch(sourcePath, bundleJs);
    });
};

// Export tasks
exports.bundleJs = bundleJs;
exports.devWatch = devWatch;
