"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Leaf, Shovel } from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: "semillas" | "insumos" | "herramientas";
  image: string;
};

const products: Product[] = [
  { id: 1, name: "Semillas de Tomate", description: "Variedad orgánica resistente", price: 2500, category: "semillas", image: "🍅" },
  { id: 2, name: "Semillas de Lechuga", description: "Lechuga criolla de hoja verde", price: 1500, category: "semillas", image: "🥬" },
  { id: 3, name: "Semillas de Zanahoria", description: "Zanahoria nantesa dulce", price: 2000, category: "semillas", image: "🥕" },
  { id: 4, name: "Semillas de Cilantro", description: "Hierbas aromáticas frescas", price: 1000, category: "semillas", image: "🌿" },
  { id: 5, name: "Compost Orgánico 5kg", description: "Abono natural compostado", price: 3500, category: "insumos", image: "♻️" },
  { id: 6, name: "Humus de Lombriz 3kg", description: "Fertilizante orgánico premium", price: 4000, category: "insumos", image: "🪱" },
  { id: 7, name: "Sustrato Universal", description: "Mezcla para todo tipo de plantas", price: 2500, category: "insumos", image: "🌱" },
  { id: 8, name: "Pala de Jardín", description: "Herramienta de acero inoxidable", price: 8500, category: "herramientas", image: "🔨" },
  { id: 9, name: "Regadera 5L", description: "Regadera con rociador ajustable", price: 6000, category: "herramientas", image: "💧" },
  { id: 10, name: "Guantes de Jardín", description: "Par de guantes resistentes", price: 3000, category: "herramientas", image: "🧤" },
];

export default function TiendaPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  const filteredProducts = selectedCategory === "todas" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const categories = [
    { value: "todas", label: "Todas", icon: Package },
    { value: "semillas", label: "Semillas", icon: Leaf },
    { value: "insumos", label: "Insumos", icon: Package },
    { value: "herramientas", label: "Herramientas", icon: Shovel },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 font-serif text-4xl font-bold text-[rgb(var(--color-primary))]">
          Tienda de Insumos
        </h1>
        <p className="text-lg text-[rgb(var(--foreground))]/70">
          Semillas, compost y herramientas para tu huerto
        </p>
        <Badge variant="warning" className="mt-3">
          💚 Donación voluntaria - Los fondos apoyan el huerto comunitario
        </Badge>
      </div>

      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all ${
                selectedCategory === cat.value
                  ? "bg-[rgb(var(--color-primary))] text-white"
                  : "bg-white text-[rgb(var(--foreground))] hover:bg-[rgb(var(--color-neutral))]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} hover>
            <CardHeader>
              <div className="mb-3 flex h-32 items-center justify-center rounded-lg bg-[rgb(var(--color-neutral))]">
                <span className="text-6xl">{product.image}</span>
              </div>
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-[rgb(var(--foreground))]/70">
                {product.description}
              </p>
              <p className="font-serif text-2xl font-bold text-[rgb(var(--color-primary))]">
                ${product.price.toLocaleString()}
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => addToCart(product.id)}
              >
                Agregar al carro
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-[rgb(var(--foreground))]/70">
            No hay productos en esta categoría
          </p>
        </div>
      )}
    </div>
  );
}
