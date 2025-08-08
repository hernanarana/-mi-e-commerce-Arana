// src/components/CartPage.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { createOrderAndDecrement } from '../services/api';
import { confirm, alertOK, alertError } from '../utils/alerts';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, clearCart } = useCart();
  const [confirmation, setConfirmation] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Total = precio * cantidad
  const total = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  const handleClear = async () => {
    const res = await confirm('¿Vaciar carrito?', 'Esta acción no se puede deshacer');
    if (res.isConfirmed) clearCart();
  };

  const handleCheckout = async () => {
    if (!cartItems.length) return;
    try {
      setSubmitting(true);
      const now = new Date();

      const orderData = {
        items: cartItems.map(it => ({
          docId: it.docId,               // ideal para descontar stock directo
          id: it.id,                     // fallback por campo numérico
          name: it.name,
          price: Number(it.price) || 0,
          quantity: Number(it.quantity) || 1,
        })),
        total,
        date: now.toISOString(),
      };

      const orderId = await createOrderAndDecrement(orderData);

      setConfirmation({
        id: orderId,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        total,
      });

      clearCart();
      alertOK('¡Compra realizada!', `ID de orden: ${orderId}`);
    } catch (e) {
      console.error('Checkout ERROR:', e);
      alertError('Error al procesar la compra', e?.message ?? 'Inténtalo más tarde');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="cart-page">
      <h2>Tu Carrito</h2>

      {confirmation ? (
        <div className="checkout-confirmation">
          <h3>¡Compra realizada!</h3>
          <p>ID de orden: {confirmation.id}</p>
          <p>Fecha: {confirmation.date}</p>
          <p>Hora: {confirmation.time}</p>
          <p>Total: ${confirmation.total.toFixed(2)}</p>
        </div>
      ) : cartItems.length === 0 ? (
        <p>No tienes productos en el carrito.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, idx) => (
              <li key={idx} className="cart-item">
                <img src={item.imageUrl} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    ${Number(item.price).toFixed(2)}
                    {item.quantity ? ` x ${item.quantity}` : null}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p>Total: <strong>${total.toFixed(2)}</strong></p>
            <button className="clear-button" onClick={handleClear} disabled={submitting}>
              Vaciar carrito
            </button>
            <button className="checkout-button" onClick={handleCheckout} disabled={submitting}>
              {submitting ? 'Procesando…' : 'Proceder al pago'}
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default CartPage;
