/**
 * 🎨 PALETA DE COLORES - Sin Neón
 * Berrio E-Commerce - Tema Oscuro Profesional
 *
 * Esta paleta NO contiene colores neón.
 * Todos los colores son sobrios, elegantes y profesionales.
 */

export const colorPalette = {
  // ⚫ DARK - Escala de grises oscuros
  dark: {
    50: '#f8fafc', // Texto principal (claro)
    100: '#f1f5f9', // Texto secundario
    200: '#e2e8f0', // Texto terciario
    300: '#cbd5e1', // Texto muted
    400: '#94a3b8', // Iconos inactivos
    500: '#64748b', // Borders subtle
    600: '#475569', // Borders
    700: '#334155', // Cards elevated
    800: '#1e293b', // Cards/Borders
    900: '#0f172a', // Background secondary
    950: '#020617', // Background principal
  },

  // 🔵 ACCENT - Cyan profesional (NO neón)
  accent: {
    50: '#f0f9ff', // Backgrounds muy claros
    100: '#e0f2fe', // Backgrounds claros
    200: '#bae6fd', // Borders hover
    300: '#7dd3fc', // Backgrounds suaves
    400: '#38bdf8', // 🎯 Hover states, links activos
    500: '#0ea5e9', // Estados intermedios
    600: '#0284c7', // 🎯 CTAs primarios, botones principales
    700: '#0369a1', // Pressed states
    800: '#075985', // Dark variants
    900: '#0c4a6e', // Darkest variants
  },

  // 🟣 PURPLE - Morado elegante (NO neón)
  purple: {
    50: '#faf5ff', // Backgrounds muy claros
    100: '#f3e8ff', // Backgrounds claros
    200: '#e9d5ff', // Borders hover
    300: '#d8b4fe', // Backgrounds suaves
    400: '#c084fc', // Estados intermedios
    500: '#a855f7', // 🎯 Acentos secundarios
    600: '#9333ea', // Variantes
    700: '#7e22ce', // 🎯 Gradientes, detalles
    800: '#6b21a8', // Dark variants
    900: '#581c87', // Darkest variants
  },

  // ✅ Colores de estado (NO neón)
  support: {
    emerald: {
      400: '#34d399', // Success light
      500: '#10b981', // 🎯 Success principal
      600: '#059669', // Success dark
    },
    amber: {
      400: '#fbbf24', // Warning light
      500: '#f59e0b', // 🎯 Warning principal
      600: '#d97706', // Warning dark
    },
    red: {
      400: '#f87171', // Error light
      500: '#ef4444', // 🎯 Error principal
      600: '#dc2626', // Error dark
    },
  },
};

/**
 * 🎯 Uso de colores en componentes:
 *
 * FONDOS:
 * - bg-dark-950: Fondo principal de páginas
 * - bg-dark-900: Fondo secundario, secciones
 * - bg-dark-900/50: Cards con transparencia
 * - bg-dark-800: Cards elevadas, hover states
 *
 * TEXTO:
 * - text-dark-50: Títulos principales
 * - text-dark-100: Títulos secundarios
 * - text-dark-300: Texto normal
 * - text-dark-400: Texto secundario
 * - text-dark-500: Texto terciario/meta
 *
 * BORDES:
 * - border-dark-800: Bordes principales
 * - border-dark-700: Bordes elevados
 * - border-dark-600: Bordes sutiles
 *
 * ACENTOS:
 * - text-accent-400: Links, hover states
 * - bg-accent-600: Botones primarios
 * - from-accent-600 to-purple-600: Gradientes CTAs
 *
 * ESTADOS:
 * - hover:bg-dark-800: Hover en elementos
 * - hover:text-accent-400: Hover en links
 * - hover:border-accent-500: Hover en cards
 *
 * EFECTOS:
 * - backdrop-blur-sm: Cristal esmerilado
 * - shadow-accent-500/10: Sombras sutiles
 * - bg-dark-900/50: Fondos con transparencia
 */

/**
 * ❌ COLORES ELIMINADOS (neón):
 *
 * - tech.cyan: #06b6d4 (demasiado brillante)
 * - tech.purple: #8b5cf6 (neón)
 * - tech.pink: #ec4899 (neón)
 * - tech.orange: #f97316 (neón)
 * - mesh-gradient: degradado multicolor saturado
 * - glow effects: sombras luminosas
 */

export default colorPalette;
