module.exports = function (eleventyConfig) {
    // Folders to copy to output folder
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("src/scripts.js");
    eleventyConfig.addPassthroughCopy("src/styles.css");

    eleventyConfig.addFilter("percentOf", (percent, of = 255) => {
        percent = percent / 100;
        return of * percent;
    });

    eleventyConfig.addFilter("subtractFrom", (amount, from = 255) => {
        return from - amount;
    });

    eleventyConfig.addFilter("getElementByKey", (array, key, value) => {
        return array.find(e => e[key] === value);
    })

    function getPosts(collectionApi) {
        return collectionApi.getFilteredByGlob("./src/projects/*.md");
    }

    eleventyConfig.addCollection("projects", function (collection) {
        return getPosts(collection);
    });

    return {
        htmlTemplateEngine: "njk",
        dir: {
            input: "src",
            output: "dist",
            data: "data",
            layouts: "layouts"
        }
    }
};