import React from 'react';
import Item from './Item';
import './ItemList.css';

const ItemList = ({ products = [] }) => {
  if (!products.length) return <p>No hay productos para mostrar.</p>;

  return (
    <section className="item-list">
      <h2 className="item-list-title">🩸 Nuestros Productos del Más Allá</h2>
      <div className="item-list-grid">
        {products.map((product) => (
          <Item key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ItemList;
