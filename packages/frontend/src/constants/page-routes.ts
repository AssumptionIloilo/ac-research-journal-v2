export const pageRoutes = {
  home: "/",
  about: "/about",
  news: "/news",
  guide: "/guide",
  archive: "/archive",
} as const;

export const navLinks: Array<{
  /** Label for the link or under icon. */
  label: string;
  /** The route that gets redirected to. */
  url: string;
  /** For Mobile Link. */
  icon: string;
  /** Mobile Link. */
  activeIcon: string;
  /** True if this link is visible on desktop. */
  desktop?: boolean;
}> = [
  {
    label: "Home",
    url: pageRoutes.home,
    icon: "ant-design:home-outlined",
    activeIcon: "ant-design:home-filled",
    desktop: false,
  },
  {
    label: "About",
    url: pageRoutes.about,
    icon: "mdi:about-circle-outline",
    activeIcon: "mdi:about",
  },
  {
    label: "News",
    url: pageRoutes.news,
    icon: "fluent:news-16-regular",
    activeIcon: "fluent:news-20-filled",
  },
  {
    label: "Guide",
    url: pageRoutes.guide,
    icon: "icon-park-outline:guide-board",
    activeIcon: "icon-park-solid:guide-board",
  },
  {
    label: "Transformateur",
    url: pageRoutes.archive,
    icon: "majesticons:note-text-line",
    activeIcon: "majesticons:note-text",
    desktop: false,
  },
];
