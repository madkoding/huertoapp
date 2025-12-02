import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Users, ShoppingBag, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: ShoppingBag,
      title: "Tienda de Insumos",
      description: "Accede a semillas, compost y herramientas con donaciones voluntarias",
      href: "/tienda",
    },
    {
      icon: Leaf,
      title: "Gestión de Parcelas",
      description: "Administra tus cultivos y monitorea el progreso de tu huerto",
      href: "/dashboard",
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Conecta con otros hortelanos y comparte conocimientos",
      href: "/perfil",
    },
    {
      icon: TrendingUp,
      title: "Solicita tu Parcela",
      description: "Únete a la red de huertos urbanos comunitarios",
      href: "/solicitar-parcela",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[rgb(var(--color-primary))]">
            <Leaf className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="mb-4 font-serif text-5xl font-bold text-[rgb(var(--color-primary))]">
          HuertoApp
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-[rgb(var(--foreground))]/80">
          Cultiva comunidad, cosecha salud. Plataforma para la gestión de huertos urbanos comunitarios.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/tienda">
            <Button size="lg">Explorar Tienda</Button>
          </Link>
          <Link href="/solicitar-parcela">
            <Button size="lg" variant="outline">Solicitar Parcela</Button>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link key={feature.title} href={feature.href}>
              <Card hover className="h-full">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[rgb(var(--color-primary))]/10">
                    <Icon className="h-6 w-6 text-[rgb(var(--color-primary))]" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[rgb(var(--foreground))]/70">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
