# popular-destinations-app

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Diseño del Sistema

La aplicación **popular-destinations-app** es una SPA (Single Page Application) desarrollada con Vue.js. Permite a los usuarios buscar destinos turísticos, ver detalles, hoteles recomendados y expresar interés mediante un formulario de contacto. El flujo principal es:

1. **Pantalla principal**: búsqueda y selección de destinos.
2. **Detalle del destino**: muestra información general, preguntas frecuentes, hoteles y un formulario de interés.
3. **Formulario de contacto**: permite a los usuarios enviar su interés por un destino.

La arquitectura sigue el patrón de componentes de Vue, separando la lógica de presentación (`components/`), vistas principales (`views/`), servicios de acceso a datos (`services/`) y rutas (`router/`).

## Descripción de Tecnologías

-   **Vue.js**: Framework principal para la construcción de la interfaz de usuario y gestión del estado de la aplicación.
-   **Vue Router**: Manejo de rutas y navegación entre vistas.
-   **Axios**: Cliente HTTP para consumir APIs externas y obtener datos de destinos, hoteles, etc.
-   **JavaScript (ES6+)**: Lenguaje de programación principal.
-   **HTML5 y CSS3**: Estructura y estilos de la aplicación, con uso de componentes `.vue` que encapsulan lógica, template y estilos.
-   **vue3-carousel**: Componente de carrusel para mostrar hoteles y galerías de imágenes.
-   **Node.js & npm**: Entorno de ejecución y gestor de dependencias para desarrollo y construcción del proyecto.
-   **Webpack/Vue CLI**: Herramientas de build y hot-reload para desarrollo eficiente.

El sistema está pensado para ser fácilmente extensible, permitiendo agregar nuevas vistas, componentes o integraciones con APIs externas.

## Servicios REST utilizados

La aplicación utiliza servicios REST externos (https://serpapi.com/search.json) para obtener información relevante sobre destinos turísticos y hoteles.
