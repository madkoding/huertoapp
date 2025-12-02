import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { 
  FileText, 
  Database, 
  Shield, 
  CheckCircle2, 
  Eye,
  Keyboard,
  MousePointer,
  Smartphone,
  Server,
  Lock,
  Activity
} from "lucide-react";

export default function DocumentacionPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 font-serif text-4xl font-bold text-[rgb(var(--color-primary))]">
          Documentación Técnica del Sistema
        </h1>
        <p className="text-lg text-[rgb(var(--foreground))]/70">
          Explicación detallada de métodos de entrada, procesamiento de datos y controles del sistema
        </p>
      </div>

      {/* Norma ISO */}
      <Alert variant="info" className="mb-8">
        <div>
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Aplicación de Norma ISO 25010:2011
          </h3>
          <p className="mb-2">
            Este sistema ha sido desarrollado siguiendo los estándares de <strong>ISO 25010 - Calidad del Producto de Software</strong>, 
            específicamente las características de:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>Funcionalidad</strong>: Corrección funcional y adecuación</li>
            <li><strong>Usabilidad</strong>: Reconocibilidad, capacidad de aprendizaje y accesibilidad</li>
            <li><strong>Fiabilidad</strong>: Tolerancia a fallos y recuperación</li>
            <li><strong>Seguridad</strong>: Confidencialidad e integridad de datos</li>
          </ul>
        </div>
      </Alert>

      {/* Métodos de Entrada de Datos */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Keyboard className="h-6 w-6" />
            Métodos de Entrada de Datos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <MousePointer className="h-5 w-5 text-[rgb(var(--color-primary))]" />
              1. Entrada Manual por Formularios
            </h3>
            <div className="ml-7 space-y-2">
              <p className="text-sm text-[rgb(var(--foreground))]/80">
                <strong>Implementación:</strong> Formularios HTML5 con validación en tiempo real
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-[rgb(var(--color-neutral-light))] p-3">
                  <p className="font-medium text-sm mb-1">Campos de Texto</p>
                  <p className="text-xs text-[rgb(var(--foreground))]/70">
                    Input type="text" con sanitización automática
                  </p>
                </div>
                <div className="rounded-lg bg-[rgb(var(--color-neutral-light))] p-3">
                  <p className="font-medium text-sm mb-1">Campos de Email</p>
                  <p className="text-xs text-[rgb(var(--foreground))]/70">
                    Input type="email" con validación RFC 5322
                  </p>
                </div>
                <div className="rounded-lg bg-[rgb(var(--color-neutral-light))] p-3">
                  <p className="font-medium text-sm mb-1">Campos de Teléfono</p>
                  <p className="text-xs text-[rgb(var(--foreground))]/70">
                    Input type="tel" con formato chileno
                  </p>
                </div>
                <div className="rounded-lg bg-[rgb(var(--color-neutral-light))] p-3">
                  <p className="font-medium text-sm mb-1">Selección (Dropdowns)</p>
                  <p className="text-xs text-[rgb(var(--foreground))]/70">
                    Select con opciones predefinidas
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-[rgb(var(--color-primary))]" />
              2. Entrada Táctil (Mobile-First)
            </h3>
            <div className="ml-7">
              <p className="text-sm text-[rgb(var(--foreground))]/80">
                <strong>Implementación:</strong> Diseño responsive con controles optimizados para dispositivos táctiles
              </p>
              <ul className="mt-2 text-sm space-y-1 list-disc list-inside">
                <li>Botones con área táctil mínima de 44×44px (WCAG 2.1)</li>
                <li>Gestos táctiles estándar (tap, scroll, swipe)</li>
                <li>Teclados virtuales específicos por tipo de campo</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-[rgb(var(--color-primary))]" />
              3. Carga de Archivos (Futuro)
            </h3>
            <div className="ml-7">
              <p className="text-sm text-[rgb(var(--foreground))]/80">
                <strong>Planificado:</strong> Upload de documentos PDF para formularios físicos
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Procesamiento de Datos */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-6 w-6" />
            Procesamiento de Datos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border-2 border-[rgb(var(--color-primary))] p-4">
            <h4 className="font-bold mb-3">Flujo de Procesamiento</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge variant="default" className="flex-shrink-0">1</Badge>
                <div>
                  <p className="font-medium">Captura de Datos</p>
                  <p className="text-sm text-[rgb(var(--foreground))]/70">
                    Formulario → Estado local (useState) → Sanitización
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="default" className="flex-shrink-0">2</Badge>
                <div>
                  <p className="font-medium">Validación</p>
                  <p className="text-sm text-[rgb(var(--foreground))]/70">
                    FormValidator → Reglas de negocio → Feedback visual
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="default" className="flex-shrink-0">3</Badge>
                <div>
                  <p className="font-medium">Procesamiento</p>
                  <p className="text-sm text-[rgb(var(--foreground))]/70">
                    Processor → Lógica de negocio → Cálculos y asignaciones
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="default" className="flex-shrink-0">4</Badge>
                <div>
                  <p className="font-medium">Almacenamiento</p>
                  <p className="text-sm text-[rgb(var(--foreground))]/70">
                    Generación de ID único → Log de auditoría → Resultado
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-[rgb(var(--color-neutral-light))] p-4">
              <h5 className="font-medium mb-2">Algoritmo de Priorización</h5>
              <p className="text-sm text-[rgb(var(--foreground))]/70 mb-2">
                Cálculo de puntuación 0-100 basado en:
              </p>
              <ul className="text-sm space-y-1">
                <li>• Experiencia previa (0-30 pts)</li>
                <li>• Horas disponibles (0-30 pts)</li>
                <li>• Calidad de motivación (0-40 pts)</li>
              </ul>
            </div>
            <div className="rounded-lg bg-[rgb(var(--color-neutral-light))] p-4">
              <h5 className="font-medium mb-2">Asignación Inteligente</h5>
              <p className="text-sm text-[rgb(var(--foreground))]/70 mb-2">
                Parcela sugerida según:
              </p>
              <ul className="text-sm space-y-1">
                <li>• Nivel de experiencia</li>
                <li>• Tipo de cultivo deseado</li>
                <li>• Disponibilidad actual</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controles del Sistema */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Controles Internos del Sistema
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <Lock className="h-5 w-5 text-[rgb(var(--color-success))]" />
              Controles de Seguridad
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-[rgb(var(--color-success))] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Sanitización de Entrada</p>
                  <p className="text-xs text-[rgb(var(--foreground))]/70">
                    Prevención de XSS e inyección de código
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-[rgb(var(--color-success))] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Validación Estricta</p>
                  <p className="text-xs text-[rgb(var(--foreground))]/70">
                    TypeScript + validadores personalizados
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-[rgb(var(--color-success))] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Límites de Longitud</p>
                  <p className="text-xs text-[rgb(var(--foreground))]/70">
                    Máximo 500 caracteres por campo
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-[rgb(var(--color-success))] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Rate Limiting</p>
                  <p className="text-xs text-[rgb(var(--foreground))]/70">
                    Control de frecuencia de envíos
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <Activity className="h-5 w-5 text-[rgb(var(--color-warning))]" />
              Controles de Auditoría
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-[rgb(var(--color-success))] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Sistema de Logging</p>
                  <p className="text-xs text-[rgb(var(--foreground))]/70">
                    Registro de todas las operaciones con timestamp
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-[rgb(var(--color-success))] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Trazabilidad Completa</p>
                  <p className="text-xs text-[rgb(var(--foreground))]/70">
                    Cada solicitud tiene ID único rastreable
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-[rgb(var(--color-success))] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Métricas de Rendimiento</p>
                  <p className="text-xs text-[rgb(var(--foreground))]/70">
                    Tiempo de procesamiento registrado
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controles GUI */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-6 w-6" />
            Controles de Interfaz (GUI)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h5 className="font-medium mb-2">Accesibilidad (WCAG 2.1)</h5>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[rgb(var(--color-success))] flex-shrink-0 mt-0.5" />
                  <span>Labels asociados a inputs (htmlFor)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[rgb(var(--color-success))] flex-shrink-0 mt-0.5" />
                  <span>Atributos ARIA (aria-invalid, aria-describedby)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[rgb(var(--color-success))] flex-shrink-0 mt-0.5" />
                  <span>Roles semánticos (role="alert")</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[rgb(var(--color-success))] flex-shrink-0 mt-0.5" />
                  <span>Navegación por teclado (Tab, Enter, Esc)</span>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">Feedback Visual</h5>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[rgb(var(--color-success))] flex-shrink-0 mt-0.5" />
                  <span>Validación en tiempo real</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[rgb(var(--color-success))] flex-shrink-0 mt-0.5" />
                  <span>Mensajes de error contextuales</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[rgb(var(--color-success))] flex-shrink-0 mt-0.5" />
                  <span>Indicadores de procesamiento (spinners)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[rgb(var(--color-success))] flex-shrink-0 mt-0.5" />
                  <span>Estados visuales de botones (disabled, loading)</span>
                </li>
              </ul>
            </div>
          </div>

          <Alert variant="success">
            <p className="text-sm">
              <strong>Cumplimiento de Estándares:</strong> El sistema cumple con WCAG 2.1 Nivel AA 
              para accesibilidad y sigue las mejores prácticas de UX/UI modernas.
            </p>
          </Alert>
        </CardContent>
      </Card>

      {/* Temas de Usuario */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Temas de Usuario del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border-2 border-[rgb(var(--color-primary))] p-4">
              <h5 className="font-medium mb-2">Solicitante de Parcela</h5>
              <p className="text-sm text-[rgb(var(--foreground))]/70">
                Usuario que desea obtener una parcela en el huerto comunitario
              </p>
              <p className="text-xs mt-2">
                <strong>Acciones:</strong> Llenar formulario, recibir asignación
              </p>
            </div>
            <div className="rounded-lg border-2 border-[rgb(var(--color-primary))] p-4">
              <h5 className="font-medium mb-2">Hortelano Activo</h5>
              <p className="text-sm text-[rgb(var(--foreground))]/70">
                Usuario con parcela asignada que gestiona sus cultivos
              </p>
              <p className="text-xs mt-2">
                <strong>Acciones:</strong> Ver perfil, comprar insumos, registrar actividades
              </p>
            </div>
            <div className="rounded-lg border-2 border-[rgb(var(--color-primary))] p-4">
              <h5 className="font-medium mb-2">Gestor del Huerto</h5>
              <p className="text-sm text-[rgb(var(--foreground))]/70">
                Administrador que supervisa todas las parcelas
              </p>
              <p className="text-xs mt-2">
                <strong>Acciones:</strong> Dashboard, estadísticas, asignaciones
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Arquitectura Técnica */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-6 w-6" />
            Arquitectura Técnica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="rounded-lg bg-[rgb(var(--color-neutral-light))] p-3">
              <p className="font-medium mb-1">Frontend</p>
              <p className="text-sm text-[rgb(var(--foreground))]/70">
                Next.js 15 + TypeScript + Tailwind CSS
              </p>
            </div>
            <div className="rounded-lg bg-[rgb(var(--color-neutral-light))] p-3">
              <p className="font-medium mb-1">Validación</p>
              <p className="text-sm text-[rgb(var(--foreground))]/70">
                Sistema personalizado con reglas de negocio (lib/validation.ts)
              </p>
            </div>
            <div className="rounded-lg bg-[rgb(var(--color-neutral-light))] p-3">
              <p className="font-medium mb-1">Procesamiento</p>
              <p className="text-sm text-[rgb(var(--foreground))]/70">
                Procesadores especializados con lógica de negocio (lib/processing.ts)
              </p>
            </div>
            <div className="rounded-lg bg-[rgb(var(--color-neutral-light))] p-3">
              <p className="font-medium mb-1">Estado</p>
              <p className="text-sm text-[rgb(var(--foreground))]/70">
                React Hooks (useState, useEffect) + TypeScript interfaces
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
