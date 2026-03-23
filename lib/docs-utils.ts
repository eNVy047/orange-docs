import fs from "fs";
import path from "path";

export interface DocPage {
  slug: string;
  title: string;
  author: string;
  lastUpdated: string;
  content: string;
}

export const DOC_ORDER = [
  "getting-started",
  "welcome",
  "git-and-github",
  "terminology",
  "behind-the-scenes",
  "branches-in-git",
  "diff-stash-tags",
  "managing-history",
  "collaborate-with-github",
];

export function getDocBySlug(slug: string): DocPage | null {
  const filePath = path.join(process.cwd(), "app/docs/data.md");
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const pages = fileContent.split(/# Page: /).filter(p => p.trim() !== "");

  for (const page of pages) {
    const lines = page.split("\n");
    const currentSlug = lines[0].trim().toLowerCase();

    if (currentSlug === slug.toLowerCase()) {
      let author = "";
      let lastUpdated = "";
      let contentStartIndex = 0;

      // Parse metadata
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].startsWith("author:")) {
          author = lines[i].replace("author:", "").trim();
        } else if (lines[i].startsWith("lastUpdated:")) {
          lastUpdated = lines[i].replace("lastUpdated:", "").trim();
        } else if (lines[i].trim() === "---") {
          contentStartIndex = i + 1;
          break;
        }
      }

      const content = lines.slice(contentStartIndex).join("\n").trim();
      
      // Extract title from first # header in content if possible
      const titleMatch = content.match(/^# (.*)/m);
      const title = titleMatch ? titleMatch[1].trim() : currentSlug;

      return {
        slug: currentSlug,
        title,
        author,
        lastUpdated,
        content,
      };
    }
  }

  return null;
}

export function getPrevNext(slug: string) {
  const index = DOC_ORDER.indexOf(slug.toLowerCase());
  if (index === -1) return { prev: null, next: null };

  const prevSlug = index > 0 ? DOC_ORDER[index - 1] : null;
  const nextSlug = index < DOC_ORDER.length - 1 ? DOC_ORDER[index + 1] : null;

  const prev = prevSlug ? getDocBySlug(prevSlug) : null;
  const next = nextSlug ? getDocBySlug(nextSlug) : null;

  return { prev, next };
}
