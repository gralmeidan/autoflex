import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ItemsListPage from './pages/ItemsList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {['/materials', 'products'].map((path, i) => (
          <Route path={path} element={<ItemsListPage />} key={i} />
        ))}
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
