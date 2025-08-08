import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ItemCount.css';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial);

  const handleDecrease = () => {
    if (count > 1) setCount(prev => prev - 1);
  };
  const handleIncrease = () => {
    if (count < stock) setCount(prev => prev + 1);
  };
  const handleAdd = () => {
    onAdd(count);
  };

  return (
    <div className="item-count">
      <button onClick={handleDecrease} disabled={count <= 1}>-</button>
      <span>{count}</span>
      <button onClick={handleIncrease} disabled={count >= stock}>+</button>
      <button onClick={handleAdd} disabled={stock === 0}>
        Agregar al carrito
      </button>
    </div>
  );
};

ItemCount.propTypes = {
  stock: PropTypes.number.isRequired,
  initial: PropTypes.number,
  onAdd: PropTypes.func.isRequired,
};

export default ItemCount;