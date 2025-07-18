import { Link } from 'react-router-dom';

export default function Item({ item }) {
  return (
    <div
      className="item-card"
      style={{ border: '1px solid #444', borderRadius: '8px', overflow: 'hidden' }}
    >
      <Link
        to={`/producto/${item.id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <img
          src={item.imagen}
          alt={item.nombre}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
        <div style={{ padding: '0.5rem' }}>
          <h3 style={{ margin: '0.5rem 0' }}>{item.nombre}</h3>
          <p style={{ margin: 0 }}>${item.precio}</p>
        </div>
      </Link>
    </div>
  );
}
