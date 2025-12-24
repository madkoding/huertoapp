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
      tooltip: "Explora nuestra tienda de insumos para tu huerto"
    },
    {
      icon: Leaf,
      title: "Gestión de Parcelas",
      description: "Administra tus cultivos y monitorea el progreso de tu huerto",
      href: "/dashboard",
      tooltip: "Panel de control para gestores de parcelas"
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Conecta con otros hortelanos y comparte conocimientos",
      href: "/perfil",
      tooltip: "Perfil de usuario y estadísticas de participación"
    },
    {
      icon: TrendingUp,
      title: "Solicita tu Parcela",
      description: "Únete a la red de huertos urbanos comunitarios",
      href: "/solicitar-parcela",
      tooltip: "Formulario para solicitar una parcela en el huerto"
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mb-16 text-center" aria-labelledby="hero-title">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[rgb(var(--color-primary))]" aria-hidden="true">
            <Leaf className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 id="hero-title" className="mb-4 font-serif text-5xl font-bold text-[rgb(var(--color-primary))]">
          HuertoApp
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-[rgb(var(--foreground))]/80">
          Cultiva comunidad, cosecha salud. Plataforma para la gestión de huertos urbanos comunitarios.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/tienda">
            <Button size="lg">Explorar Tienda</Button>
          </Link>
          <Link href="/solicitar-parcela">
            <Button size="lg" variant="outline">Solicitar Parcela</Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section aria-labelledby="features-title">
        <h2 id="features-title" className="sr-only">Funcionalidades principales</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.title} href={feature.href} aria-label={feature.tooltip}>
                <Card hover className="h-full">
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[rgb(var(--color-primary))]/10" aria-hidden="true">
                      <Icon className="h-6 w-6 text-[rgb(var(--color-primary))]" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-[rgb(var(--foreground))]/80">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
