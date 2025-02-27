import { useState } from "react";

import useScrollCallback from "./use-scroll-callback";

/** A wrapper around useScrollCallback that either returns:
 * - `true` (the scroll value is on top)
 * - `false` (the scroll value has is not on top anymore)
 */
export default function useIsOnTop() {
  const [isOnTop, setIsOnTop] = useState<boolean>(false);

  useScrollCallback((_, scrollY) => {
    if (scrollY === 0) {
      setIsOnTop(true);
    }

    if (scrollY !== 0) {
      setIsOnTop(false);
    }
  });

  return isOnTop;
}
