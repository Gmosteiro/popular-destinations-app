# Usabilidad – Resumen de Implementaciones

Este documento resume las reglas de accesibilidad aplicadas en nuestra aplicación, siguiendo las buenas prácticas recomendadas por las WCAG (Web Content Accessibility Guidelines).

Estas acciones buscan garantizar que la aplicación sea accesible y usable para todos los usuarios, incluyendo aquellos que utilizan tecnologías de asistencia como lectores de pantalla o que navegan solo con teclado.

### HTML Semántico

-   Se agregó `lang="es"` al documento HTML.
-   Se añadieron roles ARIA apropiados (`role="dialog"`, `role="button"`, `role="alert"`, etc.).
-   Se implementó `aria-live` para anuncios y mensajes dinámicos.
-   Se utilizaron atributos `aria-label` y `aria-describedby` donde corresponde.
-   Se asignaron IDs únicos a `label` e `input` para mejorar la asociación.

### Modal Accesible

-   Inclusión de atributos ARIA: `aria-modal="true"`, `aria-labelledby`.
-   Gestión automática del foco al abrir el modal.
-   Se implementó un "focus trap" para mantener el foco dentro del modal mientras esté activo.
-   Soporte para cierre con la tecla `Escape`.

### Navegación por Teclado

-   Soporte de navegación con `Tab` y activación con `Enter` o `Espacio`.
-   Visibilidad mejorada de los estados de foco.
-   Definición correcta del orden de tabulación (`tabindex`).

### Elementos Interactivos

-   Conversión de `div` clickeables a elementos con `role="button"`.
-   Mejora de estados `hover` y `focus` con estilos visuales claros.
-   Incorporación de `aria-label` descriptivos para clarificar acciones.

### Contraste y Legibilidad

-   Mejora del contraste de colores en textos para alcanzar ratios adecuados.
-   Estados de foco más notorios.
-   Mayor diferenciación visual en elementos interactivos.

### Componentes de Estado

-   `Spinner` de carga animado con roles accesibles (`role="status"`, `aria-live`).
-   Mensajes de error marcados con `role="alert"` para lectura inmediata por lectores de pantalla.
-   Indicadores de cambio de estado dinámico con `aria-live`.

### Imágenes y Contenido

-   Textos alternativos (`alt`) más descriptivos en imágenes.
-   Uso de clases tipo `.sr-only` para contenido útil exclusivamente para lectores de pantalla.

### Reducción de Movimiento

-   Implementación de lógica que respeta la preferencia del usuario por reducción de movimiento (`prefers-reduced-motion`).

---
