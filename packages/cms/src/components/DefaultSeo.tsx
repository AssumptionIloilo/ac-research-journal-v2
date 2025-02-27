import { FC } from 'react';
import { DefaultSeo as DefaultNextSeo } from 'next-seo';

type DefaultSeo = {};

const DefaultSeo: FC<DefaultSeo> = (props) => {
  const defaultTitle = 'Assumption Iloilo Publications';
  const defaultDescription =
    "Assumption Iloilo's Official Research & Student Publications Archive. Discover the latest in Assumption Iloilo news and research.";
  return (
    <DefaultNextSeo
      defaultTitle={defaultTitle}
      titleTemplate={`%s | ${defaultTitle}`}
      description={defaultDescription}
      canonical="https://ac-publications.com/" // TODO: ADD DOMAIN HERE
      openGraph={{
        url: 'https://www.ac-publications.com/', // TODO: ADD DOMAIN HERE
        title: defaultTitle,
        description: defaultDescription,
        images: [
          {
            url: '/og-image.png',
            width: 800,
            height: 600,
            alt: 'Assumption Iloilo Publications',
            type: 'image/png',
          },
          {
            url: '/og-image.png',
            width: 900,
            height: 800,
            alt: 'Assumption Iloilo Publications',
            type: 'image/png',
          },
          { url: '/og-image.png' },
          { url: '/og-image.png' },
        ],
        siteName: 'Assumption Iloilo Publications',
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/favicon.svg',
        },
      ]}
    />
  );
};

export default DefaultSeo;
