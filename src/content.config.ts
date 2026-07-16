import {defineCollection, z} from "astro:content";
import {glob} from "astro/loaders";

const projects = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/content/projects"}),
    schema: z.object({
        title: z.string(),
        blurb: z.string(),
        icon: z.string(),
        repo: z.string(),
    }),
});

export const collections = {projects};
