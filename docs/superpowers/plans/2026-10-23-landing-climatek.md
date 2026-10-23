# Climatek Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, corporate landing page (HTML/CSS/JS only, no frameworks) for a construction company offering bioclimatic design, home energy analysis, and IoT installation analysis.

**Architecture:** Single `index.html` with all sections in document order, one `css/styles.css` with design tokens + component styles, one `js/script.js` with all vanilla-JS interactivity (nav, mobile menu, scroll-reveal, counters, form validation). All illustrations are hand-authored inline SVG (no external image files, no icon libraries, no AI-generated images).

**Tech Stack:** HTML5, CSS3 (custom properties, Grid/Flexbox), vanilla JS (`IntersectionObserver`), Google Fonts (Space Grotesk + Inter) loaded via `<link>`.

**Spec:** [docs/superpowers/specs/2026-10-23-landing-climatek-design.md](../specs/2026-10-23-landing-climatek-design.md)

## Global Constraints

- Only HTML, CSS, and JS — no build tools, no frameworks, no npm dependencies.
- All imagery is inline SVG authored by hand — no photos, no external icon sets, no AI-generated images.
- No backend: the contact form validates client-side and shows an inline confirmation message; leave one HTML comment in `js/script.js` marking where a real submit (`fetch(...)`) would go.
- Mobile-first responsive; breakpoints at `640px` and `1024px`.
- Palette: primary `#1B4332`, text `#1A1E1B`, accent `#E07A3E`, background `#F7F5F0`, alt-section background `#D8E6DD`.
- Fonts: "Space Grotesk" for headings, "Inter" for body text.
- Brand name placeholder: **Climatek**.

---

### Task 1: Project scaffold + design tokens

**Files:**
- Create: `index.html`
- Create: `css/styles.css`
- Create: `js/script.js`

**Interfaces:**
- Produces: CSS custom properties on `:root` — `--color-primary`, `--color-text`, `--color-accent`, `--color-bg`, `--color-bg-alt`, `--color-white`, `--font-heading`, `--font-body`, `--container-width` (1200px), `--radius-md` (12px), `--space-*` scale (`--space-xs:4px`, `--space-sm:8px`, `--space-md:16px`, `--space-lg:32px`, `--space-xl:64px`). Every later task's CSS uses these variables, never raw hex/px values for color or spacing.
- Produces: `<body>` skeleton with empty `<header class="header">`, `<main>` containing empty `<section>` placeholders with ids `#inicio`, `#servicios`, `#beneficios`, `#proceso`, `#estadisticas`, `#contacto`, and an empty `<footer class="footer">`. Later tasks fill these in, never rename the ids (JS nav + anchors depend on them).
- Produces: `js/script.js` with a single `DOMContentLoaded` listener wrapper:
  ```js
  document.addEventListener('DOMContentLoaded', () => {
    // feature inits are appended here by later tasks
  });
  ```

- [ ] **Step 1: Create `index.html` with head + skeleton**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Climatek — Construcción bioclimática y eficiencia energética</title>
  <meta name="description" content="Diseño de vivienda bioclimática, análisis energético del hogar e instalación de IoT. Construimos hogares eficientes adaptados a su clima.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="header" id="header"></header>
  <main>
    <section id="inicio" class="hero"></section>
    <section id="servicios" class="services"></section>
    <section id="beneficios" class="benefits"></section>
    <section id="proceso" class="process"></section>
    <section id="estadisticas" class="stats"></section>
    <section id="contacto" class="contact"></section>
  </main>
  <footer class="footer" id="footer"></footer>
  <script src="js/script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `css/styles.css` with reset + tokens**

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --color-primary: #1B4332;
  --color-primary-dark: #0F2A1E;
  --color-text: #1A1E1B;
  --color-accent: #E07A3E;
  --color-accent-dark: #C7622A;
  --color-bg: #F7F5F0;
  --color-bg-alt: #D8E6DD;
  --color-white: #FFFFFF;

  --font-heading: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;

  --container-width: 1200px;
  --radius-md: 12px;
  --radius-lg: 24px;

  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 32px;
  --space-xl: 64px;
}

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.6;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  line-height: 1.2;
  font-weight: 600;
}

a { color: inherit; text-decoration: none; }
img, svg { display: block; max-width: 100%; }

