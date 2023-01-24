import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ItemsListPage from './pages/ItemsList';
import NewItemPage from './pages/newItem';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {['/materials', 'products'].map((path, i) => (
          <React.Fragment key={i}>
            <Route path={path} element={<ItemsListPage />} />
            <Route path={`${path}/new`} element={<NewItemPage />} />
          </React.Fragment>
        ))}
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
