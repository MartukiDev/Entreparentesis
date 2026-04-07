# Auditoría técnica CMS/Admin - Entreparéntesis

Fecha: 25-03-2026

## 1) Estado inicial encontrado

### Rutas públicas detectadas
- `/`
- `/integrantes`
- `/festival`
- `/obras` + `/obras/[id]`
- `/galerias` + `/galerias/[id]`
- `/noticias` + `/noticias/[id]`
- `/radio`

### Rutas admin detectadas (antes)
- `/admin`
- `/admin/sections`
- `/admin/galleries`
- `/admin/radio`
- `/admin/login`

### Módulos CMS existentes (antes)
- Secciones genéricas (`site_sections`)
- Galerías (`galleries`, `gallery_images`)
- Radio (`radio_programs`)

### Contenido público hardcodeado (antes)
- Integrantes
- Festival (texto y carruseles)
- Obras (listado y detalle)
- Noticias (listado y detalle)
- Home (obras destacadas y obra actual)

### Base de datos detectada (antes)
- `profiles`, `site_sections`, `galleries`, `gallery_images`, `radio_programs`
- RLS y policies base para esas tablas
- Buckets: `site-assets`, `gallery-images`, `radio-assets`

## 2) Problemas detectados

1. **Cobertura CMS parcial**: no existía CRUD para Integrantes, Festival, Obras, Noticias, Inicio editorial completo.
2. **Desacople incompleto frontend/CMS**: varias secciones públicas no leían Supabase.
3. **Home incompleto**: destacadas y obra actual estaban hardcodeadas.
4. **Festival sin modelo de datos** para texto principal/carruseles por bloques.
5. **Obras sin estructura relacional** de imágenes por obra y slug administrable.
6. **Noticias sin slug CMS** ni CRUD.
7. **Upload sin optimización reusable**: no había downscaling/compresión sistemática.
8. **Sin mecanismo explícito de sincronización** para invalidar caché/rutas desde admin.

## 3) Estructura objetivo aplicada

### Módulos admin finales
- Inicio
- Integrantes
- Festival de Teatro
- Obras
- Galerías
- Noticias
- Radio
- Secciones técnicas (compatibilidad)

### Nuevas entidades de datos
- `members`
- `plays`
- `play_images`
- `home_featured_plays`
- `news`
- `festival_settings`
- `festival_items`

### Modelo de Inicio
- Hero, Misión, Visión y Obra actual en `site_sections`
- Obras destacadas en `home_featured_plays` (referencia a `plays`)

### Imagen y media
- Util común: `lib/cms/image.ts` (optimización)
- Util admin: `lib/cms/admin.ts` (slug + upload optimizado)
- Integrado en gestores admin

## 4) Cambios implementados

- Expansión de tipos en `lib/types.ts`.
- Extensión del acceso público en `lib/cms/public.ts` para miembros, obras, noticias, festival y home.
- Nuevos gestores admin:
  - `components/admin/home-manager.tsx`
  - `components/admin/members-manager.tsx`
  - `components/admin/festival-manager.tsx`
  - `components/admin/plays-manager.tsx`
  - `components/admin/news-manager.tsx`
- Nuevas rutas admin:
  - `/admin/inicio`
  - `/admin/integrantes`
  - `/admin/festival`
  - `/admin/obras`
  - `/admin/noticias`
- Navbar admin actualizado por secciones reales.
- Botón de sincronización real:
  - acción server: `app/admin/(panel)/actions.ts`
  - botón cliente: `components/admin/refresh-site-button.tsx`
- Public frontend conectado a CMS en:
  - Inicio (destacadas, obra actual)
  - Integrantes
  - Festival
  - Obras (listado y detalle CMS-first con fallback)
  - Noticias (listado y detalle slug)
  - Radio (botón dinámico “Ver enlace”)
- Refactor de uploads existentes (sections/galleries/radio) para compresión/downscaling.
- Extensión SQL en `supabase/schema.sql` con tablas nuevas + RLS + seeds mínimos.

## 5) Riesgos y deuda técnica restante

1. Existen bloques legacy hardcodeados en algunos archivos públicos como respaldo histórico.
2. `schema.sql` acumula definición inicial + extensión; recomendable separar en migraciones versionadas.
3. Falta mover contenido histórico completo de obras/festival al CMS para eliminar dependencias legacy.
4. Se recomienda validación de formularios con `zod` + `react-hook-form` en iteración posterior.

## 6) Validación funcional esperada

- CRUD completo por módulo indicado.
- Slugs administrables para obras/noticias.
- Carruseles de festival por bloques y orden.
- Imágenes optimizadas antes de upload.
- Sincronización manual desde panel para invalidar cache/rutas.

## 7) Prueba mínima sugerida

1. Ejecutar SQL actualizado en Supabase.
2. Iniciar sesión admin con rol `admin` en `profiles`.
3. Crear un integrante, una obra, una noticia y un ítem de festival.
4. Subir imágenes y verificar compresión por peso/dimensión.
5. Ir a páginas públicas y comprobar render dinámico.
6. Usar botón “Sincronizar cambios en la vista” y confirmar actualización.
