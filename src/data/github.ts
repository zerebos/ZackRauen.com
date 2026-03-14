import dotenv from "dotenv";
// @ts-expect-error - no types for this package
import cachedFetch from "@11ty/eleventy-fetch";
import repos from "./repos";

dotenv.config();

const fetchOptions = {
    headers: {
        "Authorization": process.env.GITHUB_TOKEN,
        "User-Agent": "@zerebos/ZackRauen.com"
    }
};

export default async function () {
    const repoResults = [];
    for (const repo of repos) {
        try {
            const resp = await cachedFetch(`https://api.github.com/repos/${repo.includes("/") ? repo : "zerebos/" + repo}`, {
                duration: "1d", // 1 day
                type: "json", // also supports "text" or "buffer"
                verbose: true,
                fetchOptions: fetchOptions
            });
            repoResults.push(resp);
        }
        catch {
            // Do nothing
        }
    }

    const langResults: Record<string, Record<string, number>> = {};
    for (const repo of repos) {
        const fullName = repo.includes("/") ? repo : "zerebos/" + repo;
        try {
            const temp = await cachedFetch(`https://api.github.com/repos/${fullName}/languages`, {
                duration: "1d", // 1 day
                type: "json", // also supports "text" or "buffer"
                verbose: true,
                fetchOptions: fetchOptions
            }) as Record<string, number>;
            const current = Object.assign({}, temp);
            // console.log(current);

            const sum = Object.values(current).reduce((prev, curr) => prev + curr, 0);
            for (const lang in current) {
                const portion = current[lang];
                const decimal = portion / sum;
                // console.log({portion, sum});
                current[lang] = Math.round(decimal * 100 * 100) / 100;
            }

            langResults[fullName] = current;
            // console.log(current);
            // console.log("")
        }
        catch {
            // do nothing
        }
    }

    const branchResults: Record<string, string[]> = {};
    for (const repo of repos) {
        const fullName = repo.includes("/") ? repo : "zerebos/" + repo;
        try {
            const current = await cachedFetch(`https://api.github.com/repos/${fullName}/branches`, {
                duration: "1d", // 1 day
                type: "json", // also supports "text" or "buffer"
                verbose: true,
                fetchOptions: fetchOptions
            }) as Array<{name: string;}>;

            branchResults[fullName] = current.map(b => b.name);
        }
        catch {
            // do nothing
        }
    }

    return {
        repos: repos,
        languages: langResults,
        branches: branchResults,
        count: repoResults.length,
        stars: repoResults.reduce((prev, current) => prev + current.stargazers_count, 0),
        issues: repoResults.reduce((prev, current) => prev + current.open_issues_count, 0),
        projects: repoResults
    };
}