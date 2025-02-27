import { debounce } from "@/utils/debounce";
import { useEffect, useMemo, useState } from "react";
import isClient from "./use-is-client";

/**
 *
 * @param debouncedDelay
 * When set to a number other than `-1`, it will debounce the changes
 * to returned `windowWidth` by those milliseconds. Default: `-1`
 *
 * Tip: debouncing means it won't change too quickly. It will wait until you
 * actually finished changing, then it will start changing.
 *
 * Window resize will get called a lot in fact.
 *
 * @returns windowWidth `number`
 */
export function useWindowWidth(debouncedDelay = -1) {
  const [windowWidth, setWindowWidth] = useState(isClient() ? window?.innerWidth : 0);

  /**
   * I know it's weird that it doesn't use `useCallback` but we're returning a
   * a function, not a callback. Debounce returns a function.
   *
   * It essentially would still work the same as `useCallback`.
   */
  const handleResize = useMemo(() => {
    // return with debounce.
    if (debouncedDelay > 0) {
      return debounce(() => {
        setWindowWidth(window.innerWidth);
      }, debouncedDelay);
    }

    // return the regular function (without debounce)
    return () => setWindowWidth(window.innerWidth);
  }, [debouncedDelay]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [debouncedDelay, handleResize]);

  return windowWidth;
}
