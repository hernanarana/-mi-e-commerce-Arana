import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" aria-label="Pie de página">
      <span>Hecho por</span>
      <span className="footer-icon" role="img" aria-label="zombie">🧟</span>
      <span>Hernan Arana</span>
    </footer>
  );
}
