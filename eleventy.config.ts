import {realpath} from "fs/promises";
import type {EleventyConfig, CollectionsAPI} from "11ty.ts";
// import {IdAttributePlugin, HtmlBasePlugin} from "@11ty/eleventy";


export default async function (eleventyConfig: EleventyConfig) {
    // Folders to copy to output folder
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("src/scripts.js");
    eleventyConfig.addPassthroughCopy("src/styles.css");

    eleventyConfig.addFilter("percentOf", (percent: number, of = 255) => {
        percent = percent / 100;
        const result = of * percent;
        return result.toString();
    });

    eleventyConfig.addFilter("subtractFrom", (amount: number, from = 255) => {
        const result = from - amount;
        return result.toString();
    });

    eleventyConfig.addFilter("getElementByKey", (array: never[], key: string, value: unknown) => {
        return array?.find(e => e[key] === value) ?? "";
    });

    eleventyConfig.addFilter("stringify", (json, indent = 4) => {
        return JSON.stringify(json, null, indent);
    });

    eleventyConfig.addFilter("date", (dateTime: string | Date, format = "en-US", opts = {}) => {
        if (!dateTime) return "";
        const date = new Date(dateTime);
        if (format === "YYYY-MM-DD") {
            return date.toISOString().split("T")[0];
        }
        return date.toLocaleDateString(format, opts);
    });

    function getPosts(collectionApi: CollectionsAPI) {
        return collectionApi.getFilteredByGlob("./src/projects/*.md");
    }

    eleventyConfig.addCollection("projects", function (collection) {
        return getPosts(collection);
    });

    eleventyConfig.addDataExtension("ts", {
        // @ts-expect-error - types are wrong
        read: false,
        parser: async (filepath: string): Promise<unknown> => {
            const real = await realpath(filepath);

            // sanity check that data is where you expect it to be
            if (!(real.startsWith(`${import.meta.dirname}/src/data/`))) {
                throw new Error("Unsupported data file!");
            }

            const imported = (await import(real) as {default: unknown;}).default;

            if (typeof imported === "function") {
                return await imported();
            }
            return imported;
        },
    });

    return {
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        dir: {
            input: "src",
            output: "dist",
            data: "data",
            layouts: "layouts",
            includes: "includes"
        }
    };
}