import { type RefObject, useEffect, useState } from "react";

/** Add a ref to this hook and get its current client height and width size back. */
export default function useSizeChange(ref: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState<{ width: number; height: number }>();

  useEffect(() => {
    if (!ref?.current) return;

    const resizeObserver = new ResizeObserver(() => {
      // Gets executed whenever element changes.

      if (!ref?.current) return;
      setSize({
        height: ref.current?.clientHeight,
        width: ref.current?.clientWidth,
      });
    });
    resizeObserver.observe(ref.current);

    // Cleanup
    return () => resizeObserver.disconnect();
  }, [ref]);

  return size;
}
