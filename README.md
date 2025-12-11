# 🎬 CineScope

Aplicación web de catálogo de películas desarrollada con React + TypeScript y la API de TMDB (The Movie Database).

## Descripción

CineScope es una aplicación moderna que permite a los usuarios explorar, buscar y gestionar su colección de películas favoritas. Consume datos en tiempo real de la API de TMDB para ofrecer información actualizada sobre películas populares, en cartelera y mejor valoradas.

## Características

- Busca películas por título con resultados en tiempo real
- Filtra por género sin necesidad de botones de envío
- Ordena películas por puntuación (ascendente/descendente)
- Guarda tus películas favoritas con persistencia en localStorage
- Permite cambiar entre tema claro y oscuro
- Diseño responsive que se adaptada para dispositivos móviles, tablets y escritorio
- Carga optimizada y manejo de errores en todas las peticiones API
- Interfaz intuitiva, el diseño está basado en Leyes de Gestalt para mejor UX

## Tecnologías

- React 19
- TypeScript
- Vite
- CSS Modules
- React Router DOM - Enrutamiento y navegación
- Axios - Cliente HTTP para peticiones API
- TMDB API - Base de datos de películas

## Instalación

### Prerrequisitos

- Node.js >= 20.0.0
- npm >= 8.0.0

### Pasos

1. Clona el repositorio:
```bash
git clone https://github.com/cristinasevi/desarrollo-interfaces-aa1.git
cd desarrollo-interfaces-aa1
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_TMDB_API_KEY=tu_api_key_aqui
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

4. Obtén tu API key de TMDB:
   - Regístrate en [The Movie Database](https://www.themoviedb.org/)
   - Ve a [Settings → API](https://www.themoviedb.org/settings/api)
   - Genera tu API key (v3 auth)

5. Inicia el servidor de desarrollo:
```bash
npm run dev
```

6. Abre [http://localhost:5173](http://localhost:5173) en el navegador

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Loading.tsx
│   ├── MovieCard.tsx
│   ├── MovieGrid.tsx
│   ├── Navigation.tsx
│   └── SearchBar.tsx
├── contexts/            # Context API (tema + favoritos)
│   ├── FavoritesContext.tsx
│   └── ThemeContext.tsx
├── pages/               # Páginas de la aplicación
│   ├── Home.tsx
│   ├── Search.tsx
│   ├── Favorites.tsx
│   └── MovieDetail.tsx
├── services/            # Llamadas a la API de TMDB
│   └── tmdbApi.ts
├── types/               # Interfaces TypeScript
│   └── movie.ts
├── App.tsx              # Componente raíz
├── main.tsx             # Punto de entrada
└── index.css            # Estilos globales
```

## Componentes Principales


- **Navigation** - Barra superior con links y toggle de tema
- **MovieCard** - Tarjeta de película que se reutiliza en todo el proyecto. Tiene el póster, título, año, puntuación y botón de añadir a favoritos.
- **MovieGrid** - Grid responsive que renderiza las MovieCards. Se adapta solo según el ancho de pantalla.
- **SearchBar** - Input de búsqueda que navega automáticamente a /search con query params.
- **Loading** - Spinner animado que muestro mientras cargan los datos.

## API endpoints usados

La aplicación consume 7 endpoints de TMDB API:

1. `GET /movie/popular` - Películas populares
2. `GET /movie/now_playing` - En cartelera
3. `GET /movie/top_rated` - Mejor valoradas
4. `GET /search/movie` - Búsqueda de películas
5. `GET /genre/movie/list` - Lista de géneros
6. `GET /movie/{id}` - Detalle de película
7. `GET /movie/{id}/credits` - Reparto de película

## Diseño UI/UX

### Leyes de Gestalt

**1. Ley de Proximidad**
- Elementos relacionados agrupados visualmente (título + año)
- Información del reparto agrupada (nombre + personaje)

**2. Ley de Similitud**
- Tarjetas con estilos consistentes (border-radius, sombras)
- Botones con mismo patrón visual
- Tags de género con formato uniforme

**3. Ley de Continuidad**
- Grid de películas fluye dependiendo del espacio disponible
- Navegación con separación visual clara

## Otras Características

### Sistema de Favoritos
- Persistencia con localStorage
- Contador en tiempo real
- Página dedicada de favoritos
- Animación de corazón al añadir/quitar

### Temas
- Tema oscuro por defecto
- Tema claro alternativo
- Variables CSS para consistencia
- Transiciones suaves entre temas

### Manejo de Estados
- Loading spinners personalizados
- Mensajes de error informativos

### Responsive Design
- Mobile-first approach
- Breakpoints en 768px y 480px
- Grid adaptativo
- Navegación optimizada para móvil

---
