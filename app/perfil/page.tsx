"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, MapPin, Calendar, Download, Award } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const activityData = [
  { mes: "Ene", actividades: 12 },
  { mes: "Feb", actividades: 19 },
  { mes: "Mar", actividades: 15 },
  { mes: "Abr", actividades: 22 },
  { mes: "May", actividades: 28 },
  { mes: "Jun", actividades: 25 },
];

const historialParticipacion = [
  { fecha: "15 Jun 2024", actividad: "Cosecha de Tomates", parcela: "A1", estado: "completado" },
  { fecha: "10 Jun 2024", actividad: "Riego Comunitario", parcela: "General", estado: "completado" },
  { fecha: "05 Jun 2024", actividad: "Taller de Compostaje", parcela: "N/A", estado: "completado" },
  { fecha: "01 Jun 2024", actividad: "Siembra de Lechugas", parcela: "A2", estado: "completado" },
  { fecha: "28 May 2024", actividad: "Mantenimiento de Parcela", parcela: "A1", estado: "completado" },
];

export default function PerfilPage() {
  const handleDownloadCertificate = () => {
    alert("Descargando certificado PDF... (simulación)");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 font-serif text-4xl font-bold text-[rgb(var(--color-primary))]">
          Mi Perfil
        </h1>
        <p className="text-lg text-[rgb(var(--foreground))]/70">
          Información personal y actividades en el huerto
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Datos Personales */}
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="mb-4 flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[rgb(var(--color-primary))]">
                  <User className="h-12 w-12 text-white" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl">María González</CardTitle>
              <div className="flex justify-center gap-2">
                <Badge variant="success">
                  <Award className="mr-1 h-3 w-3" />
                  Hortelana Activa
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-[rgb(var(--foreground))]/70" />
                <span>maria.gonzalez@email.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-[rgb(var(--foreground))]/70" />
                <span>Santiago, Chile</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-[rgb(var(--foreground))]/70" />
                <span>Miembro desde Ene 2024</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-[rgb(var(--foreground))]/70">Parcelas Activas</span>
                <span className="font-bold">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[rgb(var(--foreground))]/70">Cosechas Totales</span>
                <span className="font-bold">15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[rgb(var(--foreground))]/70">Horas Voluntariado</span>
                <span className="font-bold">48h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[rgb(var(--foreground))]/70">Eventos Asistidos</span>
                <span className="font-bold">12</span>
              </div>
            </CardContent>
          </Card>

          <Button 
            className="w-full" 
            size="lg"
            onClick={handleDownloadCertificate}
          >
            <Download className="mr-2 h-4 w-4" />
            Descargar Certificado PDF
          </Button>
        </div>

        {/* Actividades y Gráficos */}
        <div className="space-y-6 lg:col-span-2">
          {/* Gráfico de Actividades */}
          <Card>
            <CardHeader>
              <CardTitle>Actividades Mensuales</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--color-neutral))" />
                  <XAxis 
                    dataKey="mes" 
                    tick={{ fill: "rgb(var(--foreground))" }}
                  />
                  <YAxis 
                    tick={{ fill: "rgb(var(--foreground))" }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid rgb(var(--color-neutral))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar 
                    dataKey="actividades" 
                    fill="rgb(var(--color-primary))"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Historial de Participación */}
          <Card>
            <CardHeader>
              <CardTitle>Historial de Participación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {historialParticipacion.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 border-l-4 border-[rgb(var(--color-primary))] bg-[rgb(var(--color-neutral-light))] p-4 rounded-r-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-[rgb(var(--foreground))]">
                        {item.actividad}
                      </h4>
                      <div className="mt-1 flex flex-wrap gap-2 text-sm text-[rgb(var(--foreground))]/70">
                        <span>{item.fecha}</span>
                        <span>•</span>
                        <span>Parcela: {item.parcela}</span>
                      </div>
                    </div>
                    <Badge variant="success" className="flex-shrink-0">
                      {item.estado}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mis Parcelas */}
          <Card>
            <CardHeader>
              <CardTitle>Mis Parcelas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border-2 border-[rgb(var(--color-primary))] p-4">
                  <h4 className="mb-2 font-medium">Parcela A1</h4>
                  <p className="mb-3 text-sm text-[rgb(var(--foreground))]/70">
                    Tomates Cherry
                  </p>
                  <div className="flex justify-between text-sm">
                    <span>Días de crecimiento:</span>
                    <span className="font-bold">45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Salud:</span>
                    <span className="font-bold text-[rgb(var(--color-success))]">90%</span>
                  </div>
                </div>
                <div className="rounded-lg border-2 border-[rgb(var(--color-primary))] p-4">
                  <h4 className="mb-2 font-medium">Parcela A2</h4>
                  <p className="mb-3 text-sm text-[rgb(var(--foreground))]/70">
                    Lechugas Orgánicas
                  </p>
                  <div className="flex justify-between text-sm">
                    <span>Días de crecimiento:</span>
                    <span className="font-bold">30</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Salud:</span>
                    <span className="font-bold text-[rgb(var(--color-success))]">85%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
