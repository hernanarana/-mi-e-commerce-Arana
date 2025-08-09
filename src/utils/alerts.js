
import Swal from 'sweetalert2';


export const toast = (title, icon = 'success') =>
  Swal.fire({ title, icon, timer: 1400, showConfirmButton: false });


export const alertOK = (title, text = '') =>
  Swal.fire({ title, text, icon: 'success', confirmButtonText: 'OK' });


export const alertWarn = (title, text = '') =>
  Swal.fire({ title, text, icon: 'warning', confirmButtonText: 'Entendido' });


export const alertError = (title, text = '') =>
  Swal.fire({ title, text, icon: 'error', confirmButtonText: 'Cerrar' });


export const confirm = (title, text = '') =>
  Swal.fire({
    title, text, icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No'
  });
