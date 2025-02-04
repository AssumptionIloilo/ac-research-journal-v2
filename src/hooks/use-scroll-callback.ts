import { useEffect } from "react";

/** Hook for listening to current scroll value */
export default function useScrollCallback(onScroll: (scrollX: number, scrollY: number) => void) {
  useEffect(() => {
    // Initialize.
    onScroll(window.scrollX, window.scrollY);

    // Attach callback to listen for changes.
    const handleScroll = () => {
      onScroll(window.scrollX, window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onScroll]);
}