.container {
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

@media (max-width: 640px) {
  .container { padding: 0 var(--space-md); }
}
```

- [ ] **Step 3: Create `js/script.js` with init wrapper**

```js
document.addEventListener('DOMContentLoaded', () => {
  // feature inits appended here by later tasks
});
```

- [ ] **Step 4: Verify scaffold loads with no console errors**

Open `index.html` in the browser preview. Expected: blank off-white page, no 404s for CSS/JS, no console errors, fonts request succeeds in the Network tab.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css js/script.js
git commit -m "feat: scaffold landing page with design tokens"
```

---

### Task 2: Header + navigation + mobile menu

**Files:**
- Modify: `index.html` (fill `#header`)
- Modify: `css/styles.css` (append header/nav styles)
- Modify: `js/script.js` (append mobile menu toggle)

**Interfaces:**
- Consumes: `--color-*`, `--font-*`, `--space-*` tokens from Task 1.
- Produces: `.nav-toggle` button with `aria-expanded` attribute and `.nav-menu` element toggled via `.is-open` class — Task 10's scroll-spy logic queries `.nav-link` elements by `href` matching section ids, so nav links' `href` values must be `#inicio`, `#servicios`, `#beneficios`, `#proceso`, `#contacto` (stats has no nav link).

- [ ] **Step 1: Fill header markup in `index.html`**

Replace `<header class="header" id="header"></header>` with:

```html
<header class="header" id="header">
  <div class="container header__inner">
    <a href="#inicio" class="logo" aria-label="Climatek — inicio">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 3 L33 15 V31 H3 V15 Z" fill="#1B4332"/>
        <path d="M18 3 L33 15 H3 Z" fill="#E07A3E"/>
        <rect x="14" y="19" width="8" height="12" fill="#F7F5F0"/>
      </svg>
      <span>Climatek</span>
    </a>
    <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-label="Abrir menú">
      <span></span><span></span><span></span>
    </button>
    <nav class="nav-menu" id="navMenu">
      <a href="#servicios" class="nav-link">Servicios</a>
      <a href="#beneficios" class="nav-link">Por qué elegirnos</a>
      <a href="#proceso" class="nav-link">Cómo trabajamos</a>
      <a href="#contacto" class="nav-link">Contacto</a>
      <a href="#contacto" class="btn btn--accent">Pedir diagnóstico</a>
    </nav>
  </div>
</header>
```

- [ ] **Step 2: Append header + button + nav CSS**

```css
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-bg);
  border-bottom: 1px solid rgba(27,67,50,0.08);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-primary);
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease;
}
.btn--accent { background: var(--color-accent); color: var(--color-white); }
.btn--accent:hover { background: var(--color-accent-dark); transform: translateY(-2px); }
.btn--outline { background: transparent; color: var(--color-primary); border: 2px solid var(--color-primary); }
.btn--outline:hover { background: var(--color-primary); color: var(--color-white); }

.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
}
.nav-toggle span { width: 100%; height: 2px; background: var(--color-text); border-radius: 2px; }

.nav-menu { display: flex; align-items: center; gap: var(--space-lg); }
.nav-link { font-weight: 500; position: relative; padding: 4px 0; }
.nav-link.is-active { color: var(--color-accent); }

@media (max-width: 1024px) {
  .nav-toggle { display: flex; }
  .nav-menu {
    position: absolute;
    top: 72px; left: 0; right: 0;
    background: var(--color-bg);
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-md);
    padding: var(--space-lg);
    border-bottom: 1px solid rgba(27,67,50,0.08);
    transform: translateY(-110%);
    opacity: 0;
    transition: transform 0.25s ease, opacity 0.25s ease;
    pointer-events: none;
  }
  .nav-menu.is-open { transform: translateY(0); opacity: 1; pointer-events: auto; }
}
```

- [ ] **Step 3: Append mobile menu toggle JS**

Inside the `DOMContentLoaded` listener in `js/script.js`, add:

```js
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('.nav-link, .btn').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
```

- [ ] **Step 4: Verify in browser**

Reload preview. Expected: sticky header with logo + nav visible on desktop width; resize to <1024px width shows hamburger button; clicking it slides the menu open/closed; clicking a link closes the menu.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css js/script.js
git commit -m "feat: add sticky header, nav, and mobile menu toggle"
```

---

### Task 3: Hero section

**Files:**
- Modify: `index.html` (fill `#inicio`)
- Modify: `css/styles.css` (append hero styles)

**Interfaces:**
- Consumes: `.btn`, `.btn--accent`, `.btn--outline` from Task 2; `.container` from Task 1.
- Produces: `.hero` section with class `.reveal` on its content wrapper — Task 10's scroll-reveal queries every `.reveal` element in the document, so any element needing the fade-in-on-scroll effect (here and in later tasks) must carry this class.

- [ ] **Step 1: Fill hero markup**

Replace `<section id="inicio" class="hero"></section>` with:

```html
<section id="inicio" class="hero">
  <div class="container hero__inner">
    <div class="hero__content reveal">
      <h1>Viviendas pensadas para su clima. Hogares que ahorran energía.</h1>
      <p class="hero__subtitle">Diseñamos y mejoramos hogares combinando arquitectura bioclimática, análisis energético y tecnología IoT — para que cada vivienda consuma menos y rinda más.</p>
      <div class="hero__actions">
        <a href="#contacto" class="btn btn--accent">Pedir diagnóstico gratuito</a>
        <a href="#servicios" class="btn btn--outline">Ver servicios</a>
      </div>
    </div>
    <div class="hero__art reveal" aria-hidden="true">
      <svg viewBox="0 0 420 360" xmlns="http://www.w3.org/2000/svg">
        <circle cx="330" cy="70" r="40" fill="#E07A3E" opacity="0.9"/>
        <g stroke="#E07A3E" stroke-width="4" stroke-linecap="round">
          <line x1="330" y1="10" x2="330" y2="0"/>
          <line x1="385" y1="30" x2="393" y2="22"/>
          <line x1="395" y1="70" x2="405" y2="70"/>
        </g>
        <path d="M60 220 L160 140 L260 220 V320 H60 Z" fill="#1B4332"/>
        <path d="M60 220 L160 140 L260 220 H60 Z" fill="#2D6A4F"/>
        <rect x="100" y="250" width="40" height="70" fill="#F7F5F0"/>
        <rect x="170" y="240" width="60" height="40" fill="#D8E6DD" stroke="#1B4332" stroke-width="2"/>
        <g transform="translate(170,150) rotate(-18)">
          <rect x="0" y="0" width="70" height="40" rx="3" fill="#0F2A1E"/>
          <line x1="0" y1="10" x2="70" y2="10" stroke="#2D6A4F" stroke-width="2"/>
          <line x1="0" y1="20" x2="70" y2="20" stroke="#2D6A4F" stroke-width="2"/>
          <line x1="0" y1="30" x2="70" y2="30" stroke="#2D6A4F" stroke-width="2"/>
        </g>
        <circle cx="300" cy="260" r="26" fill="#FFFFFF" stroke="#1B4332" stroke-width="3"/>
        <circle cx="300" cy="260" r="6" fill="#E07A3E"/>
        <path d="M300 260 L300 240 M300 260 L316 272" stroke="#1B4332" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M268 260 Q284 230 300 260 Q316 290 332 260" stroke="#E07A3E" stroke-width="2" fill="none" opacity="0.6"/>
      </svg>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append hero CSS**

```css
.hero { padding: var(--space-xl) 0; overflow: hidden; }
.hero__inner {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: var(--space-xl);
  align-items: center;
}
.hero h1 { font-size: clamp(2rem, 4vw, 3rem); color: var(--color-primary-dark); margin-bottom: var(--space-md); }
.hero__subtitle { font-size: 1.1rem; max-width: 46ch; margin-bottom: var(--space-lg); color: #3A4540; }
.hero__actions { display: flex; gap: var(--space-md); flex-wrap: wrap; }
.hero__art svg { width: 100%; height: auto; }

@media (max-width: 1024px) {
  .hero__inner { grid-template-columns: 1fr; text-align: center; }
  .hero__actions { justify-content: center; }
  .hero__art { max-width: 360px; margin: 0 auto; }
}

.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.is-visible { opacity: 1; transform: translateY(0); }
```

- [ ] **Step 3: Verify in browser**

Reload preview. Expected: two-column hero on desktop (text left, illustration right) collapsing to a single stacked column below 1024px. Note `.reveal` elements will be invisible until Task 10 wires the observer — that's expected at this point; just confirm layout/markup renders.

- [ ] **Step 4: Temporarily force visibility to check layout**, then revert

Run in the browser console: `document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'))` — confirm layout looks right, then just reload the page (don't edit files) since this was only a console check.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add hero section with SVG illustration"
```

---

### Task 4: Servicios section (3 service cards)

**Files:**
- Modify: `index.html` (fill `#servicios`)
- Modify: `css/styles.css` (append services styles)

**Interfaces:**
- Consumes: `.reveal`, `.container` tokens from prior tasks.
- Produces: `.service-card` component — no later task depends on its internals beyond the `.reveal` class already shared.

- [ ] **Step 1: Fill services markup**

Replace `<section id="servicios" class="services"></section>` with:

```html
<section id="servicios" class="services">
  <div class="container">
    <h2 class="section-title reveal">Nuestros servicios</h2>
    <p class="section-subtitle reveal">Tres formas de hacer que su vivienda rinda mejor con su entorno y con el presupuesto.</p>

    <div class="services__grid">
      <article class="service-card reveal">
        <svg class="service-card__art" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="56" fill="#D8E6DD"/>
          <path d="M30 70 L60 44 L90 70 V96 H30 Z" fill="#1B4332"/>
          <path d="M30 70 L60 44 L90 70 H30 Z" fill="#2D6A4F"/>
          <g stroke="#E07A3E" stroke-width="3" stroke-linecap="round">
            <line x1="60" y1="20" x2="60" y2="30"/>
            <line x1="34" y1="30" x2="40" y2="36"/>
            <line x1="86" y1="30" x2="80" y2="36"/>
          </g>
        </svg>
        <h3>Diseño de vivienda bioclimática</h3>
        <p>Proyectamos su casa en función de la orientación solar, vientos y temperatura del terreno, para reducir la demanda de calefacción y refrigeración desde el primer plano.</p>
        <ul class="service-card__list">
          <li>Estudio climático del terreno</li>
          <li>Orientación y ventilación óptima</li>
          <li>Selección de materiales según zona</li>
        </ul>
      </article>

      <article class="service-card reveal">
        <svg class="service-card__art" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="56" fill="#D8E6DD"/>
          <rect x="38" y="30" width="44" height="60" rx="4" fill="#1B4332"/>
          <rect x="46" y="40" width="28" height="6" fill="#E07A3E"/>
          <rect x="46" y="52" width="20" height="6" fill="#F7F5F0"/>
          <rect x="46" y="64" width="24" height="6" fill="#F7F5F0"/>
          <path d="M30 94 L50 78 L70 90 L90 74" stroke="#E07A3E" stroke-width="3" fill="none" stroke-linecap="round"/>
        </svg>
        <h3>Análisis energético del hogar</h3>
        <p>Medimos el consumo real de su vivienda y entregamos un plan de mejora concreto: qué cambiar primero, cuánto ahorra y en cuánto tiempo se recupera la inversión.</p>
        <ul class="service-card__list">
          <li>Auditoría energética completa</li>
          <li>Plan de mejoras priorizado</li>
          <li>Estimación de ahorro y retorno</li>
        </ul>
      </article>

      <article class="service-card reveal">
        <svg class="service-card__art" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="56" fill="#D8E6DD"/>
          <rect x="34" y="70" width="52" height="24" rx="4" fill="#1B4332"/>
          <circle cx="60" cy="42" r="16" fill="none" stroke="#2D6A4F" stroke-width="3"/>
          <circle cx="60" cy="42" r="6" fill="#E07A3E"/>
          <circle cx="36" cy="30" r="5" fill="#E07A3E" opacity="0.7"/>
          <circle cx="84" cy="30" r="5" fill="#E07A3E" opacity="0.7"/>
          <line x1="60" y1="58" x2="60" y2="70" stroke="#2D6A4F" stroke-width="3"/>
        </svg>
        <h3>Análisis para instalación de IoT</h3>
        <p>Evaluamos su hogar para definir qué sensores y automatizaciones tienen sentido: control de temperatura, consumo en tiempo real y gestión remota, sin sobre-equipar.</p>
        <ul class="service-card__list">
          <li>Relevamiento de puntos clave</li>
          <li>Selección de sensores y hubs</li>
          <li>Plan de instalación por etapas</li>
        </ul>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append services CSS**

```css
.services { padding: var(--space-xl) 0; }
.section-title { font-size: clamp(1.75rem, 3vw, 2.5rem); color: var(--color-primary-dark); text-align: center; }
.section-subtitle { text-align: center; max-width: 60ch; margin: var(--space-sm) auto var(--space-xl); color: #3A4540; }

.services__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.service-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.service-card:hover { transform: translateY(-6px); box-shadow: 0 16px 32px rgba(27,67,50,0.12); }
.service-card__art { width: 100px; height: 100px; margin-bottom: var(--space-md); }
.service-card h3 { font-size: 1.25rem; color: var(--color-primary-dark); margin-bottom: var(--space-sm); }
.service-card p { color: #3A4540; margin-bottom: var(--space-md); }
.service-card__list { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.service-card__list li { padding-left: var(--space-md); position: relative; font-size: 0.92rem; }
.service-card__list li::before { content: "✓"; position: absolute; left: 0; color: var(--color-accent); font-weight: 700; }

@media (max-width: 1024px) {
  .services__grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .services__grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Verify in browser**

Reload preview. Expected: 3-column grid on desktop → 2 columns on tablet (<1024px) → 1 column on mobile (<640px); hover lifts each card.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add services section with 3 service cards"
```

---

### Task 5: Por qué elegirnos (benefits)

**Files:**
- Modify: `index.html` (fill `#beneficios`)
- Modify: `css/styles.css` (append benefits styles)

**Interfaces:**
- Consumes: `.reveal`, `.section-title`, `.section-subtitle`, `.container` from prior tasks.

- [ ] **Step 1: Fill benefits markup**

Replace `<section id="beneficios" class="benefits"></section>` with:

```html
<section id="beneficios" class="benefits">
  <div class="container">
    <h2 class="section-title reveal">Por qué elegirnos</h2>
    <p class="section-subtitle reveal">Combinamos construcción, datos y tecnología para que cada decisión tenga un retorno medible.</p>

    <div class="benefits__grid">
      <div class="benefit reveal">
        <svg class="benefit__icon" viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="22" fill="none" stroke="#1B4332" stroke-width="2.5"/>
          <path d="M24 12 L24 24 L32 30" stroke="#E07A3E" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        </svg>
        <h3>Ahorro energético real</h3>
        <p>Reducciones de consumo medibles desde los primeros meses de implementado el plan.</p>
      </div>
      <div class="benefit reveal">
        <svg class="benefit__icon" viewBox="0 0 48 48" aria-hidden="true">
          <rect x="10" y="10" width="28" height="28" rx="4" fill="none" stroke="#1B4332" stroke-width="2.5"/>
          <circle cx="24" cy="24" r="5" fill="#E07A3E"/>
          <line x1="24" y1="4" x2="24" y2="10" stroke="#1B4332" stroke-width="2.5"/>
          <line x1="24" y1="38" x2="24" y2="44" stroke="#1B4332" stroke-width="2.5"/>
        </svg>
        <h3>Tecnología IoT aplicada</h3>
        <p>Sensores y automatización pensados para el uso real del hogar, sin complejidad innecesaria.</p>
      </div>
      <div class="benefit reveal">
        <svg class="benefit__icon" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M12 30 L24 16 L36 30" fill="none" stroke="#1B4332" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="24" cy="16" r="4" fill="#E07A3E"/>
        </svg>
        <h3>Diseño adaptado al clima</h3>
        <p>Cada proyecto se piensa según el terreno, la orientación y el microclima específico.</p>
      </div>
      <div class="benefit reveal">
        <svg class="benefit__icon" viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="22" fill="none" stroke="#1B4332" stroke-width="2.5"/>
          <path d="M16 24 L22 30 L33 18" stroke="#E07A3E" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h3>Experiencia comprobada</h3>
        <p>Un equipo que combina arquitectura, eficiencia energética e ingeniería en un mismo proceso.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append benefits CSS**

```css
.benefits { padding: var(--space-xl) 0; background: var(--color-bg-alt); }
.benefits__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);
}
.benefit { text-align: center; }
.benefit__icon { width: 48px; height: 48px; margin: 0 auto var(--space-md); }
.benefit h3 { font-size: 1.05rem; color: var(--color-primary-dark); margin-bottom: var(--space-xs); }
.benefit p { font-size: 0.92rem; color: #3A4540; }

@media (max-width: 1024px) {
  .benefits__grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .benefits__grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Verify in browser**

Reload preview. Expected: 4-column grid on desktop → 2 on tablet → 1 on mobile, alt background color visible behind this section.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add benefits section"
```

---

### Task 6: Cómo trabajamos (process timeline)

**Files:**
- Modify: `index.html` (fill `#proceso`)
- Modify: `css/styles.css` (append process styles)

**Interfaces:**
- Consumes: `.reveal`, `.section-title`, `.section-subtitle`, `.container` from prior tasks.

- [ ] **Step 1: Fill process markup**

Replace `<section id="proceso" class="process"></section>` with:

```html
<section id="proceso" class="process">
  <div class="container">
    <h2 class="section-title reveal">Cómo trabajamos</h2>
    <p class="section-subtitle reveal">Un proceso claro, de principio a fin, para cada proyecto.</p>

    <ol class="timeline">
      <li class="timeline__step reveal">
        <span class="timeline__number">1</span>
        <h3>Diagnóstico</h3>
        <p>Visitamos el terreno o la vivienda y recopilamos datos climáticos, constructivos y de consumo.</p>
      </li>
      <li class="timeline__step reveal">
        <span class="timeline__number">2</span>
        <h3>Diseño y análisis</h3>
        <p>Elaboramos la propuesta de diseño bioclimático o el plan de mejora energética e IoT.</p>
      </li>
      <li class="timeline__step reveal">
        <span class="timeline__number">3</span>
        <h3>Implementación</h3>
        <p>Ejecutamos la construcción, las mejoras o la instalación de sensores según el plan acordado.</p>
      </li>
      <li class="timeline__step reveal">
        <span class="timeline__number">4</span>
        <h3>Seguimiento</h3>
        <p>Medimos resultados reales de ahorro y ajustamos el sistema si es necesario.</p>
      </li>
    </ol>
  </div>
</section>
```

- [ ] **Step 2: Append process/timeline CSS**

```css
.process { padding: var(--space-xl) 0; }
.timeline {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);
  position: relative;
}
.timeline__step { text-align: center; padding-top: var(--space-lg); position: relative; }
.timeline__number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; height: 40px;
  margin: 0 auto var(--space-md);
  border-radius: 50%;
  background: var(--color-primary);
  color: var(--color-white);
  font-family: var(--font-heading);
  font-weight: 700;
}
.timeline__step h3 { color: var(--color-primary-dark); margin-bottom: var(--space-xs); }
.timeline__step p { font-size: 0.92rem; color: #3A4540; }

@media (max-width: 1024px) {
  .timeline { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .timeline { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Verify in browser**

Reload preview. Expected: 4 numbered steps in a row on desktop, 2x2 on tablet, stacked on mobile.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add process timeline section"
```

---

### Task 7: Estadísticas destacadas (animated counters)

**Files:**
- Modify: `index.html` (fill `#estadisticas`)
- Modify: `css/styles.css` (append stats styles)
- Modify: `js/script.js` (append counter animation)

**Interfaces:**
- Produces: `.stat-number` elements carrying a `data-target` attribute (the integer to count up to) and starting text content `0`. Produces a reusable `animateCounter(el)` function in `js/script.js` that reads `data-target`, is called once per element the first time it enters the viewport, and must not be a named export/global beyond this closure (later tasks don't need to call it).

- [ ] **Step 1: Fill stats markup**

Replace `<section id="estadisticas" class="stats"></section>` with:

```html
<section id="estadisticas" class="stats">
  <div class="container stats__grid">
    <div class="stat">
      <span class="stat-number" data-target="180">0</span><span class="stat-suffix">+</span>
      <p>Proyectos realizados</p>
    </div>
    <div class="stat">
      <span class="stat-number" data-target="35">0</span><span class="stat-suffix">%</span>
      <p>Ahorro energético promedio</p>
    </div>
    <div class="stat">
      <span class="stat-number" data-target="12">0</span><span class="stat-suffix">+</span>
      <p>Años de experiencia</p>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append stats CSS**

```css
.stats { padding: var(--space-xl) 0; background: var(--color-primary); color: var(--color-white); }
.stats__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
  text-align: center;
}
.stat-number, .stat-suffix {
  font-family: var(--font-heading);
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: 700;
  color: var(--color-accent);
}
.stat p { margin-top: var(--space-xs); opacity: 0.9; }

@media (max-width: 640px) {
  .stats__grid { grid-template-columns: 1fr; gap: var(--space-xl); }
}
```

- [ ] **Step 3: Append counter animation JS**

Inside the `DOMContentLoaded` listener in `js/script.js`, add:

```js
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }

  const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));
```

- [ ] **Step 4: Verify in browser**

Reload preview, scroll to the stats section. Expected: numbers count up from 0 to their target (180, 35, 12) once the section enters view, and don't re-trigger on repeated scroll past it.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css js/script.js
git commit -m "feat: add animated stats counters"
```

---

### Task 8: Contacto (form + validation)

**Files:**
- Modify: `index.html` (fill `#contacto`)
- Modify: `css/styles.css` (append contact/form styles)
- Modify: `js/script.js` (append form validation + submit handling)

**Interfaces:**
- Produces: `<form id="contactForm">` with named fields `name`, `email`, `service`, `message`; a `.form-success` element (hidden by default via `hidden` attribute) shown on successful validated submit.

- [ ] **Step 1: Fill contact markup**

Replace `<section id="contacto" class="contact"></section>` with:

```html
<section id="contacto" class="contact">
  <div class="container contact__inner">
    <div class="contact__info reveal">
      <h2 class="section-title" style="text-align:left">Hablemos de su proyecto</h2>
      <p>Cuéntenos sobre su vivienda o terreno y le respondemos con los próximos pasos.</p>
      <ul class="contact__details">
        <li>contacto@climatek.com.ar</li>
        <li>+54 11 5555-0123</li>
        <li>Buenos Aires, Argentina</li>
      </ul>
    </div>

    <form id="contactForm" class="contact-form reveal" novalidate>
      <div class="form-field">
        <label for="name">Nombre</label>
        <input type="text" id="name" name="name" required>
        <span class="form-error" data-for="name"></span>
      </div>
      <div class="form-field">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
        <span class="form-error" data-for="email"></span>
      </div>
      <div class="form-field">
        <label for="service">Servicio de interés</label>
        <select id="service" name="service" required>
          <option value="" disabled selected>Seleccionar...</option>
          <option value="bioclimatico">Diseño de vivienda bioclimática</option>
          <option value="energetico">Análisis energético del hogar</option>
          <option value="iot">Análisis para instalación de IoT</option>
        </select>
        <span class="form-error" data-for="service"></span>
      </div>
      <div class="form-field">
        <label for="message">Mensaje</label>
        <textarea id="message" name="message" rows="4" required></textarea>
        <span class="form-error" data-for="message"></span>
      </div>
      <button type="submit" class="btn btn--accent">Enviar consulta</button>
      <p class="form-success" hidden>¡Gracias! Recibimos su consulta y le responderemos a la brevedad.</p>
    </form>
  </div>
</section>
```

- [ ] **Step 2: Append contact/form CSS**

```css
.contact { padding: var(--space-xl) 0; }
.contact__inner {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: var(--space-xl);
}
.contact__info h2 { margin-bottom: var(--space-sm); }
.contact__details { list-style: none; margin-top: var(--space-lg); display: flex; flex-direction: column; gap: var(--space-sm); }

.contact-form { display: flex; flex-direction: column; gap: var(--space-md); }
.form-field { display: flex; flex-direction: column; gap: 6px; }
.form-field label { font-weight: 600; font-size: 0.9rem; }
.form-field input, .form-field select, .form-field textarea {
  padding: 10px 12px;
  border: 1.5px solid rgba(27,67,50,0.25);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 1rem;
  background: var(--color-white);
}
.form-field input:focus, .form-field select:focus, .form-field textarea:focus {
  outline: none;
  border-color: var(--color-accent);
}
.form-field.has-error input, .form-field.has-error select, .form-field.has-error textarea {
  border-color: #C0392B;
}
.form-error { font-size: 0.82rem; color: #C0392B; min-height: 1em; }
.form-success { margin-top: var(--space-sm); color: var(--color-primary-dark); font-weight: 600; }

@media (max-width: 1024px) {
  .contact__inner { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Append form validation JS**

Inside the `DOMContentLoaded` listener in `js/script.js`, add:

```js
  const contactForm = document.getElementById('contactForm');
  const successMsg = contactForm.querySelector('.form-success');

  function setFieldError(field, message) {
    const wrapper = field.closest('.form-field');
    const errorEl = wrapper.querySelector('.form-error');
    if (message) {
      wrapper.classList.add('has-error');
      errorEl.textContent = message;
    } else {
      wrapper.classList.remove('has-error');
      errorEl.textContent = '';
    }
  }

  function validateContactForm() {
    let isValid = true;
    const name = contactForm.name;
    const email = contactForm.email;
    const service = contactForm.service;
    const message = contactForm.message;

    if (!name.value.trim()) { setFieldError(name, 'Ingrese su nombre.'); isValid = false; }
    else setFieldError(name, '');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) { setFieldError(email, 'Ingrese un email válido.'); isValid = false; }
    else setFieldError(email, '');

    if (!service.value) { setFieldError(service, 'Seleccione un servicio.'); isValid = false; }
    else setFieldError(service, '');

    if (!message.value.trim()) { setFieldError(message, 'Ingrese un mensaje.'); isValid = false; }
    else setFieldError(message, '');

    return isValid;
  }

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateContactForm()) {
      successMsg.hidden = true;
      return;
    }
    // Real backend integration point: replace this block with, e.g.,
    // fetch('/api/contact', { method: 'POST', body: new FormData(contactForm) })
    successMsg.hidden = false;
    contactForm.reset();
  });
