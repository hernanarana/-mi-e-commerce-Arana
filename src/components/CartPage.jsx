import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { createOrderAndDecrement as createOrder } from '../services/api';
import CheckoutForm from './CheckoutForm';
import './CartPage.css';

export default function CartPage() {
  const { cartItems, clearCart } = useCart();
  const [confirmation, setConfirmation] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const total = cartItems.reduce(
    (sum, it) => sum + (Number(it.price) || 0) * (Number(it.quantity) || 1),
    0
  );

  
  console.log('DEBUG -> items:', cartItems.length, 'confirmation:', confirmation);

  
  const handleCheckout = async (buyer) => {
    if (!cartItems.length) return;
    try {
      setSubmitting(true);
      const now = new Date();
      const order = {
        buyer, 
        items: cartItems.map(it => ({
          docId: it.docId,
          id: it.id,
          name: it.name,
          price: Number(it.price) || 0,
          quantity: Number(it.quantity) || 1,
          imageUrl: it.imageUrl,
        })),
        total,
        date: now.toISOString(),
      };

      const orderId = await createOrder(order);
      setConfirmation({
        id: orderId,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        total,
      });
      clearCart();
    } catch (e) {
      console.error('Checkout ERROR:', e);
      alert('Error al procesar la compra: ' + (e?.message ?? 'Inténtalo más tarde'));
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmation) {
    return (
      <section className="cart-page">
        <h2>Tu Carrito</h2>
        <div className="checkout-confirmation">
          <h3>¡Compra realizada!</h3>
          <p>ID de orden: {confirmation.id}</p>
          <p>Fecha: {confirmation.date}</p>
          <p>Hora: {confirmation.time}</p>
          <p>Total: ${confirmation.total.toFixed(2)}</p>
          <button className="clear-button" onClick={() => setConfirmation(null)}>
            Volver al formulario
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h2>Tu Carrito</h2>

      {cartItems.length === 0 ? (
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
            <button className="clear-button" onClick={clearCart} disabled={submitting}>
              Vaciar carrito
            </button>
          </div>

        
          <CheckoutForm onSubmit={handleCheckout} submitting={submitting} />
        </>
      )}
    </section>
  );
}
