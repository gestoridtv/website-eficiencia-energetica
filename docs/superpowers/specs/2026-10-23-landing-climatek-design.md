# Landing page corporativa — Climatek (diseño bioclimático y eficiencia energética)

**Fecha:** 2026-10-23
**Estado:** Aprobado para implementación

## Contexto

Empresa constructora que ofrece tres servicios:

1. Diseño de vivienda según las condiciones climáticas del terreno (arquitectura bioclimática).
2. Análisis energético del hogar + plan de mejora para la eficiencia energética.
3. Análisis para instalación de IoT (domótica/sensórica para el hogar).

Se necesita una landing page corporativa moderna, enfocada en usabilidad, que comunique estos tres servicios y genere contacto/leads. Marca placeholder: **Climatek** (fácil de reemplazar por el nombre real).

## Restricciones

- Solo HTML, CSS y JS (sin frameworks, sin build tools, sin dependencias de instalación).
- Todas las imágenes/ilustraciones generadas a mano como SVG inline o archivos `.svg` propios — sin fotos externas ni imágenes generadas por IA.
- Sin backend: el formulario de contacto valida y muestra confirmación en el cliente; se deja un comentario indicando dónde conectar un endpoint real.
- Debe verse y funcionar bien en mobile, tablet y desktop.

## Identidad visual

- **Paleta:** verde bosque `#1B4332` (primario), carbón `#1A1E1B` (texto), acento terracota/ámbar `#E07A3E` (CTAs/hover), fondo off-white cálido `#F7F5F0`, verde salvia claro `#D8E6DD` para fondos de sección alternados.
- **Tipografía:** "Space Grotesk" (títulos, vía Google Fonts) + "Inter" (cuerpo, vía Google Fonts), con fallback a sans-serif de sistema.
- **Estilo de assets:** ilustraciones SVG vectoriales propias (no fotos, no iconos de librerías externas) — casa bioclimática, paneles/sensores IoT, gráficos de energía, iconografía lineal para beneficios.

## Estructura de la página

1. **Header** sticky: logo (SVG wordmark/isotipo simple), nav (Servicios, Por qué elegirnos, Cómo trabajamos, Contacto), CTA "Pedir diagnóstico", menú hamburguesa en mobile.
2. **Hero**: titular, subtítulo, CTA primario + secundario, ilustración SVG grande (casa con orientación solar + nodo IoT).
3. **Servicios** (3 cards, una por servicio): ilustración SVG propia, título, descripción corta, lista de highlights.
4. **Por qué elegirnos**: 4 beneficios con icono lineal SVG + texto corto (ahorro energético, tecnología IoT, diseño adaptado al clima, experiencia).
5. **Cómo trabajamos**: proceso en 4 pasos en formato timeline (Diagnóstico → Diseño/Análisis → Implementación → Seguimiento).
6. **Estadísticas destacadas**: 3-4 números animados (proyectos realizados, % ahorro energético promedio, años de experiencia) — contador JS activado por scroll.
7. **Contacto**: formulario (nombre, email, servicio de interés vía select, mensaje), validación JS, estado de envío simulado con mensaje de confirmación.
8. **Footer**: datos de contacto, redes (placeholders), copyright.

## Interactividad (vanilla JS)

- Scroll-reveal de secciones/cards con `IntersectionObserver`.
- Nav con scroll suave a anclas y resaltado de sección activa.
- Menú mobile (toggle hamburguesa).
- Contador animado de estadísticas al entrar en viewport.
- Validación de formulario de contacto (campos requeridos, formato email) sin librerías.
- Microinteracciones hover en cards e ilustraciones (transform/transition CSS, sin JS pesado).

## Responsive

Mobile-first. Breakpoints aproximados: `640px` (tablet) y `1024px` (desktop). Grid de servicios/beneficios pasa de 1 columna → 2 → 3-4 columnas. Nav colapsa a menú hamburguesa por debajo de `1024px`.

## Estructura de archivos

```
index.html
css/styles.css
js/script.js
assets/*.svg   (si se externalizan algunas ilustraciones grandes)
```

## Verificación

- Levantar el sitio en el navegador integrado (preview) y revisar visualmente en desktop, tablet y mobile.
- Verificar que no haya errores de consola.
- Verificar navegación por anclas, menú mobile, validación de formulario y animaciones de scroll funcionando.