```

- [ ] **Step 4: Verify in browser**

Reload preview. Expected: submitting empty form shows inline errors under each invalid field; filling all fields correctly and submitting shows the success message and clears the form; typing an invalid email (e.g. `foo`) shows the email error specifically.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css js/script.js
git commit -m "feat: add contact section with client-side form validation"
```

---

### Task 9: Footer

**Files:**
- Modify: `index.html` (fill `#footer`)
- Modify: `css/styles.css` (append footer styles)

- [ ] **Step 1: Fill footer markup**

Replace `<footer class="footer" id="footer"></footer>` with:

```html
<footer class="footer" id="footer">
  <div class="container footer__inner">
    <div class="logo logo--footer">
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 3 L33 15 V31 H3 V15 Z" fill="#D8E6DD"/>
        <path d="M18 3 L33 15 H3 Z" fill="#E07A3E"/>
        <rect x="14" y="19" width="8" height="12" fill="#1B4332"/>
      </svg>
      <span>Climatek</span>
    </div>
    <p class="footer__tagline">Construcción bioclimática, eficiencia energética e IoT para el hogar.</p>
    <nav class="footer__links">
      <a href="#servicios">Servicios</a>
      <a href="#beneficios">Por qué elegirnos</a>
      <a href="#proceso">Cómo trabajamos</a>
      <a href="#contacto">Contacto</a>
    </nav>
    <p class="footer__copy">© 2026 Climatek. Todos los derechos reservados.</p>
  </div>
</footer>
```

