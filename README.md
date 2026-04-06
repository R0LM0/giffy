# 🎨 Giffy - Buscador de GIFs Profesional

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://giffy-jade-chi.vercel.app/)
![React](https://img.shields.io/badge/React-17.0.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Un buscador de GIFs moderno, rápido y responsivo construido con **React** y la API de **Giphy**.

🔗 **[Ver Demo en Vivo](https://giffy-jade-chi.vercel.app/)**

![Giffy Preview](https://via.placeholder.com/800x400/0f0f1a/09f?text=Giffy+Preview)

---

## ✨ Características

- 🔍 **Búsqueda en tiempo real** de GIFs con sugerencias populares
- 🔥 **Trending GIFs** actualizados automáticamente
- 📜 **Paginación infinita** (scroll infinito) sin recargar
- 🖼️ **Skeleton loading** para mejor UX mientras carga
- 🎨 **UI Moderna** con modo oscuro y diseño glassmorphism
- ⚡ **Alto rendimiento** con Intersection Observer y lazy loading
- ♿ **Accesible** (ARIA labels, navegación por teclado)
- 🛡️ **Error Boundaries** para manejo de errores gracefully
- 📱 **100% Responsivo** - funciona en todos los dispositivos
- 🔄 **Caché local** con localStorage para acceso offline
- 🎯 **Header sticky** con búsqueda global y botón volver
- 🔔 **Toast notifications** modernas (no más alerts feos)
- 🖼️ **Iconos SVG** homogéneos y minimalistas

---

## 🚀 Tecnologías

| Tecnología | Uso |
|------------|-----|
| **React 17** | Framework UI con Hooks |
| **Wouter** | Router ligero (~1KB) |
| **Intersection Observer API** | Lazy loading y paginación infinita |
| **Giphy API** | Fuente de datos de GIFs |
| **CSS3** | Estilos modernos con Grid, Flexbox y Variables |
| **Jest + Testing Library** | Testing unitario |

---

## 📦 Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/R0LM0/giffy.git
cd giffy

# Instalar dependencias
npm install

# Crear archivo .env con tu API key de Giphy
echo "REACT_APP_GIPHY_API_KEY=tu_api_key_aqui" > .env

# Iniciar servidor de desarrollo
npm start
```

> 🔑 Obtén tu API key gratuita en [developers.giphy.com](https://developers.giphy.com/)

---

## 🌐 Despliegue

### Vercel (Recomendado)
El proyecto está desplegado en: **https://giffy-jade-chi.vercel.app/**

Para desplegar tu propia versión:
1. Conecta tu repo en [vercel.com](https://vercel.com)
2. Agrega la variable de entorno `REACT_APP_GIPHY_API_KEY`
3. ¡Listo! Se despliega automáticamente en cada push

### GitHub Pages
```bash
# Configurar tu usuario en package.json
# "homepage": "https://TU_USUARIO.github.io/giffy"

# Desplegar
npm run deploy
```

---

## 📁 Estructura del Proyecto

```
giffy/
├── public/
│   ├── 404.html              # Redirección para SPA
│   ├── index.html            # HTML principal
│   └── ...
├── src/
│   ├── components/           # Componentes reutilizables
│   │   ├── ErrorBoundary/    # Manejo de errores global
│   │   ├── Gif/              # Card de GIF individual
│   │   ├── Icons/            # Iconos SVG homogéneos
│   │   ├── LazyTrending/     # Trending con lazy load
│   │   ├── ListOfGifs/       # Grid de GIFs
│   │   ├── SearchHeader/     # Header sticky con búsqueda
│   │   ├── Skeleton/         # Skeleton loading
│   │   ├── Spinner/          # Spinner de carga
│   │   └── Toast/            # Notificaciones modernas
│   ├── context/              # React Context
│   │   └── GifsContext.js    # Estado global de GIFs
│   ├── hooks/                # Custom Hooks
│   │   ├── useGifs.js        # Fetch y paginación de GIFs
│   │   ├── useNearScreen.js  # Intersection Observer hook
│   │   └── useSingleGif.js   # Fetch de GIF individual
│   ├── pages/                # Páginas de la app
│   │   ├── Home/             # Página principal
│   │   ├── SearchResults/    # Resultados de búsqueda
│   │   └── Detail/           # Detalle de GIF
│   ├── services/             # Servicios de API
│   │   └── Giffys/
│   │       └── getGits.js    # Funciones de fetch
│   ├── App.js                # Componente raíz
│   └── index.js              # Entry point
├── .env.example              # Ejemplo de variables
├── DEPLOY.md                 # Guía de despliegue detallada
├── package.json
└── README.md
```

---

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Coverage
npm test -- --coverage
```

---

## 🎯 Decisiones Técnicas

### ¿Por qué Wouter en lugar de React Router?
- **Ligero**: ~1KB vs ~40KB de React Router
- **Suficiente**: Para una SPA simple no necesitamos todas las features
- **Rápido**: Menos bundle size = mejor performance

### ¿Por qué Intersection Observer para lazy loading?
- **Nativo**: No requiere librerías externas (excepto polyfill legacy)
- **Performance**: Más eficiente que scroll events
- **Moderno**: API nativa del navegador

### ¿Por qué Context API en lugar de Redux?
- **Simple**: Estado pequeño, no necesita Redux
- **Built-in**: Ya viene con React
- **Suficiente**: Para este caso de uso es perfecto

---

## 📸 Screenshots

| Home | Search | Detail |
|------|--------|--------|
| ![Home](https://via.placeholder.com/300x200/0f0f1a/09f?text=Home) | ![Search](https://via.placeholder.com/300x200/0f0f1a/09f?text=Search) | ![Detail](https://via.placeholder.com/300x200/0f0f1a/09f?text=Detail) |

---

## 🔧 Optimizaciones Implementadas

| Aspecto | Implementación |
|---------|----------------|
| **Performance** | Code splitting, lazy loading, memoización |
| **Accesibilidad** | ARIA labels, semantic HTML, focus visible |
| **SEO** | Meta tags, Open Graph, semantic structure |
| **UX** | Skeleton loading, error boundaries, toast notifications |
| **Responsive** | CSS Grid, Flexbox, mobile-first |

---

## 📝 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor de desarrollo (localhost:3000) |
| `npm run build` | Build de producción |
| `npm test` | Ejecutar tests |
| `npm run deploy` | Desplegar a GitHub Pages |

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Haz fork del proyecto
2. Crea una rama (`git checkout -b feature/nueva-feature`)
3. Haz commit (`git commit -m 'feat: nueva feature'`)
4. Push a la rama (`git push origin feature/nueva-feature`)
5. Abre un Pull Request

---

## 📄 Licencia

MIT License - Libre para uso personal y comercial.

---

⭐ Si te gustó este proyecto, ¡dale una estrella en GitHub!

**Hecho con ❤️ por [R0LM0](https://github.com/R0LM0)**
