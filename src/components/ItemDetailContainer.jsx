import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducto } from '../services/api';
import ItemDetail from './ItemDetail';
import { useCart } from '../context/CartContext';
import ItemCount from './ItemCount';
import './ItemDetailContainer.css'; 

export default function ItemDetailContainer() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProducto(id)
      .then(p => setProduct(p))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando producto…</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  const handleAdd = (quantity) => {
    const stock = product.stock ?? 10;
    if (quantity > stock) return; 
    addToCart({ ...product, quantity });
    setAdded(true);
  };

  return (
    <div className="item-detail-container">
      <ItemDetail item={product} />
      <p className="detail-price">Precio: ${Number(product.price).toFixed(2)}</p>

      {added ? (
        <Link to="/carrito" className="detail-link">Ir al carrito</Link>
      ) : (
        <ItemCount stock={product.stock ?? 10} initial={1} onAdd={handleAdd} />
      )}
    </div>
  );
}
