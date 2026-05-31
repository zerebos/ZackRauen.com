import githubDataLoader from "../data/github.ts";

let githubDataPromise: Promise<Awaited<ReturnType<typeof githubDataLoader>>> | undefined;

export function getGithubData() {
  githubDataPromise ??= githubDataLoader();
  return githubDataPromise;
}
