import { useEffect, useState } from "react";

/**
 * @param delay 'mounted' value becomes true after `delay` milliseconds
 * @returns
 */
export default function useMounted(delay: number = 0) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, delay);
  }, []);

  return mounted;
}
