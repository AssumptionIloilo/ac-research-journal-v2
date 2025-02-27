import { useEffect } from "react";

/** Apply a param color to the body. */
export default function useBackgroundColor(options: {
  /** Color to add on the background */
  color: string;
  /** Enable transitions @default `false` */
  enableTransition?: boolean;
}) {
  const { color } = options;

  useEffect(() => {
    const initialBackground = document.body.style.backgroundColor;
    const initialClassName = document.body.className;

    // Set transition
    document.body.classList.add("transition");

    // Set background color to parameter.
    document.body.style.backgroundColor = color;

    // Reset back to before this hook was called.
    return () => {
      document.body.style.backgroundColor = initialBackground;
      document.body.className = initialClassName;
    };
  }, [color]);
}
