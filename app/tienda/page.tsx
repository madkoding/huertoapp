"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Tooltip } from "@/components/ui/tooltip";
import { Package, Leaf, Shovel, Info } from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: "semillas" | "insumos" | "herramientas";
  image: string;
  tooltip: string;
};

const products: Product[] = [
  { id: 1, name: "Semillas de Tomate", description: "Variedad orgánica resistente", price: 2500, category: "semillas", image: "🍅", tooltip: "Ideal para principiantes. Germinación en 7-14 días." },
  { id: 2, name: "Semillas de Lechuga", description: "Lechuga criolla de hoja verde", price: 1500, category: "semillas", image: "🥬", tooltip: "Cosecha rápida en 30-45 días. Perfecta para ensaladas." },
  { id: 3, name: "Semillas de Zanahoria", description: "Zanahoria nantesa dulce", price: 2000, category: "semillas", image: "🥕", tooltip: "Requiere suelo suelto. Cosecha en 70-80 días." },
  { id: 4, name: "Semillas de Cilantro", description: "Hierbas aromáticas frescas", price: 1000, category: "semillas", image: "🌿", tooltip: "Siembra directa. Cosecha continua por 2-3 meses." },
  { id: 5, name: "Compost Orgánico 5kg", description: "Abono natural compostado", price: 3500, category: "insumos", image: "♻️", tooltip: "Mejora la estructura del suelo y aporta nutrientes." },
  { id: 6, name: "Humus de Lombriz 3kg", description: "Fertilizante orgánico premium", price: 4000, category: "insumos", image: "🪱", tooltip: "El mejor abono orgánico. Rico en microorganismos." },
  { id: 7, name: "Sustrato Universal", description: "Mezcla para todo tipo de plantas", price: 2500, category: "insumos", image: "🌱", tooltip: "Listo para usar. Ideal para macetas y almácigos." },
  { id: 8, name: "Pala de Jardín", description: "Herramienta de acero inoxidable", price: 8500, category: "herramientas", image: "🔨", tooltip: "Mango ergonómico. Durabilidad garantizada." },
  { id: 9, name: "Regadera 5L", description: "Regadera con rociador ajustable", price: 6000, category: "herramientas", image: "💧", tooltip: "Rociador de 2 posiciones: lluvia fina y chorro directo." },
  { id: 10, name: "Guantes de Jardín", description: "Par de guantes resistentes", price: 3000, category: "herramientas", image: "🧤", tooltip: "Protección contra espinas y suciedad. Talla única." },
];

export default function TiendaPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  const filteredProducts = selectedCategory === "todas" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (productId: number) => {
    // En una implementación real, aquí se agregaría al estado global del carrito
    setAddedToCart(productId);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const categories = [
    { value: "todas", label: "Todas", icon: Package, tooltip: "Ver todos los productos disponibles" },
    { value: "semillas", label: "Semillas", icon: Leaf, tooltip: "Semillas orgánicas certificadas" },
    { value: "insumos", label: "Insumos", icon: Package, tooltip: "Compost, humus y sustratos" },
    { value: "herramientas", label: "Herramientas", icon: Shovel, tooltip: "Herramientas de jardinería" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 font-serif text-4xl font-bold text-[rgb(var(--color-primary))]">
          Tienda de Insumos
        </h1>
        <p className="text-lg text-[rgb(var(--foreground))]/80">
          Semillas, compost y herramientas para tu huerto
        </p>
        <Alert variant="success" className="mt-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">💚</span>
            <div>
              <p className="font-medium">Donación voluntaria</p>
              <p className="text-sm">Los fondos recaudados apoyan el mantenimiento del huerto comunitario</p>
            </div>
          </div>
        </Alert>
      </div>

      {/* Category Filters */}
      <nav className="mb-8" aria-label="Filtros de categoría">
        <p className="text-sm font-medium mb-3 text-[rgb(var(--foreground))]/70">Filtrar por categoría:</p>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Tooltip key={cat.value} content={cat.tooltip}>
                <button
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`flex items-center gap-2 rounded-lg px-5 py-3 font-medium transition-all min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary))] ${
                    selectedCategory === cat.value
                      ? "bg-[rgb(var(--color-primary))] text-white"
                      : "bg-white text-[rgb(var(--foreground))] hover:bg-[rgb(var(--color-neutral))]"
                  }`}
                  aria-pressed={selectedCategory === cat.value}
                  aria-label={`Filtrar por ${cat.label}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {cat.label}
                </button>
              </Tooltip>
            );
          })}
        </div>
      </nav>

      {/* Products Grid */}
      <section aria-label="Lista de productos">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} hover>
              <CardHeader>
                <div className="mb-3 flex h-32 items-center justify-center rounded-lg bg-[rgb(var(--color-neutral))]">
                  <span className="text-6xl" aria-hidden="true">{product.image}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Tooltip content={product.tooltip}>
                    <Info className="h-5 w-5 text-[rgb(var(--foreground))]/50 flex-shrink-0" aria-hidden="true" />
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-base text-[rgb(var(--foreground))]/80">
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
                  aria-label={`Agregar ${product.name} al carro`}
                >
                  {addedToCart === product.id ? "✓ Agregado" : "Agregar al carro"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-[rgb(var(--foreground))]/80">
            No hay productos en esta categoría
          </p>
        </div>
      )}
    </div>
  );
}
