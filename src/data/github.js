const cachedFetch = require("@11ty/eleventy-fetch");
const repos = require("./repos");

module.exports = async function() {
    const results = [];
    for (const repo of repos) {
        results.push(await cachedFetch(`https://api.github.com/repos/${repo.includes("/") ? repo : "rauenzi/" + repo}`, {
            duration: "1h", // 1 day
            type: "json", // also supports "text" or "buffer"
            verbose: true
        }));
    }

    return {
        repos: repos,
        count: results.length,
        stars: results.reduce((prev, current) => prev + current.stargazers_count, 0),
        issues: results.reduce((prev, current) => prev + current.open_issues_count, 0),
        projects: results
    };
};