# 🚀 Guía de Despliegue - Giffy

## Desplegar en GitHub Pages

### Paso 1: Configura tu repositorio

1. Crea un repositorio en GitHub (si no lo tienes)
2. Sube tu código:
```bash
git add .
git commit -m "Proyecto Giffy - Versión Portfolio"
git push origin mejoras
```

### Paso 2: Configura el homepage

Edita `package.json` y cambia esta línea:
```json
"homepage": "https://TU_USUARIO.github.io/giffy"
```
Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub.

### Paso 3: Configura la API Key (Importante!)

1. Ve a Settings → Secrets → Actions en tu repo de GitHub
2. Agrega un secret llamado `REACT_APP_GIPHY_API_KEY` con tu API key de Giphy

### Paso 4: Despliega

```bash
# En tu rama 'mejoras'
npm run deploy
```

Esto creará automáticamente la rama `gh-pages` con tu build.

### Paso 5: Activa GitHub Pages

1. Ve a Settings → Pages en tu repo de GitHub
2. En "Source", selecciona la rama `gh-pages` y carpeta `/ (root)`
3. Guarda y espera 1-2 minutos
4. Tu sitio estará en: `https://TU_USUARIO.github.io/giffy`

---

## 🔧 Solución de Problemas

### "Page Not Found" al recargar

Crea un archivo `public/404.html` con este contenido:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Giffy</title>
  <script>
    // Redirección para SPA en GitHub Pages
    sessionStorage.redirect = location.href;
  </script>
  <meta http-equiv="refresh" content="0;URL='/'">
</head>
<body>
</body>
</html>
```

Y agrega esto al inicio de `public/index.html` (después del `<head>`):

```html
<script>
  (function() {
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect != location.href) {
      history.replaceState(null, null, redirect);
    }
  })();
</script>
```

---

## 🌐 Alternativas de despliegue

### Vercel (Recomendado)
1. Conecta tu repo en [vercel.com](https://vercel.com)
2. Agrega la variable de entorno `REACT_APP_GIPHY_API_KEY`
3. ¡Listo! Se despliega automáticamente

### Netlify
1. Sube tu build a [netlify.com](https://netlify.com)
2. O conecta tu repositorio GitHub

---

## 📋 Checklist antes de desplegar

- [ ] API key configurada en variables de entorno
- [ ] `homepage` actualizado en package.json
- [ ] Proyecto funciona en `npm start` sin errores
- [ ] `npm run build` genera la carpeta `build` sin errores
- [ ] Archivo `.env` está en `.gitignore` (¡nunca subir la API key!)