"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef, useState } from "react";

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, content, position = "top", delay = 200, children, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const positions = {
      top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
      bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
      left: "right-full top-1/2 -translate-y-1/2 mr-2",
      right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    const arrowPositions = {
      top: "top-full left-1/2 -translate-x-1/2 border-t-[rgb(var(--foreground))] border-l-transparent border-r-transparent border-b-transparent",
      bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-[rgb(var(--foreground))] border-l-transparent border-r-transparent border-t-transparent",
      left: "left-full top-1/2 -translate-y-1/2 border-l-[rgb(var(--foreground))] border-t-transparent border-b-transparent border-r-transparent",
      right: "right-full top-1/2 -translate-y-1/2 border-r-[rgb(var(--foreground))] border-t-transparent border-b-transparent border-l-transparent",
    };

    const showTooltip = () => {
      const id = setTimeout(() => setIsVisible(true), delay);
      setTimeoutId(id);
    };

    const hideTooltip = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      setIsVisible(false);
    };

    return (
      /* eslint-disable jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-noninteractive-element-interactions */
      <span
        ref={ref}
        className={cn("relative inline-flex cursor-help", className)}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        tabIndex={0}
        role="note"
        aria-describedby={isVisible ? "tooltip-content" : undefined}
        {...props}
      >
        {children}
        {isVisible && (
          <div
            className={cn(
              "absolute z-50 px-3 py-2 text-sm text-white bg-foreground rounded-lg shadow-lg whitespace-nowrap",
              "animate-in fade-in-0 zoom-in-95 duration-200",
              positions[position]
            )}
            role="tooltip"
            aria-live="polite"
          >
            {content}
            <div
              className={cn(
                "absolute w-0 h-0 border-4",
                arrowPositions[position]
              )}
            />
          </div>
        )}
      </span>
    );
  }
);

Tooltip.displayName = "Tooltip";

export { Tooltip };
