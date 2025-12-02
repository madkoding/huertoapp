# HuertoApp - Instrucciones de Contexto para GitHub Copilot

## Descripción del Proyecto
HuertoApp es una aplicación web de gestión de huertos urbanos comunitarios desarrollada con Next.js 15, TypeScript, Tailwind CSS y diseño responsivo. La aplicación facilita la gestión de parcelas, venta de insumos mediante donaciones voluntarias, y el seguimiento de actividades comunitarias.

## Stack Tecnológico
- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS con configuración personalizada
- **Componentes**: React con componentes funcionales y hooks
- **Iconos**: Lucide React
- **Gráficos**: Recharts
- **Utilidades**: clsx, tailwind-merge

## Paleta de Colores Ambientales

### Colores Primarios
- **Verde Orgánico**: `#4A7C59` (rgb(74, 124, 89)) - Primary
- **Verde Orgánico Claro**: `#6B9F7B` (rgb(107, 159, 123)) - Primary Light

### Colores Secundarios
- **Tierra/Marrón**: `#8B6F47` (rgb(139, 111, 71)) - Secondary
- **Tierra/Marrón Claro**: `#A0826D` (rgb(160, 130, 109)) - Secondary Light

### Acento
- **Amarillo Maíz**: `#F4C430` (rgb(244, 196, 48)) - Accent

### Neutros
- **Beige Claro**: `#F5F1E8` (rgb(245, 241, 232)) - Neutral Light (Background)
- **Gris Piedra**: `#E8E4D9` (rgb(232, 228, 217)) - Neutral

### Estados
- **Verde Éxito**: `#52B788` (rgb(82, 183, 136)) - Success
- **Naranja Alerta**: `#FF9F1C` (rgb(255, 159, 28)) - Warning
- **Rojo Error**: `#D62828` (rgb(214, 40, 40)) - Error

### Uso en CSS/Tailwind
Los colores están definidos en `app/globals.css` usando variables CSS con formato RGB separado:
```css
--color-primary: 74 124 89;
```

Para usarlos en Tailwind:
```tsx
className="bg-[rgb(var(--color-primary))]"
className="text-[rgb(var(--color-success))]"
```

## Tipografía
- **UI/Cuerpo**: Inter (400, 500, 600, 700) - `font-sans`
- **Títulos**: Merriweather (700, 900) - `font-serif`
- Importadas desde Google Fonts en `globals.css`

## Principios de Diseño

### Bordes y Espaciado
- Bordes redondeados suaves: `rounded-lg` (8px), `rounded-xl` (12px)
- Espaciado generoso y diseño aireado
- Sombras sutiles para profundidad: `shadow-md`, `shadow-lg`

### Animaciones
- Transiciones suaves: `transition-all duration-200`
- Hover con elevación: `hover:-translate-y-1`
- Escala en botones activos: `active:scale-95`

### Responsividad
- Mobile-first approach
- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Grid adaptativo con `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

## Estructura de Carpetas

```
app/
├── layout.tsx              # Layout principal con Navbar
├── page.tsx                # Página de inicio
├── tienda/
│   └── page.tsx           # Catálogo de insumos
├── carrito/
│   └── page.tsx           # Carro de compras
├── dashboard/
│   └── page.tsx           # Panel de gestión de parcelas
├── perfil/
│   └── page.tsx           # Perfil de usuario
├── solicitar-parcela/
│   └── page.tsx           # Formulario multi-step
└── globals.css             # Estilos globales y variables CSS

components/
├── ui/
│   ├── button.tsx         # Componente Button con variantes
│   ├── card.tsx           # Componente Card y subcomponentes
│   ├── badge.tsx          # Badges de estado
│   ├── alert.tsx          # Alertas con variantes
│   ├── modal.tsx          # Modal con backdrop
│   └── navbar.tsx         # Navegación principal

lib/
└── utils.ts               # Utilidad cn() para merge de clases
```

## Componentes UI Base

### Button
```tsx
<Button variant="primary" size="md">Texto</Button>
```
- Variantes: `primary`, `secondary`, `outline`, `ghost`
- Tamaños: `sm`, `md`, `lg`

### Card
```tsx
<Card hover>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>Contenido</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```
- Prop `hover` para efectos de elevación

### Badge
```tsx
<Badge variant="success">Activo</Badge>
```
- Variantes: `default`, `success`, `warning`, `error`, `neutral`

### Alert
```tsx
<Alert variant="info">Mensaje</Alert>
```
- Variantes: `info`, `success`, `warning`, `error`
- Incluye icono automático

### Modal
```tsx
<Modal isOpen={true} onClose={() => {}} title="Título">
  Contenido
