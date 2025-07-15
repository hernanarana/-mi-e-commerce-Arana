
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductos, getProductosPorCategoria } from '../services/api';
import ItemList from './ItemList';

export default function ItemListContainer() {
  const { id: categoriaId } = useParams();       
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const promesa = categoriaId
      ? getProductosPorCategoria(categoriaId)
      : getProductos();

    promesa
      .then(prod => setItems(prod))
      .finally(() => setLoading(false));
  }, [categoriaId]);

  if (loading) return <p>Cargando productos…</p>;
  if (items.length === 0) return <p>No hay productos en esta categoría.</p>;

  return <ItemList items={items} />;
}


