# Gorgona Marketing — Contexto del Proyecto

> Documento de contexto para que cualquier IA pueda retomar el trabajo sin fricción.
> Última actualización: 2026-04-14

---

## 1. Qué es el proyecto

Landing page de una sola página (SPA) para **Gorgona Marketing**, una agencia de marketing digital colombiana. El sitio vive en:

```
https://gorgonamarketing.com
```

El repo está en:
```
/Users/sebastian/Documents/kodevon/Proyectos/kodevon-landingpage-GorgonaMarketing
```

Desarrollado por **Kodevon** para el cliente Gorgona Marketing.

---

## 2. Stack técnico

| Pieza | Decisión |
|---|---|
| Framework | React 19 (Vite 8) |
| Estilos | CSS Modules por componente (`.css` colocado junto al `.jsx`) — sin Tailwind, sin Sass |
| Iconos | Font Awesome 6.5 (CDN, cargado en `index.html`) |
| Tipografía | Syne (display/headings) + Inter (body) — Google Fonts vía `<link rel="preload">` |
| Animaciones | CSS `@keyframes` + `IntersectionObserver` custom (sin librerías externas) |
| Build | `npm run build` → `dist/` |
| Dev server | `npm run dev -- --port 5174` → `http://localhost:5174` |

**No hay**: router, estado global, fetch de datos reales, backend, base de datos ni autenticación. Todo el contenido es estático/hardcodeado en los componentes.

---

## 3. Tema visual

| Token | Valor |
|---|---|
| Color de fondo | `#ffffff` (blanco puro) |
| Fondo alternado de sección | `#f5fdf9` |
| Fondo sección suave | `#edfaf3` |
| Acento primario (mint) | `#2ec990` |
| Mint oscuro (hover) | `#1fa870` |
| Mint más oscuro | `#157a52` |
| Mint claro (bg chips) | `#d4f5e8` |
| Texto principal | `#0a1f14` |
| Texto secundario | `#2d5242` |
| Texto muted | `#5a7a6a` |
| Gradiente mint | `linear-gradient(135deg, #2ec990, #1bc99e, #0dc4c4)` |

Todos los tokens están en `src/index.css` bajo `:root { ... }`.

**Regla de oro:** El tema es **verde menta + blanco**, no oscuro. Nunca usar fondos negros ni grises oscuros salvo en los iconos de plataformas externas (TikTok, etc.).

---

## 4. Estructura de archivos

```
src/
├── main.jsx                  # Punto de entrada React
├── App.jsx                   # Orden de las secciones
├── index.css                 # Tokens CSS globales, reset, utilidades, botones
│
├── hooks/
│   ├── useReveal.js          # IntersectionObserver → clase .visible para animaciones scroll
│   └── useCounter.js         # Anima un número de 0 a target al entrar al viewport
│
└── components/
    ├── Navbar.jsx / .css     # Navbar fija, scroll transparente→blur, menú hamburguesa
    ├── Hero.jsx / .css       # Hero principal (ver sección 5)
    ├── Brands.jsx / .css     # Marquee infinito de plataformas
    ├── Stats.jsx / .css      # 4 métricas con contador animado
    ├── About.jsx / .css      # Nosotros — imagen + lista de ventajas
    ├── Services.jsx / .css   # 6 tarjetas de servicios
    ├── Process.jsx / .css    # 4 pasos del proceso de trabajo
    ├── Projects.jsx / .css   # Portafolio filtrable por categoría
    ├── Testimonials.jsx/.css # Grid en desktop, carrusel en mobile
    ├── CTABanner.jsx / .css  # Banner llamada a la acción
    ├── Contact.jsx / .css    # Formulario + datos de contacto
    └── Footer.jsx / .css     # Footer con newsletter, sitemap, redes
```

### Orden en App.jsx

```
Navbar
└── main#main-content
    ├── Hero
    ├── Brands
    ├── Stats
    ├── About
    ├── Services
    ├── Process
    ├── Projects
    ├── Testimonials
    ├── CTABanner
    └── Contact
Footer
```

---

## 5. Hero — descripción detallada

El Hero es la sección más compleja. Se divide en dos columnas:

### Columna izquierda (copy)
- Badge animado "Agencia de Marketing Digital" con dot pulsante
- Award badge "Top Agency CO 2024"
- `<h1>` con **cycling animation**: una palabra rota cada 2.6s (`resultados → conversiones → comunidades → crecimiento`) usando `key` prop + `@keyframes cycleIn`
- Subtítulo
- 2 CTAs: "Empezar ahora" (primario) + "Ver proyectos" (ghost)
- Social proof: 5 avatares apilados + estrellas + "+87K clientes"
- Partners strip: "Partners oficiales: Google · Meta · TikTok"

### Columna derecha (visual)
- **Dashboard card** (`<DashboardVisual />`) — simula un panel de campaña real:
  - Header con dots macOS + "En vivo" badge verde pulsante
  - SVG sparkline con área de relleno degradada (tendencia ascendente)
  - 3 KPI pills: CTR 8.3%, ROAS 4.2x, Conv. +150%
  - Barra de progreso animada: "Meta mensual 78%"
  - Iconos de plataformas activas: Instagram, TikTok, Google, Meta, LinkedIn

### Tarjetas flotantes (IMPORTANTE — ver bug fix)
Hay 3 tarjetas flotantes (`.hero__notif`):
1. "+12K seguidores · Esta semana en Instagram" (ícono Instagram)
2. "Nueva conversión · Google Ads — hace 2 min" (ícono bullseye)
3. "$2.3M gestionados · Inversión publicitaria total" (ícono dollar)

