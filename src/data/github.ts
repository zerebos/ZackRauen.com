import dotenv from "dotenv";
// @ts-expect-error - no types for this package
import cachedFetch from "@11ty/eleventy-fetch";
import repos from "./repos";

dotenv.config();

// GitHub ignores a token sent without the `Bearer` scheme and treats the request as anonymous
const fetchOptions = {
    headers: {
        ...(process.env.GITHUB_TOKEN && {Authorization: `Bearer ${process.env.GITHUB_TOKEN}`}),
        "User-Agent": "@zerebos/ZackRauen.com"
    }
};

/**
 * Prints why a GitHub request failed. Failed requests are skipped so the build
 * still finishes, which is why this logs instead of throwing.
 */
async function reportError(what: string, repo: string, error: unknown) {
    const lines = [`[github] Couldn't fetch ${what} for ${repo}`];

    // `eleventy-fetch` throws on a non-2xx status and puts the unread `Response` in `cause`
    const cause = error instanceof Error ? error.cause : undefined;
    if (cause instanceof Response) {
        lines.push(`  GitHub answered ${cause.status} ${cause.statusText}`);

        const body = await cause.json().catch(() => undefined) as {message?: string;} | undefined;
        if (body?.message) lines.push(`  GitHub says: ${body.message}`);

        if (cause.headers.get("x-ratelimit-remaining") === "0") {
            const reset = Number(cause.headers.get("x-ratelimit-reset")) * 1000;
            const limit = cause.headers.get("x-ratelimit-limit");
            lines.push(`  You're out of API requests (limit ${limit}/hour) until ${new Date(reset).toLocaleTimeString()}`);
            if (limit === "60") lines.push("  That's the anonymous limit, so GitHub didn't accept GITHUB_TOKEN");
        }
        if (cause.status === 401) lines.push("  Check that GITHUB_TOKEN in .env is set and still valid");
        if (cause.status === 404) lines.push("  Check the repo name in repos.ts, or whether the token can see a private repo");
    }
    else if (error instanceof Error) {
        // A network failure is a `TypeError("fetch failed")` with the real reason (like ENOTFOUND) in `cause`
        const reason = error.cause instanceof Error ? error.cause.message : error.message;
        lines.push(`  ${reason}`);
    }
    else {
        lines.push(`  ${String(error)}`);
    }

    // eslint-disable-next-line no-console -- build-time output is the point here
    console.error(lines.join("\n"));
}

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
        catch (error) {
            await reportError("repo info", repo, error);
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
        catch (error) {
            await reportError("languages", fullName, error);
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
        catch (error) {
            await reportError("branches", fullName, error);
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