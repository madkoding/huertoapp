"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect, HTMLAttributes, forwardRef } from "react";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ className, isOpen, onClose, title, children, ...props }, ref) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
      
      return () => {
        document.body.style.overflow = "unset";
      };
    }, [isOpen]);
    
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div
          ref={ref}
          className={cn(
            "relative z-10 w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl",
            "max-h-[90vh] overflow-y-auto",
            className
          )}
          {...props}
        >
          {/* Header */}
          {title && (
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-[rgb(var(--color-primary))]">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1 transition-colors hover:bg-[rgb(var(--color-neutral))]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
          
          {/* Content */}
          {children}
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";

export { Modal };
