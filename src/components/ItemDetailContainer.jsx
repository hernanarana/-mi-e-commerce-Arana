import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducto } from '../services/api.js';
import ItemDetail from './ItemDetail';

export default function ItemDetailContainer() {
  const { productoId } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    getProducto(productoId)
      .then(p => setProducto(p))
      .finally(() => setLoading(false));
  }, [productoId]);

  if (loading) return <p>Cargando producto…</p>;
  if (!producto) return <p>Producto no encontrado.</p>;

  return <ItemDetail {...producto} />;
}
