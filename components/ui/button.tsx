import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgb(var(--color-primary))]";
    
    const variants = {
      primary: "bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-primary-light))] active:scale-95",
      secondary: "bg-[rgb(var(--color-secondary))] text-white hover:bg-[rgb(var(--color-secondary-light))] active:scale-95",
      outline: "border-2 border-[rgb(var(--color-primary))] text-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary))] hover:text-white",
      ghost: "text-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-neutral))]",
    };
    
    const sizes = {
      sm: "px-4 py-2.5 text-sm min-h-[44px]",
      md: "px-5 py-3 text-base min-h-[48px]",
      lg: "px-8 py-4 text-lg min-h-[56px]",
    };
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
