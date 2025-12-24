"use client";

import { cn } from "@/lib/utils";
import { Leaf, ShoppingCart, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Tooltip } from "@/components/ui/tooltip";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { href: "/tienda", label: "Tienda", tooltip: "Compra semillas, insumos y herramientas" },
    { href: "/dashboard", label: "Parcelas", tooltip: "Gestiona y monitorea tus parcelas" },
    { href: "/solicitar-parcela", label: "Solicitar Parcela", tooltip: "Solicita tu parcela en el huerto" },
    { href: "/documentacion", label: "Documentación", tooltip: "Información técnica del sistema" },
  ];
  
  return (
    <nav 
      className="sticky top-0 z-40 w-full border-b border-[rgb(var(--color-neutral))] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary))] focus-visible:ring-offset-2 rounded-lg"
            aria-label="HuertoApp - Ir a página de inicio"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgb(var(--color-primary))]">
              <Leaf className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <span className="font-serif text-xl font-bold text-[rgb(var(--color-primary))]">
              HuertoApp
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex" role="menubar">
            {navLinks.map((link) => (
              <Tooltip key={link.href} content={link.tooltip}>
                <Link
                  href={link.href}
                  className="text-base font-medium text-[rgb(var(--foreground))] transition-colors hover:text-[rgb(var(--color-primary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary))] focus-visible:ring-offset-2 rounded px-2 py-1"
                  role="menuitem"
                >
                  {link.label}
                </Link>
              </Tooltip>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            <Tooltip content="Ver carro de compras">
              <Link
                href="/carrito"
                className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-[rgb(var(--color-neutral))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary))]"
                aria-label="Carro de compras"
              >
                <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Tooltip>
            <Tooltip content="Ver mi perfil">
              <Link
                href="/perfil"
                className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-[rgb(var(--color-neutral))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary))]"
                aria-label="Mi perfil"
              >
                <User className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Tooltip>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-[rgb(var(--color-neutral))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary))]"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="border-t border-[rgb(var(--color-neutral))] py-4 md:hidden"
            role="menu"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-base font-medium text-[rgb(var(--foreground))] transition-colors hover:text-[rgb(var(--color-primary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary))] rounded px-2"
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
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
