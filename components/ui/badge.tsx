import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "neutral";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-[rgb(var(--color-primary))] text-white",
      success: "bg-[rgb(var(--color-success))] text-white",
      warning: "bg-[rgb(var(--color-warning))] text-white",
      error: "bg-[rgb(var(--color-error))] text-white",
      neutral: "bg-[rgb(var(--color-neutral))] text-[rgb(var(--foreground))]",
    };
    
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
