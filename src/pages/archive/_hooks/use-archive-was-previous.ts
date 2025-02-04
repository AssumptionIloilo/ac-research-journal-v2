import { useEffect, useState } from "react";

/** Key to be stored in local storage. */
const ARCHIVE_WAS_PREVIOUS_KEY = "x1ulqE";

/**
 * Quick Fix on the Archive Router Replace. Don't mind. (I think it's tech debt but ok lang)
 * This is for more "expected" behavior when navigating on Archive and Individual Archive Pages.
 */
export default function useArchiveWasPrevious() {
  const [archiveWasPrevious, setArchiveWasPrevious] = useState<boolean>(false);
  useEffect(() => {
    const value = sessionStorage.getItem(ARCHIVE_WAS_PREVIOUS_KEY);

    setArchiveWasPrevious(value ? true : false);
  }, []);

  return {
    /** True if /archive page was the previous url in the history. Use this on archive/[slug].tsx*/
    archiveWasPrevious,
    /** Use this on the button on `/archive` that goes to the archive/[slug].tsx */
    saveArchiveWasPrevious: () => sessionStorage.setItem(ARCHIVE_WAS_PREVIOUS_KEY, "true"),
    /** Removes from storage. */
    removeArchiveWasPrevious: () => sessionStorage.removeItem(ARCHIVE_WAS_PREVIOUS_KEY),
  };
}
