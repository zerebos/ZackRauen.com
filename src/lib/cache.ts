import {createHash} from "node:crypto";
import {mkdir, readFile, stat, writeFile} from "node:fs/promises";
import {join} from "node:path";

const CACHE_DIR = join(process.cwd(), ".cache");

export const DAY = 24 * 60 * 60 * 1000;

interface CachedFetchOptions {
    /** How long a cached response is considered fresh, in milliseconds. Defaults to one day. */
    duration?: number;
    headers?: Record<string, string>;
}

/**
 * A tiny build-time fetch cache. Responses are stored as JSON on disk keyed by
 * URL, which keeps repeated builds and dev restarts from hammering (and getting
 * rate limited by) external APIs such as GitHub. This replaces the previous
 * dependency on `@11ty/eleventy-fetch`.
 */
export async function cachedFetch<T>(url: string, options: CachedFetchOptions = {}): Promise<T> {
    const {duration = DAY, headers} = options;
    const key = createHash("sha256").update(url).digest("hex");
    const file = join(CACHE_DIR, `${key}.json`);

    try {
        const stats = await stat(file);
        if (Date.now() - stats.mtimeMs < duration) {
            return JSON.parse(await readFile(file, "utf-8")) as T;
        }
    }
    catch {
        // Cache miss or unreadable entry — fall through to a live request.
    }

    const response = await fetch(url, {headers});
    if (!response.ok) {
        throw new Error(`Request failed (${response.status}): ${url}`);
    }
    const data = await response.json() as T;

    await mkdir(CACHE_DIR, {recursive: true});
    await writeFile(file, JSON.stringify(data), "utf-8");
    return data;
}
