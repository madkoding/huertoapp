import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", children, ...props }, ref) => {
    const variants = {
      info: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-800",
        icon: Info,
      },
      success: {
        bg: "bg-green-50",
        border: "border-[rgb(var(--color-success))]",
        text: "text-green-800",
        icon: CheckCircle,
      },
      warning: {
        bg: "bg-orange-50",
        border: "border-[rgb(var(--color-warning))]",
        text: "text-orange-800",
        icon: AlertCircle,
      },
      error: {
        bg: "bg-red-50",
        border: "border-[rgb(var(--color-error))]",
        text: "text-red-800",
        icon: XCircle,
      },
    };
    
    const { bg, border, text, icon: Icon } = variants[variant];
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start gap-3 rounded-lg border-l-4 p-4",
          bg,
          border,
          className
        )}
        {...props}
      >
        <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", text)} />
        <div className={cn("flex-1", text)}>{children}</div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

export { Alert };
