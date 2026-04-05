# 🎨 Giffy - Buscador de GIFs Profesional

![React](https://img.shields.io/badge/React-17.0.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Modern-1572B6?style=for-the-badge&logo=css3&logoColor=white)

Un buscador de GIFs moderno, rápido y responsivo construido con **React** y la API de **Giphy**.

🔗 **[Ver Demo en Vivo](https://TU_USUARIO.github.io/giffy)**

![Screenshot](https://via.placeholder.com/800x400/0f0f1a/09f?text=Giffy+Screenshot)

## ✨ Características

- 🔍 **Búsqueda en tiempo real** de GIFs
- 🔥 **Trending GIFs** actualizados
- 📜 **Paginación infinita** (scroll infinito)
- 🖼️ **Lazy loading** de imágenes
- 🎨 **UI Moderna** con modo oscuro
- ⚡ **Alto rendimiento** con Intersection Observer
- ♿ **Accesible** (ARIA labels, navegación por teclado)
- 🛡️ **Error Boundaries** para manejo de errores
- 📱 **100% Responsivo**
- 🔄 **Caché local** con localStorage

## 🚀 Tecnologías

- **React 17** - Framework UI
- **Wouter** - Router ligero
- **Intersection Observer API** - Lazy loading
- **Giphy API** - Fuente de datos
- **CSS3** - Estilos modernos
- **Jest + React Testing Library** - Testing

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/giffy.git
cd giffy

# Instalar dependencias
npm install

# Crear archivo .env con tu API key de Giphy
echo "REACT_APP_GIPHY_API_KEY=tu_api_key_aqui" > .env

# Iniciar servidor de desarrollo
npm start
```

> 🔑 Obtén tu API key gratuita en [developers.giphy.com](https://developers.giphy.com/)

## 🌐 Despliegue

### GitHub Pages

```bash
# Configurar tu usuario en package.json
# "homepage": "https://TU_USUARIO.github.io/giffy"

# Desplegar
npm run deploy
```

### Vercel / Netlify

Simplemente conecta tu repositorio y configura la variable de entorno `REACT_APP_GIPHY_API_KEY`.

## 📁 Estructura del Proyecto

```
giffy/
├── public/
│   ├── 404.html          # Redirección para SPA
│   ├── index.html        # HTML principal
│   └── ...
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── ErrorBoundary/
│   │   ├── Gif/
│   │   ├── ListOfGifs/
│   │   ├── LazyTrending/
│   │   └── Spinner/
│   ├── context/          # Context API (GifsContext)
│   ├── hooks/            # Custom hooks
│   │   ├── useGifs.js
│   │   ├── useNearScreen.js
│   │   └── useSingleGif.js
│   ├── pages/            # Páginas de la app
│   │   ├── Home/
│   │   ├── SearchResults/
│   │   └── Detail/
│   ├── services/         # Servicios de API
│   │   └── Giffys/
│   ├── App.js
│   └── index.js
├── .env.example
├── DEPLOY.md
└── package.json
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Coverage
npm test -- --coverage
```

## 🎨 Mejoras Implementadas

| Aspecto | Implementación |
|---------|---------------|
| **Seguridad** | Variables de entorno para API keys |
| **Performance** | Lazy loading + Paginación infinita |
| **UX** | Loading states, empty states, error handling |
| **Accesibilidad** | ARIA labels, focus visible, semantic HTML |
| **Diseño** | Modo oscuro, gradientes, animaciones suaves |

## 📝 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm test` | Ejecutar tests |
| `npm run deploy` | Desplegar a GitHub Pages |

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor abre un issue primero para discutir los cambios.

## 📄 Licencia

MIT License - Libre para uso personal y comercial.

---

⭐ Si te gustó este proyecto, ¡dale una estrella en GitHub!

**Hecho con ❤️ para mi portfolio**