import dotenv from "dotenv";
import {cachedFetch, DAY} from "../lib/cache";
import repos from "./repos";

dotenv.config();

/** The subset of the GitHub repository payload consumed by the templates. */
export interface GitHubRepo {
    full_name: string;
    default_branch: string;
    license: {name: string;} | null;
    pushed_at: string;
    stargazers_count: number;
    subscribers_count: number;
    forks: number;
    open_issues: number;
    open_issues_count: number;
}

export interface GitHubData {
    repos: string[];
    languages: Record<string, Record<string, number>>;
    branches: Record<string, string[]>;
    count: number;
    stars: number;
    issues: number;
    projects: GitHubRepo[];
}

const headers: Record<string, string> = {
    "User-Agent": "@zerebos/ZackRauen.com",
};
const token = process.env.GITHUB_TOKEN;
if (token) {
    // GitHub requires an auth scheme (`Bearer <token>`). Tolerate a token that
    // already includes a scheme so an existing `token …`/`Bearer …` value in the
    // environment is not doubled up.
    headers.Authorization = /^(bearer|token)\s/i.test(token) ? token : `Bearer ${token}`;
}

const fullName = (repo: string) => (repo.includes("/") ? repo : `zerebos/${repo}`);

let cache: Promise<GitHubData> | null = null;

async function load(): Promise<GitHubData> {
    const projects: GitHubRepo[] = [];
    for (const repo of repos) {
        try {
            projects.push(await cachedFetch<GitHubRepo>(`https://api.github.com/repos/${fullName(repo)}`, {
                duration: DAY,
                headers,
            }));
        }
        catch {
            // Skip repos that fail to load (e.g. rate limiting, private, deleted).
        }
    }

    // Only look up languages and branches for repositories that actually
    // loaded above. Iterating the successful `projects` (rather than every
    // entry in `repos`) avoids redundant, failing requests for repos that are
    // missing, private, or rate limited.
    const languages: Record<string, Record<string, number>> = {};
    const branches: Record<string, string[]> = {};
    for (const {full_name: name} of projects) {
        try {
            const raw = await cachedFetch<Record<string, number>>(`https://api.github.com/repos/${name}/languages`, {
                duration: DAY,
                headers,
            });
            const total = Object.values(raw).reduce((sum, bytes) => sum + bytes, 0);
            const percentages: Record<string, number> = {};
            if (total > 0) {
                for (const [language, bytes] of Object.entries(raw)) {
                    percentages[language] = Math.round((bytes / total) * 100 * 100) / 100;
                }
            }
            languages[name] = percentages;
        }
        catch {
            // Ignore language lookup failures.
        }

        try {
            const raw = await cachedFetch<Array<{name: string;}>>(`https://api.github.com/repos/${name}/branches`, {
                duration: DAY,
                headers,
            });
            branches[name] = raw.map(branch => branch.name);
        }
        catch {
            // Ignore branch lookup failures.
        }
    }

    return {
        repos,
        languages,
        branches,
        count: projects.length,
        stars: projects.reduce((sum, repo) => sum + repo.stargazers_count, 0),
        issues: projects.reduce((sum, repo) => sum + repo.open_issues_count, 0),
        projects,
    };
}

/** Fetch and aggregate GitHub stats, memoized so a single build only loads once. */
export default function github(): Promise<GitHubData> {
    cache ??= load();
    return cache;
}
