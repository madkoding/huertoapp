import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";

export const metadata: Metadata = {
  title: "HuertoApp - Gestión de Huertos Urbanos Comunitarios",
  description: "Plataforma para la gestión de huertos urbanos comunitarios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <Navbar />
        <main id="main-content" className="min-h-screen" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
