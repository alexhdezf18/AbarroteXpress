# Instrucciones de Entorno - AbarroteXpress

## Justificación y Propósito del Negocio

AbarroteXpress no es solo un software, es una solución logística y social con los siguientes fundamentos:

- [cite_start]**El Problema:** Los clientes actuales buscan adquirir productos básicos sin desplazarse debido a la falta de tiempo o limitaciones de movilidad[cite: 2159]. [cite_start]Las plataformas de entrega existentes se centran en grandes empresas, dejando fuera a las micro y pequeñas empresas (tiendas de abarrotes)[cite: 2160].
- [cite_start]**La Finalidad (Visión):** Lograr la modernización del comercio de barrio, transformando la "tiendita de la esquina" en un competidor digital relevante[cite: 2283].
- [cite_start]**Estrategia Tecnológica:** Se utiliza WhatsApp para eliminar la barrera tecnológica tanto para el cliente como para el tendero, profesionalizando así el consumo local[cite: 2284].
- [cite_start]**Sostenibilidad:** El proyecto fortalece la economía de Chihuahua de manera sostenible y ecológica mediante el uso de vehículos sin emisiones (bicicletas y scooters)[cite: 2285, 2629].

## Contexto del Proyecto y Arquitectura

[cite_start]AbarroteXpress es un sistema de comercio de última milla legalmente constituido como una Sociedad Anónima (S.A.)[cite: 3572].

- **Frontend:** Angular v20 (Standalone Components).
- **Backend:** NestJS (Node.js 20/22), TypeORM.
- **Base de Datos:** PostgreSQL 15.
- **Infraestructura:** Docker Compose para backend/DB, Ngrok para túneles del webhook local.

## Estructura de Directorios

La orquestación está separada para evitar conflictos de compilación masiva:

- `/` (Raíz): Contiene `docker-compose.yml` y variables de entorno globales.
- `/abarrote-backend`: Contiene el código de NestJS, su propio `Dockerfile` y `.dockerignore`.
- `/abarrote-frontend`: Contiene el código de Angular.

## Reglas de Código (Backend - NestJS)

- **Regla de Negocio (Comisión):** Todo nuevo pedido (`pedidos.service.ts`) debe aplicar un aumento automático del 30% a la propiedad `totalCosto` por gastos de envío/logística, redondeado a dos decimales.
- **Seguridad Meta API:** El controlador `whatsapp.controller.ts` debe rechazar silenciosamente (Early Return) cualquier webhook entrante donde `tipoMensaje` sea diferente de `text` o `interactive` para evitar crashes por imágenes, audios o stickers.
- **Notificaciones a Repartidor:** Las llamadas salientes a Meta API para notificar el estado `en_camino` se realizan con la API nativa `fetch`, leyendo el token desde `process.env.META_TOKEN`.

## Reglas de Código (Frontend - Angular)

- **Standalone:** Prohibido usar `NgModule`. Todos los componentes deben ser `standalone: true`.
- **UI/Estilos:** El diseño depende exclusivamente de Tailwind CSS v3. Está estrictamente prohibido introducir directivas de Bootstrap o Material puro.
- **Paleta de Colores:** Utilizar las clases extendidas de Tailwind configuradas previamente (`marca-verde`, `marca-oscuro`) o paletas modernas (`slate`, `indigo`, `emerald` para estados).
- **Librerías Adicionales:** La generación de tickets se realiza mediante `jspdf` y `jspdf-autotable` directamente en el componente visual.

## Protocolos de Ejecución y Debugging Local

- **Base de Datos (Postgres):** Para evitar choques con instalaciones nativas de macOS, Docker expone el puerto al localhost en el **`5433`** (mapeado al 5432 internamente). El `.env` del backend debe apuntar siempre a `DB_PORT=5433`.
- **Comandos de Arranque:**
  - `docker-compose up -d` (Desde la raíz, levanta DB y Backend).
  - `docker-compose down --remove-orphans` (Limpieza estricta de puertos).
  - `ng serve` (Desde frontend).
- **Solución a caché de Tailwind:** Si Angular deja de procesar estilos nuevos, ejecutar `rm -rf .angular/cache` antes de reiniciar el servidor local.
