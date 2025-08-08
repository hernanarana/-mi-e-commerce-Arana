import React from 'react';
import './ItemDetail.css';

const ItemDetail = ({ item }) => {
  return (
    <article className="item-detail">
      <img src={item.imageUrl || '/img/placeholder.jpg'} alt={item.name} />
      <div>
        <h2>{item.name}</h2>
        <p>{item.description}</p>
      </div>
    </article>
  );
};

export default ItemDetail;
