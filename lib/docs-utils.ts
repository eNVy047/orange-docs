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
  "getting-started/index",
  "git-and-github/welcome",
  "git-and-github/basics",
  "git-and-github/terminology",
  "git-and-github/behind-the-scenes",
  "git-and-github/branches-in-git",
  "git-and-github/diff-stash-tags",
  "git-and-github/managing-history",
  "git-and-github/collaborate-with-github",
  "llm-basics/intro",
  "llm-basics/tokenization",
  "llm-basics/embeddings",
  "llm-basics/foundation-models",
  "llm-basics/rag",
  "llm-basics/gpu-and-ai-intro",
  "llm-basics/llm-crash-course",
  "llm-basics/ai-agents",
  "llm-basics/mcp",
  "llm-basics/sql-and-security",
  "llm-basics/future-of-ai",
];

export function getDocBySlug(slug: string): DocPage | null {
  // Check for specialized data.md in subdirectories first
  const dataFiles = [
    path.join(process.cwd(), "app/docs/llm-basics/data.md"),
    path.join(process.cwd(), "app/docs/getting-started/data.md"),
    path.join(process.cwd(), "app/docs/git-and-github/data.md"),
  ];

  for (const filePath of dataFiles) {
    if (!fs.existsSync(filePath)) continue;

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
