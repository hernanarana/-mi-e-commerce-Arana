# Mi E-commerce (React + Firebase)

Tienda online hecha en React con catálogo de productos, detalle, carrito y checkout. Los productos y las órdenes de compra se guardan en Firebase Firestore, y al confirmar una compra se actualiza el stock.

> Demo: _[link pendiente de publicación]_

## Qué hace

- **Catálogo** con listado de productos y navegación por rutas.
- **Detalle de producto** con selector de cantidad.
- **Carrito** global con Context API: agregar, quitar y ver el total, con un ícono en la barra de navegación.
- **Checkout** con formulario y validaciones.
- **Órdenes** guardadas en Firestore, con actualización del stock en la misma operación.
- **Alertas** amigables con SweetAlert2 y página 404.

## Tecnologías

| Área | Herramientas |
| --- | --- |
| Frontend | React, Vite, React Router, PropTypes |
| Estado | Context API |
| Base de datos | Firebase Firestore |
| Interfaz | SweetAlert2 |

## Cómo correrlo

1. Instalá las dependencias:

   ```bash
   npm install
   ```

2. Copiá `.env.example` como `.env` y completá los datos de tu proyecto de Firebase (Configuración del proyecto → Tus apps → Configuración del SDK).
3. Iniciá el proyecto:

   ```bash
   npm run dev
   ```

Para publicarlo (Vercel o Netlify), cargá las mismas variables `VITE_FIREBASE_*` en la configuración del sitio.

## Estructura

```
src/
├── components/   # NavBar, ItemList, ItemDetail, CartPage, CheckoutForm…
├── context/      # CartContext
├── services/     # acceso a Firestore (productos y órdenes)
└── utils/        # alertas
```

---

Desarrollado por **Hernán Arana** · [LuSan PRO](#) — SAP HANA · Data Science · Web · Marketing digital