- [ ] **Step 2: Append footer CSS**

```css
.footer { background: var(--color-primary-dark); color: var(--color-bg); padding: var(--space-xl) 0 var(--space-lg); }
.footer__inner { display: flex; flex-direction: column; align-items: center; gap: var(--space-md); text-align: center; }
.logo--footer { display: flex; align-items: center; gap: var(--space-sm); font-family: var(--font-heading); font-weight: 700; font-size: 1.1rem; }
.footer__tagline { max-width: 50ch; opacity: 0.85; }
.footer__links { display: flex; gap: var(--space-lg); flex-wrap: wrap; justify-content: center; }
.footer__copy { opacity: 0.6; font-size: 0.85rem; margin-top: var(--space-md); }
```

- [ ] **Step 3: Verify in browser**

Reload preview. Expected: dark footer with logo, tagline, link row, and copyright line, centered.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add footer"
```

---

### Task 10: Scroll-reveal, nav active state, and responsive polish pass

**Files:**
- Modify: `js/script.js` (append scroll-reveal observer + nav active-state tracking)
- Modify: `css/styles.css` (any responsive fixes found during verification)

**Interfaces:**
- Consumes: `.reveal` class from Tasks 3–8; `.nav-link` elements from Task 2 whose `href` matches a section id.

- [ ] **Step 1: Append scroll-reveal IntersectionObserver**

Inside the `DOMContentLoaded` listener in `js/script.js`, add:

```js
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
```

- [ ] **Step 2: Append nav active-state tracking**

Inside the `DOMContentLoaded` listener in `js/script.js`, add:

```js
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => navObserver.observe(section));
```

- [ ] **Step 3: Verify in browser — desktop**

Reload preview at desktop width (≥1024px). Expected: every section's content fades/slides in as it's scrolled into view (only once each); the nav link matching the section currently in view gets the `.is-active` accent color.

- [ ] **Step 4: Verify in browser — tablet and mobile**

Use the browser's responsive resize tool to check widths ~768px and ~400px for every section (header/menu, hero, services, benefits, process, stats, contact, footer). Fix any overflow, overlap, or spacing issue found by editing `css/styles.css` directly (no placeholders — make the concrete fix).

- [ ] **Step 5: Verify no console errors across the full page**

Reload and check the browser console from top to bottom of the page (triggering all scroll/counter/form interactions). Expected: zero errors.

- [ ] **Step 6: Commit**

```bash
git add js/script.js css/styles.css
git commit -m "feat: add scroll-reveal, nav active state, and responsive fixes"
```
