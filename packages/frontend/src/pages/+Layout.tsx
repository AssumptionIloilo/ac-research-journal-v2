import getTitle from "@/utils/get-title";
import { type PropsWithChildren } from "react";
import { useMetadata } from "vike-metadata-react";

import { Toaster } from "react-hot-toast";

import { client, ssrCache } from "@/lib/urql-client";
import "@/styles/app.css";
import "@/styles/nprogress.css";
import { Provider as UrqlProvider } from "urql";
import { useData } from "vike-react/useData";

useMetadata.setGlobalDefaults({
  title: getTitle("Home"),
  description: "Demo showcasing Vike and Solid.",
  openGraph: {
    url: "https://publications.assumptioniloilo.edu.ph",
    images: [
      {
        url: "/og-image.png",
        width: 800,
        height: 600,
        alt: "Assumption Iloilo Publications",
        type: "image/png",
      },
      {
        url: "/og-image.png",
        width: 900,
        height: 800,
        alt: "Assumption Iloilo Publications",
        type: "image/png",
      },
      { url: "/og-image.png" },
      { url: "/og-image.png" },
    ],
    siteName: "Assumption Iloilo Publications",
  },
  twitter: {
    card: "summary_large_image",
  },
  otherJSX: () => (
    <>
      <link rel="icon" href="/favicon.svg" />
    </>
  ),
});

export default function RootLayout(props: PropsWithChildren) {
  const pageData = useData<any>();
  if (pageData?.urqlState) ssrCache.restoreData(pageData.urqlState);

  return (
    <UrqlProvider value={client}>
      {props.children}
      <Toaster />
    </UrqlProvider>
  );
}
