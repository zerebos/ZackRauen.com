module.exports = function (eleventyConfig) {
    // Folders to copy to output folder
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("src/scripts.js");
    eleventyConfig.addPassthroughCopy("src/styles.css");

    return {
        dir: {
            input: "src",
            output: "dist",
            data: "src/data",
        }
    }
};