**Bug corregido:** Las tarjetas estaban dentro del grid (`hero__visual`), lo que causaba reflow de texto. **Solución:** son hijos directos de `<section class="hero">` (fuera del grid), con `position: absolute` relativo a la sección, `pointer-events: none`, `will-change: transform`, y animación de solo **5px** de rango vertical. No usar valores negativos de `left`/`right` en estas tarjetas.

---

## 6. Hooks personalizados

### `useReveal()`
Llama a `document.querySelectorAll('.reveal, .reveal-left, .reveal-right')` y les agrega la clase `.visible` cuando entran al viewport. Se llama una vez en el componente padre. Las clases CSS están en `index.css`.

### `useCounter(target, duration)`
Retorna `{ value, ref }`. Adjunta al `ref` un `IntersectionObserver` que al detectar visibilidad anima el número de 0 a `target` con easing cúbico. Respeta `prefers-reduced-motion`.

---

## 7. Sistema de animaciones

Todo en `index.css`:

```css
.reveal        { opacity:0; transform: translateY(28px); }
.reveal-left   { opacity:0; transform: translateX(-28px); }
.reveal-right  { opacity:0; transform: translateX(28px); }
.reveal.visible, .reveal-left.visible, .reveal-right.visible {
  opacity:1; transform: none;
}
.delay-1 { transition-delay: 0.1s; }
.delay-2 { transition-delay: 0.2s; }
.delay-3 { transition-delay: 0.3s; }
```

**Regla crítica:** Siempre respetar `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal-left, .reveal-right {
    opacity: 1; transform: none; transition: none;
  }
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

## 8. Convenciones de código

### CSS
- **Nunca** usar `transition: all` — siempre listar propiedades explícitas
- **Nunca** usar `outline: none` sin reemplazar con `:focus-visible`
- Usar `:focus-visible` (no `:focus`) en inputs y controles
- Usar `touch-action: manipulation` en botones interactivos
- `scroll-margin-top: 80px` en todas las secciones con `id` (ya en `index.css`)
- Gradient border en hover: técnica `background-clip: padding-box, border-box`

### Accesibilidad (ya implementado, no romper)
- Todos los botones de solo ícono tienen `aria-label`
- Íconos decorativos tienen `aria-hidden="true"`
- Formulario con `htmlFor`, `autocomplete`, `inputMode`, `spellCheck={false}` en email
- `aria-live="polite"` en: éxito del formulario, grid de proyectos al filtrar, carrusel de testimonios
- `aria-invalid` + `aria-describedby` en campos con error
- Skip link en `index.html` (`<a href="#main-content" class="skip-link">`)
- `<select>` con `background-color` y `color` explícitos (para Windows dark mode)

### Imágenes
- Siempre con `width` y `height` explícitos (previene CLS)
- Imágenes debajo del fold: `loading="lazy"`
- Imágenes críticas (above-fold): sin `loading="lazy"`

### Fechas/números
- Usar `Intl.DateTimeFormat` y `Intl.NumberFormat` — no hardcodear formatos

---

## 9. Datos del cliente (actuales en el código)

Estos son **placeholders** que el cliente debe reemplazar:

| Campo | Placeholder actual |
|---|---|
| Teléfono | `+57 300 000 0000` |
| Email | `hola@gorgonamarketing.com` |
| Ubicación | `Colombia` |
| Redes sociales | `href="#"` (todos vacíos) |
| Imágenes de proyectos | Unsplash URLs |
| Avatares de testimonios | `pravatar.cc` URLs |
| Foto "Nosotros" | Unsplash URL |

---

## 10. Lo que falta / próximos pasos sugeridos

- [ ] **Conectar el formulario de contacto** — actualmente simula el envío con `setTimeout`. Integrar Formspree, EmailJS, o un endpoint propio
- [ ] **Logo real** de Gorgona — actualmente es texto estilizado "GORGONA."
- [ ] **Imágenes reales** — reemplazar Unsplash por fotos del equipo y proyectos reales
- [ ] **URLs de redes sociales** — llenar los `href="#"` con las URLs reales
- [ ] **Datos de contacto reales** — teléfono, email, dirección
- [ ] **SEO** — agregar `sitemap.xml`, `robots.txt`, Open Graph image real, y schema markup de organización
- [ ] **Analytics** — integrar Google Analytics 4 o similar
- [ ] **Favicon** — el actual es el SVG genérico de Vite (`public/favicon.svg`)
- [ ] **Dominio** — subir `dist/` al hosting y apuntar `gorgonamarketing.com`

---

## 11. Comandos útiles

```bash
# Instalar dependencias (primera vez)
npm install

# Servidor de desarrollo
npm run dev -- --port 5174

# Build de producción
npm run build

# Preview del build
npm run preview
```

---

## 12. Guía para continuar trabajando

### Añadir una nueva sección
1. Crear `src/components/NuevaSección.jsx` y `NuevaSección.css`
2. Importar y añadir en `src/App.jsx` en el orden deseado
3. Asignar `id="nueva-seccion"` a la sección (scroll-margin-top ya cubre todos los `section[id]`)
4. Agregar el link en `Navbar.jsx` si aplica

### Añadir animación a un elemento
Agregar clase `reveal`, `reveal-left` o `reveal-right` (y opcionalmente `delay-1/2/3`). El hook `useReveal()` ya está llamado en todos los componentes que lo necesitan.

### Cambiar colores del tema
Todos los colores están como custom properties en `src/index.css` bajo `:root`. Cambiar ahí y se propaga a todo el sitio.

### Regla de las tarjetas flotantes del Hero
Si se agregan más elementos flotantes al Hero, deben ser hijos directos de `<section class="hero">` (no dentro del grid), con `position: absolute`, `pointer-events: none`, y animaciones de máximo 5-6px de rango usando solo `transform: translateY()`.
