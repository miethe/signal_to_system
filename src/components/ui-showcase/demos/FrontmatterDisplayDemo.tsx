import { FrontmatterDisplay } from "@miethe/ui/display";

const frontmatter = {
  title: "Governed Agentic SDLC",
  date: "2026-03-22",
  tags: ["agentic-sdlc", "governance", "ai-workflow"],
  status: "published",
  author: { name: "Nick Miethe", email: "miethe.dev@gmail.com" },
};

export function FrontmatterDisplayDemo() {
  return <FrontmatterDisplay frontmatter={frontmatter} />;
}
