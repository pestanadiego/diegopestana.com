import { Suspense } from "react";
import { EmbeddedTweet, TweetNotFound, TweetSkeleton } from "react-tweet";
import { getTweet, type Tweet } from "react-tweet/api";

async function TweetContent({ id }: { id: string }) {
  let tweet: Tweet | undefined;
  try {
    tweet = await getTweet(id);
  } catch (err) {
    console.error("getTweet failed", id, err);
  }

  if (!isRealTweet(tweet)) {
    return <TweetNotFound error={{ message: `Tweet ${id} unavailable` }} />;
  }

  return <EmbeddedTweet tweet={normalizeTweet(tweet)} />;
}

function isRealTweet(tweet: Tweet | undefined): tweet is Tweet {
  if (!tweet || tweet.__typename !== "Tweet") return false;
  if (typeof tweet.display_text_range?.[0] !== "number") return false;
  if (!tweet.user || typeof tweet.user.name !== "string") return false;
  return true;
}

function normalizeTweet(tweet: Tweet): Tweet {
  const entities: Partial<Tweet["entities"]> = tweet.entities ?? {};
  return {
    ...tweet,
    entities: {
      ...entities,
      hashtags: entities.hashtags ?? [],
      user_mentions: entities.user_mentions ?? [],
      urls: entities.urls ?? [],
      symbols: entities.symbols ?? [],
    },
  };
}

export function TweetEmbed({ id }: { id: string }) {
  return (
    <div className="my-6 flex justify-center" data-theme="light">
      <Suspense fallback={<TweetSkeleton />}>
        <TweetContent id={id} />
      </Suspense>
    </div>
  );
}
