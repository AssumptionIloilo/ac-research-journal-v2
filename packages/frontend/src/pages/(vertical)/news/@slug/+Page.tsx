import { RichText } from "@/components/rich-text"; // REPLACE WITH TAILWIND PROSE
import { NewsPageBySlugDocument } from "@/queries/news";
import { container } from "@/styles/variants";
import { formatDate } from "@/utils/format-date";
import getTitle from "@/utils/get-title";
import { mediaUrl } from "@/utils/media-url";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "urql";
import { useMetadata } from "vike-metadata-react";
import { usePageContext } from "vike-react/usePageContext";

import { publicConfig } from "@/config.public";
import { ready, subscribe, unsubscribe } from "@payloadcms/live-preview";

// =============================================================================
// News Page (For Querying & Hydrating)
// =============================================================================
export default function NewsPage() {
  const { routeParams, urlPathname } = usePageContext();

  const [{ data }] = useQuery({
    query: NewsPageBySlugDocument,
    variables: {
      slug: routeParams.slug,
    },
  });

  const _newsArticle = data?.allNews?.docs?.at(0);
  // Clientside State.
  const [newsArticle, setNewsArticle] = useState(_newsArticle);
  const hasSentReadyMessage = useRef<boolean>(false);

  useMetadata({
    title: getTitle(newsArticle?.title),
    openGraph: {
      images: [{ url: "https://example.com/og-image.png" }],
    },
  });

  useEffect(() => {
    const subscription = subscribe({
      serverURL: publicConfig.CMS_ENDPOINT,
      callback: (_data) => {
        setNewsArticle(_data);
      },
      initialData: newsArticle,
    });

    // Once subscribed, send a `ready` message back up to the Admin Panel
    // This will indicate that the front-end is ready to receive messages
    if (!hasSentReadyMessage.current) {
      hasSentReadyMessage.current = true;

      ready({
        serverURL: publicConfig.CMS_ENDPOINT,
      });
    }

    return () => {
      unsubscribe(subscription);
    };
  }, []);

  return (
    <div className={container({ class: "pt-10 pb-20 gap-y-12" })}>
      <header className="flex flex-col gap-y-8">
        <h1 className="font-bold text-2xl max-w-lg mx-auto text-center">{newsArticle?.title}</h1>
        <div className="flex gap-x-2 justify-center">
          <div className="relative w-10 h-10">
            <img
              src={mediaUrl(newsArticle?.author?.avatarImage?.url)}
              alt={newsArticle?.author?.name ?? "author profile"}
              width={40}
              height={40}
              className="object-cover w-full h-full rounded-full bg-primary-300 flex-shrink-0"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-dark-800 font-medium">{newsArticle?.author?.name}</span>
            <span className="text-sm text-dark-400 font-medium">
              {formatDate(newsArticle?.publishedDate)}
            </span>
          </div>
        </div>

        <div
          className="relative h-80 w-full bg-primary-50 rounded-md overflow-hidden"
          style={{
            viewTransitionName: `newsimg-${newsArticle?.id}`,
          }}
        >
          <img
            className="w-full h-full object-cover absolute blur-md scale-110"
            src={mediaUrl(newsArticle?.featureImage?.url)}
            alt={newsArticle?.featureImage?.alt ?? ""}
          />
          <img
            aria-hidden
            className="pointer-events-none select-none relative w-full h-full object-cover md:object-contain group-hover:scale-105 transition object-center"
            src={mediaUrl(newsArticle?.featureImage?.url)}
            alt={newsArticle?.featureImage?.alt ?? ""}
          />
          {/* <img
            alt={newsArticle?.featureImage?.alt ?? ""}
            src={mediaUrl(newsArticle?.featureImage?.url)}
            className="object-cover object-center"
          /> */}
        </div>
      </header>

      <div className="max-w-4xl mx-auto w-full prose">
        <RichText data={newsArticle?.content} />
      </div>
    </div>
  );
}
