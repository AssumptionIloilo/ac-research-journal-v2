import { useEffect, useState } from "react";

/**
 * ⚠️ Warning: This is not stable with SSR, use `useMediaQueryClient` instead.
 * Returns true or false if it matches the media query string you pass.
 * @param query the media query string you usually use in CSS,
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = (_query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== "undefined") {
      return window.matchMedia(_query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };
  }, [query]);

  return matches;
}

/**
 * Returns true or false if it matches the media query string you pass.
 * @param query the media query string you usually use in CSS,
 */
export const useMediaQueryClient = (query: Parameters<typeof useMediaQuery>[0]) => {
  const [isMatch, setIsMatch] = useState(false);

  const match = useMediaQuery(query);

  useEffect(() => {
    setIsMatch(match);
  }, [match]);

  return isMatch;
};
