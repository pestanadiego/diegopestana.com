import { Tweet } from 'react-tweet'

export function TweetEmbed({ id }) {
  return (
    <div className="flex justify-center not-prose my-6" data-theme="light">
      <Tweet id={id} />
    </div>
  )
}
