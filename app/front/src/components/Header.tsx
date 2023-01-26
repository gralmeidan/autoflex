import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <nav className="flex justify-start gap-6 p-4">
        <Link to="/products">Produtos</Link>
        <Link to="/materials">Materiais</Link>
      </nav>
    </header>
  );
}
