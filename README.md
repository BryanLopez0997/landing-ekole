# Landing Page

Una landing page moderna construida con Next.js 15, React 19, Tailwind CSS y componentes animados con Framer Motion y GSAP.

## Requisitos Previos

Antes de comenzar, asegurate de tener instalado en tu equipo:

- **Node.js** (version 18.17 o superior) - [Descargar Node.js](https://nodejs.org/)
- **pnpm** (recomendado), npm o yarn como gestor de paquetes

### Verificar instalacion de Node.js

```bash
node --version
# Deberia mostrar v18.17.0 o superior
```

### Instalar pnpm (opcional pero recomendado)

```bash
npm install -g pnpm
```

## Instalacion

1. **Clona el repositorio** (o descarga el ZIP desde v0):

```bash
git clone <url-del-repositorio>
cd landing-page
```

2. **Instala las dependencias**:

```bash
# Con pnpm (recomendado)
pnpm install

# O con npm
npm install

# O con yarn
yarn install
```

## Ejecutar el Proyecto

### Modo Desarrollo

Para iniciar el servidor de desarrollo con Hot Module Replacement (HMR):

```bash
# Con pnpm
pnpm dev

# O con npm
npm run dev

# O con yarn
yarn dev
```

El proyecto estara disponible en: **http://localhost:3000**

### Modo Produccion

Para crear una build optimizada para produccion:

```bash
# Crear la build
pnpm build

# Iniciar el servidor de produccion
pnpm start
```

## Scripts Disponibles

| Comando | Descripcion |
|---------|-------------|
| `pnpm dev` | Inicia el servidor de desarrollo |
| `pnpm build` | Crea una build de produccion |
| `pnpm start` | Inicia el servidor de produccion |
| `pnpm lint` | Ejecuta ESLint para verificar el codigo |

## Estructura del Proyecto

```
landing-page/
├── app/
│   ├── globals.css        # Estilos globales y variables CSS
│   ├── layout.tsx         # Layout principal de la aplicacion
│   └── page.tsx           # Pagina principal
├── components/
│   ├── ui/                # Componentes de UI reutilizables
│   │   ├── grid-motion.tsx
│   │   ├── gooey-text-morphing.tsx
│   │   └── ...
│   └── software-development-website.tsx  # Componente principal
├── lib/
│   └── utils.ts           # Utilidades (funcion cn para clases)
├── hooks/                 # Custom hooks
├── public/                # Archivos estaticos
├── package.json
├── tailwind.config.ts     # Configuracion de Tailwind CSS
├── tsconfig.json          # Configuracion de TypeScript
└── next.config.mjs        # Configuracion de Next.js
```

## Tecnologias Utilizadas

- **Next.js 15** - Framework de React con App Router
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estatico
- **Tailwind CSS** - Framework de estilos utilitarios
- **Framer Motion** - Animaciones declarativas
- **GSAP** - Animaciones avanzadas
- **Radix UI** - Componentes accesibles sin estilos
- **Lucide React** - Iconos

## Solucion de Problemas

### Error: "Module not found"

Asegurate de haber ejecutado `pnpm install` antes de iniciar el proyecto.

### Error: Puerto 3000 en uso

Puedes especificar un puerto diferente:

```bash
pnpm dev --port 3001
```

### Problemas con dependencias

Intenta limpiar la cache y reinstalar:

```bash
# Eliminar node_modules y archivos de cache
rm -rf node_modules .next pnpm-lock.yaml

# Reinstalar dependencias
pnpm install
```

## Despliegue

Este proyecto esta optimizado para desplegarse en **Vercel**:

1. Conecta tu repositorio a [Vercel](https://vercel.com)
2. Vercel detectara automaticamente que es un proyecto Next.js
3. Haz clic en "Deploy"

Tambien puedes desplegar manualmente:

```bash
pnpm build
# Sube la carpeta .next a tu servidor
```

## Licencia

Este proyecto fue generado con [v0 by Vercel](https://v0.dev).
