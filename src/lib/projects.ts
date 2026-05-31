type ProjectFrontmatter = {
  title: string;
  blurb: string;
  icon: string;
  repo?: string;
};

type ProjectModule = {
  frontmatter: ProjectFrontmatter;
  default: unknown;
};

export type ProjectEntry = {
  slug: string;
  frontmatter: ProjectFrontmatter;
  Content: ProjectModule["default"];
};

const projectModules = import.meta.glob<ProjectModule>("/src/projects/*.md", {eager: true});

export function getProjectEntries(): ProjectEntry[] {
  return Object.entries(projectModules)
    .map(([path, module]) => ({
      slug: path.split("/").at(-1)?.replace(/\.md$/, "") ?? "",
      frontmatter: module.frontmatter,
      Content: module.default,
    }))
    .sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title));
}
