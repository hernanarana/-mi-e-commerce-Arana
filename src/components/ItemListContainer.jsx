import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';      
import ItemList from './ItemList';
import './ItemListContainer.css';

export default function ItemListContainer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const fetched = await getProducts();
        console.log('[ItemListContainer] products:', fetched); 
        if (!alive) return;
        setProducts(Array.isArray(fetched) ? fetched : []);    
      } catch (err) {
        console.error('[ItemListContainer] ERROR:', err);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; };
  }, []);

  if (loading) return <p>Cargando productos…</p>;
  if (!products.length) return <p>No hay productos para mostrar.</p>;

  return (
    <section className="item-list-container">
      <ItemList products={products} />
    </section>
  );
}
