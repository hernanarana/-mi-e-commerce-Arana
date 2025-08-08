import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <section style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>👻 Página no encontrada</h2>
    <p>La oscuridad te trajo a un lugar desconocido…</p>
    <Link to="/">Volver al inicio</Link>
  </section>
);

export default NotFound;