</Modal>
```
- Backdrop con blur
- Cierre con botón X o click fuera

### Navbar
- Logo con icono Leaf
- Links de navegación
- Iconos de carrito y perfil
- Menú móvil responsivo

## Pantallas Implementadas

### 1. Página de Inicio (/)
- Hero con logo grande y llamados a la acción
- Grid de features con iconos
- Links a secciones principales

### 2. Tienda de Insumos (/tienda)
- Grid de productos con imágenes emoji
- Filtros por categoría (semillas/insumos/herramientas)
- Cards con imagen, nombre, descripción, precio
- Badge de "Donación voluntaria"
- Botón "Agregar al carro"

### 3. Carro de Compras (/carrito)
- Lista de items con miniatura
- Controles de cantidad (+/-)
- Botón eliminar
- Resumen con total
- Banner informativo sobre destino de fondos
- Botón destacado "Pagar con Webpay" (simulación)
- Estado vacío con mensaje

### 4. Panel de Control (/dashboard)
- Sidebar con navegación (desktop)
- Estadísticas en cards
- Alertas con códigos de color
- Grid/tabla de parcelas con toggle de vista
- Badges de estado (activo/cosechado/fallido)
- Botones de acción: "Registrar riego", "Notificar cosecha"

### 5. Perfil de Usuario (/perfil)
- Datos personales con iconos
- Estadísticas de participación
- Gráfico de actividades mensuales (Recharts)
- Historial de participación
- Cards de parcelas activas
- Botón "Descargar Certificado PDF"

### 6. Formulario de Solicitud (/solicitar-parcela)
- Form multi-step con 3 pasos
- Indicador de progreso visual
- Validación por paso
- Paso 1: Datos personales
- Paso 2: Experiencia previa
- Paso 3: Motivación y compromisos
- Modal de éxito
- Opción de descarga PDF para llenado manual

## Iconos Principales (Lucide React)

```tsx
import { 
  Leaf,        // Logo, plantas
  Shovel,      // Herramientas
  Droplets,    // Riego
  Package,     // Insumos
  Users,       // Comunidad
  ShoppingCart,// Carrito
  User,        // Perfil
  AlertTriangle,// Alertas
  CheckCircle, // Éxito
  XCircle,     // Error
  TrendingUp,  // Estadísticas
  Download,    // Descarga
} from "lucide-react";
```

## Patrones de Código

### Componentes de Página
- Siempre usar `"use client"` para interactividad
- Estados con useState
- Tipado TypeScript estricto
- Estructura: Header → Content → Actions

### Estilos
- Usar `cn()` para combinar clases
- Preferir variables CSS para colores
- Responsive con mobile-first
- Espaciado consistente (múltiplos de 4)

### Navegación
- Usar `Link` de Next.js
- No `<a>` directamente
- Rutas absolutas desde raíz

## Datos de Ejemplo

### Productos
- Semillas (tomate, lechuga, zanahoria, cilantro)
- Insumos (compost, humus, sustrato)
- Herramientas (pala, regadera, guantes)
- Precios simbólicos entre $1.000 y $8.500

### Estados de Parcelas
- **Activo**: Verde, CheckCircle
- **Cosechado**: Default, Leaf
- **Fallido**: Rojo, XCircle

### Datos de Usuario Ejemplo
- Nombre: María González
- Email: maria.gonzalez@email.com
- Ubicación: Santiago, Chile
- Miembro desde: Ene 2024

## Mejores Prácticas

1. **Accesibilidad**
   - Labels en todos los inputs
   - Alt text en imágenes (aunque usamos emojis)
   - Contraste de colores adecuado

2. **Performance**
   - Componentes client solo cuando necesario
   - Imágenes optimizadas (actualmente emojis)
   - Lazy loading implícito de Next.js

3. **Mantenibilidad**
   - Componentes pequeños y reutilizables
   - Tipos TypeScript bien definidos
   - Nombres descriptivos

4. **UX**
   - Feedback visual en acciones
   - Estados de carga simulados (alert)
   - Mensajes claros y amigables

## Extensiones Futuras Sugeridas

- [ ] Integración real con backend (API routes)
- [ ] Autenticación de usuarios
- [ ] Pasarela de pago Webpay real
- [ ] Generación real de PDFs
- [ ] Sistema de notificaciones
- [ ] Chat comunitario
- [ ] Calendario de eventos
- [ ] Galería de fotos del huerto
- [ ] Sistema de puntos/gamificación
- [ ] Modo oscuro (actualmente solo claro)

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Producción
npm run start

# Linting
npm run lint
```

## Notas Importantes

- **Modo claro únicamente**: Tema natural, no hay dark mode
- **Simulaciones**: Pagos, PDFs y notificaciones son simulados con `alert()`
- **Estados globales**: No se usa context/store, todo es local por simplicidad
- **Backend**: No implementado, datos son estáticos en cada página
- **Imágenes**: Emojis como placeholder, fácil reemplazar con imágenes reales

---

**Última actualización**: 2 de diciembre de 2025
**Versión**: 1.0.0
**Autor**: HuertoApp Team
