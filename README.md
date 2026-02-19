# HuertoApp 🌱

Plataforma web de gestión de huertos urbanos comunitarios desarrollada con Next.js 15, TypeScript y Tailwind CSS.

**Cumple con ISO 25010:2011** - Calidad del Producto de Software

## Características

- 🛒 **Tienda de Insumos**: Catálogo de semillas, compost y herramientas con sistema de donación voluntaria
- 📊 **Panel de Control**: Gestión de parcelas con estadísticas, alertas y seguimiento en tiempo real
- 👤 **Perfil de Usuario**: Historial de participación con gráficos de actividad (Recharts)
- 📝 **Solicitud de Parcela**: Formulario multi-step con validación en tiempo real y procesamiento automatizado
- 🛍️ **Carrito de Compras**: Sistema completo con control de cantidades y checkout simulado
- 📚 **Documentación Técnica**: Explicación detallada de métodos de entrada y controles del sistema

## Características del Prototipo (Requisitos Cumplidos)

### ✅ Entrada de la Computadora
- **Formularios HTML5** con validación en tiempo real
- **Sanitización automática** de datos (prevención XSS/injection)
- **Validación progresiva** campo por campo
- **Feedback visual** inmediato con mensajes de error contextuales

### ✅ Captura y Procesamiento de Datos
- **Sistema de validación robusto** (`lib/validation.ts`)
  - Email según RFC 5322
  - Teléfonos formato chileno
  - Validación de longitud y formato
  
- **Procesamiento automatizado** (`lib/processing.ts`)
  - Algoritmo de priorización (0-100 puntos)
  - Asignación inteligente de parcelas
  - Cálculo de tiempos de espera
  - Generación de IDs únicos rastreables

### ✅ Métodos de Entrada Implementados
1. **Entrada Manual**: Formularios con inputs text, email, tel, select, textarea
2. **Entrada Táctil**: Diseño responsive mobile-first
3. **Validación en Tiempo Real**: Feedback inmediato al usuario
4. **Carga de Archivos**: Planificado (descarga PDF manual)

### ✅ Controles del Sistema

#### Controles Internos
- **Sistema de Logging** (SystemLogger): Auditoría completa con timestamps
- **Manejo de errores**: Try-catch con recuperación elegante
- **Trazabilidad**: IDs únicos por transacción
- **Métricas de rendimiento**: Tiempo de procesamiento registrado

#### Controles GUI
- **Accesibilidad WCAG 2.1 Nivel AA**:
  - Labels asociados (`htmlFor`)
  - Atributos ARIA (`aria-invalid`, `aria-describedby`, `role="alert"`)
  - Navegación por teclado (Tab, Enter, Esc)
  - Contraste de colores adecuado (4.5:1)

- **Feedback Visual**:
  - Indicadores de carga (spinners)
  - Estados de botones (disabled, loading)
  - Mensajes de error con iconos
  - Colores semánticos (verde/rojo/amarillo)

### ✅ Norma ISO 25010:2011 Aplicada

**Documento completo**: [`docs/ISO-25010-Implementacion.md`](./docs/ISO-25010-Implementacion.md)

Características implementadas:
- ✅ **Adecuación Funcional**: Validación + Procesamiento correcto
- ✅ **Eficiencia de Desempeño**: Medición de tiempos de procesamiento
- ✅ **Usabilidad**: Accesibilidad WCAG AA + UX optimizada
- ✅ **Fiabilidad**: Manejo de errores + Logging
- ✅ **Seguridad**: Sanitización + Validación estricta
- ✅ **Mantenibilidad**: Código modular + TypeScript
- ✅ **Portabilidad**: Responsive + Cross-browser

**Puntuación de Calidad**: 88/100 (Muy Satisfactorio)

## Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS con paleta de colores personalizada
- **Componentes**: React funcionales con hooks
- **Iconos**: Lucide React
- **Gráficos**: Recharts
- **Utilidades**: clsx, tailwind-merge

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd huertoapp

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
app/
├── layout.tsx              # Layout principal con Navbar
├── page.tsx                # Página de inicio
├── tienda/                 # Catálogo de insumos
├── carrito/                # Carro de compras
├── dashboard/              # Panel de gestión
├── perfil/                 # Perfil de usuario
├── solicitar-parcela/      # Formulario de solicitud
└── globals.css             # Estilos globales

components/ui/              # Componentes reutilizables
├── button.tsx
├── card.tsx
├── badge.tsx
├── alert.tsx
├── modal.tsx
└── navbar.tsx

lib/
└── utils.ts                # Utilidades (cn helper)
```

## Paleta de Colores

La aplicación usa una paleta de colores orgánicos y naturales:

- **Verde Orgánico**: #4A7C59 (primario)
- **Tierra/Marrón**: #8B6F47 (secundario)
- **Amarillo Maíz**: #F4C430 (acento)
- **Beige Claro**: #F5F1E8 (fondo)
- **Verde Éxito**: #52B788
- **Naranja Alerta**: #FF9F1C
- **Rojo Error**: #D62828

## Componentes UI

### Button
```tsx
<Button variant="primary" size="md">Texto</Button>
```
Variantes: `primary`, `secondary`, `outline`, `ghost`

### Card
```tsx
<Card hover>
  <CardHeader><CardTitle>Título</CardTitle></CardHeader>
  <CardContent>Contenido</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Badge
```tsx
<Badge variant="success">Activo</Badge>
```
Variantes: `default`, `success`, `warning`, `error`, `neutral`

### Alert
```tsx
<Alert variant="info">Mensaje</Alert>
```

### Modal
```tsx
<Modal isOpen={true} onClose={() => {}} title="Título">
  Contenido
</Modal>
```

## Pantallas

1. **Inicio** (`/`) - Hero y grid de features
2. **Tienda** (`/tienda`) - Catálogo con filtros por categoría
3. **Carrito** (`/carrito`) - Gestión de compras con resumen
4. **Dashboard** (`/dashboard`) - Panel de control con sidebar
5. **Perfil** (`/perfil`) - Datos y estadísticas del usuario
6. **Solicitar Parcela** (`/solicitar-parcela`) - Formulario en 3 pasos

## Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar en producción
npm start

# Linting
npm run lint
```

## Características Técnicas

- ✅ Diseño responsive (mobile-first)
- ✅ Componentes reutilizables con TypeScript
- ✅ Sistema de colores mediante variables CSS
- ✅ Animaciones y transiciones suaves
- ✅ Validación de formularios
- ✅ Modo claro únicamente (tema natural)

## Notas de Desarrollo

- Las funcionalidades de pago (Webpay) y generación de PDFs están simuladas con `alert()`
- No hay backend implementado, todos los datos son estáticos
- Las imágenes de productos usan emojis como placeholder
- No se implementa gestión de estado global (todo es local por simplicidad)

## Futuras Mejoras

- [ ] Integración con backend/API
- [ ] Autenticación de usuarios
- [ ] Pasarela de pago real
- [ ] Generación de PDFs reales
- [ ] Sistema de notificaciones
- [ ] Chat comunitario
- [ ] Calendario de eventos
- [ ] Galería de fotos
- [ ] Sistema de gamificación

## Licencia

Este proyecto fue creado para fines educativos y demostrativos.

---

**Versión**: 1.0.0  
**Fecha**: 2 de diciembre de 2025  
**Stack**: Next.js 15 + TypeScript + Tailwind CSS

<!-- AUTO-UPDATE-DATE -->
**Última actualización:** 2026-02-19 04:23:35 -03
