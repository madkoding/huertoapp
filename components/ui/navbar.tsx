"use client";

import { cn } from "@/lib/utils";
import { Leaf, ShoppingCart, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { href: "/tienda", label: "Tienda" },
    { href: "/dashboard", label: "Parcelas" },
    { href: "/solicitar-parcela", label: "Solicitar Parcela" },
    { href: "/documentacion", label: "Documentación" },
  ];
  
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[rgb(var(--color-neutral))] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgb(var(--color-primary))]">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="font-serif text-xl font-bold text-[rgb(var(--color-primary))]">
              HuertoApp
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[rgb(var(--foreground))] transition-colors hover:text-[rgb(var(--color-primary))]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/carrito"
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-[rgb(var(--color-neutral))]"
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>
            <Link
              href="/perfil"
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-[rgb(var(--color-neutral))]"
            >
              <User className="h-5 w-5" />
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-[rgb(var(--color-neutral))]"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-[rgb(var(--color-neutral))] py-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm font-medium text-[rgb(var(--foreground))] transition-colors hover:text-[rgb(var(--color-primary))]"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
