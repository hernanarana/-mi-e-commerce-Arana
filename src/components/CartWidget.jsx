import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartWidget.css';

const CartWidget = () => {
  const { cartItems } = useCart();
  const totalUnits = cartItems.reduce((sum, it) => sum + (it.quantity ?? 1), 0);

  return (
    <Link to="/carrito" className="cart-widget" aria-label={`Carrito (${totalUnits})`}>
      🛒
      {totalUnits > 0 && <span className="cart-badge">{totalUnits}</span>}
    </Link>
  );
};

export default CartWidget;
