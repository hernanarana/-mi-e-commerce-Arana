import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Item.css';

export default function Item({ product }) {
  const { addToCart } = useCart();
  if (!product) return null;

  const {
    id,           
    docId,         
    name,
    description,
    price,
    imageUrl,
    stock = 0,
  } = product;

  const displayPrice =
    price != null && !Number.isNaN(Number(price))
      ? Number(price).toFixed(2)
      : '0.00';

  const lowStock = Number(stock) > 0 && Number(stock) <= 3;
  const outOfStock = Number(stock) === 0;

  const handleAdd = () => {
   
    addToCart({ ...product, docId, quantity: 1 });
  };

  return (
    <article className="item-card">
      
      {outOfStock && <span className="badge badge-out">Sin stock</span>}
      {lowStock && !outOfStock && (
        <span className="badge badge-low">¡Últimas unidades!</span>
      )}

      <Link to={`/productos/${id}`} className="card-image-wrapper" aria-label={`Ver ${name}`}>
        <img
          src={imageUrl || '/img/placeholder.jpg'}
          alt={name || 'Producto'}
          className="card-image"
          loading="lazy"
        />
      </Link>

      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        {description && <p className="card-description">{description}</p>}

        <div className="card-bottom">
          <p className="card-price">${displayPrice}</p>

          <div className="card-actions">
            <Link to={`/productos/${id}`} className="secondary-link">
              Ver detalle
            </Link>
            <button
              className="card-button"
              onClick={handleAdd}
              disabled={outOfStock}
              title={outOfStock ? 'Sin stock' : 'Añadir al carrito'}
            >
              Añadir al carrito
            </button>
          </div>
        </div>

        
        <small className="stock-hint">
          {outOfStock ? 'Sin stock' : `Stock: ${stock}`}
        </small>
      </div>
    </article>
  );
}
