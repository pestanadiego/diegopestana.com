import { Suspense } from 'react'
import { EmbeddedTweet, TweetNotFound, TweetSkeleton } from 'react-tweet'
import { getTweet } from 'react-tweet/api'

async function TweetContent({ id }) {
  let tweet
  try {
    tweet = await getTweet(id)
  } catch (err) {
    console.error('getTweet failed', id, err)
  }

  if (!isRealTweet(tweet)) {
    return (
      <TweetNotFound
        error={{ message: `Tweet ${id} unavailable` }}
      />
    )
  }

  return <EmbeddedTweet tweet={tweet} />
}

function isRealTweet(tweet) {
  if (!tweet || tweet.__typename !== 'Tweet') return false
  if (typeof tweet.text !== 'string') return false
  if (!Array.isArray(tweet.display_text_range)) return false
  if (!tweet.user || typeof tweet.user.name !== 'string') return false
  const e = tweet.entities
  if (!e) return false
  if (!Array.isArray(e.hashtags)) return false
  if (!Array.isArray(e.user_mentions)) return false
  if (!Array.isArray(e.urls)) return false
  if (!Array.isArray(e.symbols)) return false
  return true
}

export function TweetEmbed({ id }) {
  return (
    <div className="flex justify-center not-prose my-6" data-theme="light">
      <Suspense fallback={<TweetSkeleton />}>
        <TweetContent id={id} />
      </Suspense>
    </div>
  )
}
