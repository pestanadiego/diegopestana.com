import fs from "fs";
import matter from "gray-matter";
import path from "path";

const writingsDir = path.join(process.cwd(), "writings");

type PostMeta = {
  title: string;
  date: string;
  description: string;
};

export function getPost(slug: string) {
  const raw = fs.readFileSync(path.join(writingsDir, `${slug}.mdx`), "utf8");
  return { slug, ...(matter(raw).data as PostMeta) };
}

export function getPosts() {
  return fs
    .readdirSync(writingsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => getPost(file.replace(/\.mdx$/, "")))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
