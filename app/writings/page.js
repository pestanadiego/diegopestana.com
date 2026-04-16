import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

export const metadata = {
  title: 'Writings',
  description: 'Essays, notes, and technical writing.',
}

function getPosts() {
  const dir = path.join(process.cwd(), 'writings')
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8')
      const { data } = matter(raw)
      return { slug, ...data }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export default function WritingsPage() {
  const posts = getPosts()

  return (
    <section className="mb-8">
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">writings</h1>
      <div className="prose prose-neutral">
        {posts.map(({ slug, title, date, description }) => (
          <div key={slug}>
            <Link href={`/writings/${slug}`} className="no-underline">
              <div className="flex justify-between items-baseline">
                <h2 className="font-medium text-base mt-0 mb-1 tracking-tighter">
                  {title}
                </h2>
                <span className="text-neutral-600 text-sm ml-4 shrink-0">{date}</span>
              </div>
            </Link>
            <p className="!mt-1 !mb-6 text-neutral-600 text-sm">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
