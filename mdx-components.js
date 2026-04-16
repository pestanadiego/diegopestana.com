import { TweetEmbed } from './app/components/TweetEmbed'

export function useMDXComponents(components) {
  return { Tweet: TweetEmbed, ...components }
}
