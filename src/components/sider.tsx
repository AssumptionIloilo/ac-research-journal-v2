import { FC, PropsWithChildren, useRef } from "react";

import { useMediaQueryClient } from "@/hooks/use-media-query";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { cn } from "@/utils/cn";

type SiderProps = {
  /**
   * This will only work on mobile.
   * true to collapse, false to not.
   */
  collapsed: boolean;
  /**
   * Put the sizing classes here. Or breakpoint sizes.
   * When collapsed, the width will always be 0.
   *
   * By default, classes like 'w-56 overflow-hidden transition' are applied.
   * You can override them here optionally no problem.
   */
  containerClassName?: string;

  /** The inner div that contains the content. */
  className?: string;

  /**
   * Mobile-mode will be activated and will do the following:
   * - Enable Collapsible/Expand Buttons.
   * - Make this sider absolute and stick to the side.
   *
   * @defaultValue '(max-width: 800px)'
   */
  isMobileMediaQuery?: string;

  /**
   * When the sider is clicked outisde of it. This will be called.
   * Put your onClose function here.
   */
  onClose?: () => void;
} & PropsWithChildren;

/**
 * A container component that behaves differently based on screens.
 * - Desktop: Just sticks to the side, takes up space.
 * - Mobile: Collapsible, absolute to the side, does not take up space. It
 * exposes a button for collapse/expand. The collapsed value will be
 * self-contained in this component. It cannot be controlled from the outside.
 *
 */
const Sider: FC<SiderProps> = (props) => {
  const isMobile = useMediaQueryClient("(max-width: 800px)");

  const ref = useRef<HTMLElement>(null);

  useOnClickOutside(ref, () => {
    props?.onClose?.();
  });

  return (
    <aside
      ref={ref}
      className={cn(
        "w-56 overflow-hidden transition-all",
        isMobile && "fixed z-[999999] left-0 top-0 bottom-0 overflow-y-auto",
        props.containerClassName
      )}
      style={{
        /**
         * On mobile, only collapse when collapsed is true.
         * On desktop, never collapse.
         */
        width: isMobile ? (props.collapsed ? 0 : undefined) : undefined,
      }}
    >
      <div className={cn(props.className)}>{props.children}</div>
    </aside>
  );
};

export default Sider;
