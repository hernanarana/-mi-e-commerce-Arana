import React, { useState } from 'react';
import './CheckoutForm.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const onlyDigits = /^\d+$/;

export default function CheckoutForm({ onSubmit, submitting }) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    email2: '',
    phone: '',
    address: '',
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const validate = (v) => {
    const e = {};
    if (!v.name.trim()) e.name = 'El nombre es obligatorio.';
    else if (v.name.trim().length < 2) e.name = 'Mínimo 2 caracteres.';

    if (!v.email.trim()) e.email = 'El email es obligatorio.';
    else if (!emailRegex.test(v.email.trim())) e.email = 'Formato de email inválido.';

    if (!v.email2.trim()) e.email2 = 'Repetí el email.';
    else if (v.email.trim() !== v.email2.trim()) e.email2 = 'Los emails no coinciden.';

    if (!v.phone.trim()) e.phone = 'El teléfono es obligatorio.';
    else if (!onlyDigits.test(v.phone.trim())) e.phone = 'Solo números.';
    else if (v.phone.trim().length < 8) e.phone = 'Mínimo 8 dígitos.';

    if (!v.address.trim()) e.address = 'La dirección es obligatoria.';
    else if (v.address.trim().length < 5) e.address = 'Mínimo 5 caracteres.';

    return e;
  };

  // ✅ Validación en vivo: marca como "tocado" y recalcula errores al tipear
  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(next));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, email2: true, phone: true, address: true });
    if (Object.keys(errs).length) return;

    onSubmit({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      address: values.address.trim(),
    });
  };

  const err = (k) => touched[k] && errors[k];

  return (
    <form className="checkout-form" onSubmit={handleSubmit} noValidate>
      <h3>Datos del comprador</h3>

      <div className="field">
        <label htmlFor="name">Nombre y apellido</label>
        <input
          id="name" name="name" type="text" required
          value={values.name} onChange={handleChange} onBlur={handleBlur}
          aria-invalid={!!err('name')} aria-describedby="name-err"
          placeholder="Ej: Ana Pérez"
        />
        {err('name') && <small id="name-err" className="error">Error: {errors.name}</small>}
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email" name="email" type="email" required
          value={values.email} onChange={handleChange} onBlur={handleBlur}
          aria-invalid={!!err('email')} aria-describedby="email-err"
          placeholder="tu@correo.com"
        />
        {err('email') && <small id="email-err" className="error">Error: {errors.email}</small>}
      </div>

      <div className="field">
        <label htmlFor="email2">Repetir email</label>
        <input
          id="email2" name="email2" type="email" required
          value={values.email2} onChange={handleChange} onBlur={handleBlur}
          aria-invalid={!!err('email2')} aria-describedby="email2-err"
          placeholder="tu@correo.com"
        />
        {err('email2') && <small id="email2-err" className="error">Error: {errors.email2}</small>}
      </div>

      <div className="field">
        <label htmlFor="phone">Teléfono</label>
        <input
          id="phone" name="phone" inputMode="numeric" required
          value={values.phone} onChange={handleChange} onBlur={handleBlur}
          aria-invalid={!!err('phone')} aria-describedby="phone-err"
          placeholder="Ej: 1122334455"
        />
        {err('phone') && <small id="phone-err" className="error">Error: {errors.phone}</small>}
      </div>

      <div className="field">
        <label htmlFor="address">Dirección</label>
        <input
          id="address" name="address" type="text" required
          value={values.address} onChange={handleChange} onBlur={handleBlur}
          aria-invalid={!!err('address')} aria-describedby="address-err"
          placeholder="Calle 1234, Ciudad"
        />
        {err('address') && <small id="address-err" className="error">Error: {errors.address}</small>}
      </div>

      <button className="submit" type="submit" disabled={submitting}>
        {submitting ? 'Procesando…' : 'Confirmar compra'}
      </button>
    </form>
  );
}
