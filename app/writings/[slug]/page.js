import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const writingsDir = path.join(process.cwd(), 'writings')

export function generateStaticParams() {
  const files = fs.readdirSync(writingsDir).filter((f) => f.endsWith('.mdx'))
  return files.map((f) => ({ slug: f.replace(/\.mdx$/, '') }))
}

export const dynamicParams = false

export function generateMetadata({ params }) {
  const raw = fs.readFileSync(path.join(writingsDir, `${params.slug}.mdx`), 'utf8')
  const { data } = matter(raw)
  return { title: data.title, description: data.description }
}

export default async function PostPage({ params }) {
  const { slug } = params
  const raw = fs.readFileSync(path.join(writingsDir, `${slug}.mdx`), 'utf8')
  const { data } = matter(raw)
  const { default: Post } = await import(`@/writings/${slug}.mdx`)

  return (
    <section className="mb-8">
      <h1 className="font-medium text-2xl mb-2 tracking-tighter">{data.title}</h1>
      <p className="text-neutral-600 text-sm mb-8">{data.date}</p>
      <article className="prose prose-neutral">
        <Post />
      </article>
    </section>
  )
}
