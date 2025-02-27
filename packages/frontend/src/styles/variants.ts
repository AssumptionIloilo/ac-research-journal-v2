// import { cva } from 'styled-system/css'

import { tv } from "tailwind-variants";

/** Tailwind Variants for Default Button. */
export const button = tv({
  variants: {
    size: {
      lg: "px-4 py-2",
    },
    color: {
      primary: "bg-primary-500 text-white",
      secondary: "bg-secondary-500 text-secondary-800",
    },
    type: {
      rounded: "rounded-full",
      box: "rounded-none",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "lg",
    type: "rounded",
  },
});

/** Variants for input field. */
export const input = tv({
  base: "outline-none placeholder:dark-300",
});

export const container = tv({
  base: "mx-auto w-full px-9",
  variants: {
    size: {
      base: "max-w-5xl",
    },
    direction: {
      /** refers to flex direction */
      none: "",
      vertical: "flex flex-col",
      horizontal: "flex",
    },
  },
  defaultVariants: {
    size: "base",
    direction: "vertical",
  },
});
