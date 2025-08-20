# 🗨️ Chat Web App

## 📌 Objetivo del Proyecto

Desarrollar una aplicación web con chat integrado, donde los usuarios puedan:

- Realizar consultas sobre la empresa.
- Enviar archivos (imágenes, videos, documentos).
- Revisar historiales de conversaciones.
- Continuar chats previos.

La aplicación está construida con una arquitectura moderna basada en **Next.js 15** y un stack actualizado de herramientas asociadas.

---

## 🚀 Funcionalidades Principales

### 💬 Chat Interactivo

- Los usuarios pueden iniciar un nuevo chat y realizar consultas de forma libre.
- Las respuestas se generan a través de una **API externa simulada** (mockeada con **MSW**).
- Soporte para adjuntar archivos:
  - **Imágenes (JPG, PNG):** Se renderizan directamente en el chat.
  - **Videos (MP4) y documentos (PDF):** Se muestran como enlaces para descarga.

### 📜 Historial de Chats

- Visualización del historial completo de chats.
- Cada entrada del historial permite ver todo el contenido previo.
- Opción de **continuar una conversación** desde el punto en que se dejó.

### 🔎 Búsqueda en Historial

- Búsqueda de conversaciones dentro del historial.
- Resultados basados en coincidencias textuales con los mensajes.

### 🗑️ Gestión de Conversaciones

- Los usuarios pueden eliminar cualquier conversación del historial.

---

## ⚙️ Requisitos Técnicos

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [ShadCN UI](https://ui.shadcn.com/)
- **Cliente de datos:** [React Query](https://tanstack.com/query/latest)
- **Mock de APIs:** [MSW (Mock Service Worker)](https://mswjs.io/)
- **Gestor de paquetes:** [pnpm](https://pnpm.io/)
- **Variables de entorno:** Configuración de endpoints y opciones sensibles.
- **Hooks personalizados:** Para la lógica de negocio y manejo de datos.

---

## 📂 Estructura del Proyecto (sugerida)

```plaintext
├── app/           # Directorio principal de rutas y páginas (App Router de Next.js)
├── components/    # Componentes reutilizables de UI y formularios
├── hooks/         # Hooks personalizados (formularios, lógica de negocio, API)
├── lib/           # Utilidades: validaciones, mensajes de error, reglas, helpers
├── mocks/         # Mocks para APIs y datos de prueba (ej. MSW)
├── public/        # Archivos estáticos (imágenes, logos, fuentes, favicon, etc.)
```

## Decisiones técnicas

- Next.js en lugar de una aplicación de React simple (create-react-app)
- React Query (@tanstack/react-query) para la gestión de estados asíncronos.
- MSW para simular la API REST en el entorno de desarrollo.
- localStorage para la Persistencia de Mocks
- Tailwind CSS para la estilización y Shadcn UI como biblioteca de componentes.
- Hooks personalizados, como useChatActions, para encapsular la lógica de las mutaciones.

### ⚙️ Instalación

1.  Clona este repositorio en tu máquina:
    ```bash
    git clone https://github.com/randol514/reto-tecnico-vooxell
    ```
2.  Navega al directorio del proyecto:
    ```bash
    cd reto-tecnico-vooxell
    ```
3.  Instala las dependencias del proyecto:
    ```bash
    pnpm install
    ```

---

## 🔒 Variables de Entorno

Este proyecto utiliza variables de entorno para gestionar la URL de la API.

### Configuración

1.  Copia el archivo de ejemplo para crear tu archivo local de configuración:
    ```bash
    cp .env.example .env.local
    ```
2.  Abre el nuevo archivo `.env.local` y **sustituye el valor de ejemplo** con la URL de tu API local.

    ```
    # Archivo: .env.local

    NEXT_PUBLIC_API_URL=http://localhost:3000/api
    ```

**¡Importante!** El archivo `.env.example` solo contiene la variable sin valor. Tu archivo `.env.local` es el que debe tener la URL completa. Este último **es ignorado por Git** para proteger tu configuración local.

---

## 🏃 Ejecutando el Proyecto

- **Modo desarrollo:**
  ```bash
  pnpm dev
  ```
