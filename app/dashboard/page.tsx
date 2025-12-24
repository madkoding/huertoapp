"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { 
  Leaf, 
  Droplets, 
  Sun, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  LayoutGrid,
  List,
} from "lucide-react";

type Parcela = {
  id: number;
  nombre: string;
  cultivo: string;
  usuario: string;
  estado: "activo" | "cosechado" | "fallido";
  diasCrecimiento: number;
  ultimoRiego: string;
  salud: number;
};

const parcelas: Parcela[] = [
  { id: 1, nombre: "Parcela A1", cultivo: "Tomates", usuario: "María González", estado: "activo", diasCrecimiento: 45, ultimoRiego: "Hace 1 día", salud: 90 },
  { id: 2, nombre: "Parcela A2", cultivo: "Lechugas", usuario: "Juan Pérez", estado: "activo", diasCrecimiento: 30, ultimoRiego: "Hace 2 días", salud: 75 },
  { id: 3, nombre: "Parcela B1", cultivo: "Zanahorias", usuario: "Ana Martínez", estado: "cosechado", diasCrecimiento: 90, ultimoRiego: "Hace 5 días", salud: 100 },
  { id: 4, nombre: "Parcela B2", cultivo: "Cilantro", usuario: "Pedro López", estado: "activo", diasCrecimiento: 20, ultimoRiego: "Hoy", salud: 85 },
  { id: 5, nombre: "Parcela C1", cultivo: "Pimientos", usuario: "Laura Torres", estado: "fallido", diasCrecimiento: 60, ultimoRiego: "Hace 7 días", salud: 20 },
  { id: 6, nombre: "Parcela C2", cultivo: "Espinacas", usuario: "Carlos Ruiz", estado: "activo", diasCrecimiento: 25, ultimoRiego: "Hace 1 día", salud: 95 },
];

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const alertas = [
    { id: 1, tipo: "warning", mensaje: "Parcela A2 necesita riego urgente" },
    { id: 2, tipo: "error", mensaje: "Parcela C1 presenta signos de plaga" },
    { id: 3, tipo: "success", mensaje: "Parcela B1 lista para cosecha" },
  ];

  const stats = [
    { label: "Parcelas Activas", value: parcelas.filter(p => p.estado === "activo").length, icon: Leaf, color: "text-[rgb(var(--color-success))]" },
    { label: "Total Parcelas", value: parcelas.length, icon: LayoutGrid, color: "text-[rgb(var(--color-primary))]" },
    { label: "Cosechas del Mes", value: 3, icon: TrendingUp, color: "text-[rgb(var(--color-accent))]" },
    { label: "Alertas Pendientes", value: alertas.length, icon: AlertTriangle, color: "text-[rgb(var(--color-warning))]" },
  ];

  const getEstadoBadge = (estado: Parcela["estado"]) => {
    const variants = {
      activo: { variant: "success" as const, icon: CheckCircle, label: "Activo" },
      cosechado: { variant: "default" as const, icon: Leaf, label: "Cosechado" },
      fallido: { variant: "error" as const, icon: XCircle, label: "Fallido" },
    };
    const { variant, icon: Icon, label } = variants[estado];
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };

  return (
    <div className="flex min-h-screen bg-[rgb(var(--color-neutral-light))]">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r border-[rgb(var(--color-neutral))] bg-white p-6 lg:block" aria-label="Panel de navegación">
        <h2 className="mb-6 font-serif text-xl font-bold text-[rgb(var(--color-primary))]">
          Panel de Gestor
        </h2>
        <nav className="space-y-2" aria-label="Menú del panel">
          <button className="flex w-full items-center gap-3 rounded-lg bg-[rgb(var(--color-primary))] px-4 py-3 text-white font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgb(var(--color-primary))]">
            <LayoutGrid className="h-5 w-5" aria-hidden="true" />
            Parcelas
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-[rgb(var(--foreground))] transition-colors hover:bg-[rgb(var(--color-neutral))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary))]">
            <Droplets className="h-5 w-5" aria-hidden="true" />
            Registro de Riego
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-[rgb(var(--foreground))] transition-colors hover:bg-[rgb(var(--color-neutral))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary))]">
            <Sun className="h-5 w-5" aria-hidden="true" />
            Condiciones
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-[rgb(var(--foreground))] transition-colors hover:bg-[rgb(var(--color-neutral))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary))]">
            <TrendingUp className="h-5 w-5" aria-hidden="true" />
            Reportes
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2 font-serif text-4xl font-bold text-[rgb(var(--color-primary))]">
            Gestión de Parcelas
          </h1>
          <p className="text-lg text-[rgb(var(--foreground))]/70">
            Monitorea y administra todas las parcelas del huerto
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className={`${stat.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-sm text-[rgb(var(--foreground))]/70">
                      {stat.label}
                    </p>
                    <p className="font-serif text-2xl font-bold">
                      {stat.value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Alertas */}
        <div className="mb-6 space-y-3">
          {alertas.map((alerta) => (
            <Alert 
              key={alerta.id} 
              variant={alerta.tipo as "warning" | "error" | "success"}
            >
              {alerta.mensaje}
            </Alert>
          ))}
        </div>

        {/* Actions */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            <Button>
              <Droplets className="mr-2 h-4 w-4" />
              Registrar Riego
            </Button>
            <Button variant="secondary">
              <Leaf className="mr-2 h-4 w-4" />
              Notificar Cosecha
            </Button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                viewMode === "grid" 
                  ? "bg-[rgb(var(--color-primary))] text-white" 
                  : "bg-white text-[rgb(var(--foreground))] hover:bg-[rgb(var(--color-neutral))]"
              }`}
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                viewMode === "list" 
                  ? "bg-[rgb(var(--color-primary))] text-white" 
                  : "bg-white text-[rgb(var(--foreground))] hover:bg-[rgb(var(--color-neutral))]"
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Parcelas */}
        {viewMode === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {parcelas.map((parcela) => (
              <Card key={parcela.id} hover>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{parcela.nombre}</CardTitle>
                    {getEstadoBadge(parcela.estado)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-[rgb(var(--foreground))]/70">Cultivo</p>
                    <p className="font-medium">{parcela.cultivo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[rgb(var(--foreground))]/70">Usuario</p>
                    <p className="font-medium">{parcela.usuario}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-[rgb(var(--foreground))]/70">Días</p>
                      <p className="font-medium">{parcela.diasCrecimiento}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[rgb(var(--foreground))]/70">Salud</p>
                      <p className="font-medium">{parcela.salud}%</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[rgb(var(--foreground))]/70">
                      <Droplets className="mr-1 inline h-3 w-3" />
                      {parcela.ultimoRiego}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-[rgb(var(--color-neutral))]">
                  <tr className="text-left">
                    <th className="p-4 font-medium">Parcela</th>
                    <th className="p-4 font-medium">Cultivo</th>
                    <th className="p-4 font-medium">Usuario</th>
                    <th className="p-4 font-medium">Estado</th>
                    <th className="p-4 font-medium">Días</th>
                    <th className="p-4 font-medium">Salud</th>
                    <th className="p-4 font-medium">Último Riego</th>
                  </tr>
                </thead>
                <tbody>
                  {parcelas.map((parcela) => (
                    <tr key={parcela.id} className="border-b border-[rgb(var(--color-neutral))] hover:bg-[rgb(var(--color-neutral-light))]">
                      <td className="p-4 font-medium">{parcela.nombre}</td>
                      <td className="p-4">{parcela.cultivo}</td>
                      <td className="p-4">{parcela.usuario}</td>
                      <td className="p-4">{getEstadoBadge(parcela.estado)}</td>
                      <td className="p-4">{parcela.diasCrecimiento}</td>
                      <td className="p-4">{parcela.salud}%</td>
                      <td className="p-4 text-sm text-[rgb(var(--foreground))]/70">
                        {parcela.ultimoRiego}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
