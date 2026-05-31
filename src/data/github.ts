import {mkdir, readFile, writeFile} from "node:fs/promises";
import repos from "./repos.ts";

type RepoResponse = {
  full_name: string;
  default_branch: string;
  stargazers_count: number;
  open_issues_count: number;
  subscribers_count: number;
  forks: number;
  pushed_at: string;
  license?: {name?: string | null} | null;
};

type GithubData = {
  repos: string[];
  languages: Record<string, Record<string, number>>;
  branches: Record<string, string[]>;
  count: number;
  stars: number;
  issues: number;
  projects: RepoResponse[];
};

type CachePayload = {
  createdAt: number;
  data: GithubData;
};

const CACHE_PATH = new URL("../../.cache/github-data.json", import.meta.url);
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000;

function getHeaders() {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    "User-Agent": "zerebos/ZackRauen.com",
    "Accept": "application/vnd.github+json",
  };

  if (token) {
    headers.Authorization = token.startsWith("Bearer ") || token.startsWith("token ")
      ? token
      : "Bearer " + token;
  }

  return headers;
}

async function readCache(): Promise<GithubData | null> {
  try {
    const raw = await readFile(CACHE_PATH, "utf8");
    const payload = JSON.parse(raw) as CachePayload;
    if (Date.now() - payload.createdAt <= CACHE_DURATION_MS) {
      return payload.data;
    }
  }
  catch {
    return null;
  }

  return null;
}

async function writeCache(data: GithubData) {
  await mkdir(new URL("../../.cache/", import.meta.url), {recursive: true});
  const payload: CachePayload = {
    createdAt: Date.now(),
    data,
  };
  await writeFile(CACHE_PATH, JSON.stringify(payload), "utf8");
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {headers: getHeaders()});
    if (!response.ok) return null;
    return await response.json() as T;
  }
  catch {
    return null;
  }
}

export default async function () {
  const cached = await readCache();
  if (cached) return cached;

  const fullRepoNames = repos.map((repo) => (repo.includes("/") ? repo : `zerebos/${repo}`));

  const repoRequests = await Promise.all(fullRepoNames.map((repo) => fetchJson<RepoResponse>(`https://api.github.com/repos/${repo}`)));
  const repoResults = repoRequests.filter((repo): repo is RepoResponse => Boolean(repo));

  const languageRequests = await Promise.all(
    fullRepoNames.map(async (repo) => {
      const languages = await fetchJson<Record<string, number>>(`https://api.github.com/repos/${repo}/languages`);
      if (!languages) return [repo, {}] as const;

      const total = Object.values(languages).reduce((sum, value) => sum + value, 0);
      if (total === 0) return [repo, {}] as const;

      const withPercentages: Record<string, number> = {};
      for (const [language, value] of Object.entries(languages)) {
        withPercentages[language] = Math.round((value / total) * 10000) / 100;
      }

      return [repo, withPercentages] as const;
    })
  );

  const branchRequests = await Promise.all(
    fullRepoNames.map(async (repo) => {
      const branches = await fetchJson<Array<{name: string}>>(`https://api.github.com/repos/${repo}/branches`);
      return [repo, branches?.map((branch) => branch.name) ?? []] as const;
    })
  );

  const data: GithubData = {
    repos,
    languages: Object.fromEntries(languageRequests),
    branches: Object.fromEntries(branchRequests),
    count: repoResults.length,
    stars: repoResults.reduce((total, repo) => total + repo.stargazers_count, 0),
    issues: repoResults.reduce((total, repo) => total + repo.open_issues_count, 0),
    projects: repoResults,
  };

  await writeCache(data);
  return data;
}
