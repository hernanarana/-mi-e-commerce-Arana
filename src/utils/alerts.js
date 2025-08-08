// src/utils/alerts.js
import Swal from 'sweetalert2';

// Toast cortito (arriba-centro)
export const toast = (title, icon = 'success') =>
  Swal.fire({ title, icon, timer: 1400, showConfirmButton: false });

// Diálogo OK
export const alertOK = (title, text = '') =>
  Swal.fire({ title, text, icon: 'success', confirmButtonText: 'OK' });

// Advertencia
export const alertWarn = (title, text = '') =>
  Swal.fire({ title, text, icon: 'warning', confirmButtonText: 'Entendido' });

// Error
export const alertError = (title, text = '') =>
  Swal.fire({ title, text, icon: 'error', confirmButtonText: 'Cerrar' });

// Confirmación (Sí / No)
export const confirm = (title, text = '') =>
  Swal.fire({
    title, text, icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No'
  });
