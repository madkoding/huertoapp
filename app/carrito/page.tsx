"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import Link from "next/link";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function CarritoPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Semillas de Tomate", price: 2500, quantity: 2, image: "🍅" },
    { id: 5, name: "Compost Orgánico 5kg", price: 3500, quantity: 1, image: "♻️" },
    { id: 8, name: "Pala de Jardín", price: 8500, quantity: 1, image: "🔨" },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert("Redirigiendo a Webpay... (simulación)");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 font-serif text-4xl font-bold text-[rgb(var(--color-primary))]">
          Carro de Compras
        </h1>
        <p className="text-lg text-[rgb(var(--foreground))]/70">
          Revisa tu pedido antes de finalizar
        </p>
      </div>

      {/* Info Banner */}
      <Alert variant="success" className="mb-6">
        <div>
          <p className="font-medium">💚 Gracias por tu apoyo</p>
          <p className="mt-1 text-sm">
            Los fondos recaudados se destinan íntegramente al mantenimiento del huerto comunitario
          </p>
        </div>
      </Alert>

      {cartItems.length === 0 ? (
        /* Empty Cart */
        <Card className="py-16 text-center">
          <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-[rgb(var(--color-neutral))]" />
          <h2 className="mb-2 font-serif text-2xl font-bold text-[rgb(var(--foreground))]">
            Tu carro está vacío
          </h2>
          <p className="mb-6 text-[rgb(var(--foreground))]/70">
            Agrega productos desde la tienda
          </p>
          <Link href="/tienda">
            <Button>Ir a la Tienda</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="flex items-center gap-4 p-4">
                  {/* Image */}
                  <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--color-neutral))]">
                    <span className="text-3xl">{item.image}</span>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="font-medium text-[rgb(var(--foreground))]">
                      {item.name}
                    </h3>
                    <p className="text-lg font-bold text-[rgb(var(--color-primary))]">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgb(var(--color-neutral))] transition-colors hover:bg-[rgb(var(--color-primary))] hover:text-white"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgb(var(--color-neutral))] transition-colors hover:bg-[rgb(var(--color-primary))] hover:text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[rgb(var(--color-error))] transition-colors hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-[rgb(var(--foreground))]/70">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}

                <div className="border-t border-[rgb(var(--color-neutral))] pt-4">
                  <div className="flex justify-between">
                    <span className="font-serif text-lg font-bold">Total</span>
                    <span className="font-serif text-2xl font-bold text-[rgb(var(--color-primary))]">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  Pagar con Webpay
                </Button>

                <Link href="/tienda">
                  <Button variant="ghost" className="w-full">
                    Seguir Comprando
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
