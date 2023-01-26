import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ItemsListPage from './pages/ItemsList';
import NewItemPage from './pages/newItem';
import UpdateItemPage from './pages/updateItem';
import { ItemsContextProvider } from './context/ItemsContextProvider';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <ItemsContextProvider>
        <Header />
        <Routes>
          {['/materials', 'products'].map((path, i) => (
            <React.Fragment key={i}>
              <Route path={path} element={<ItemsListPage />} />
              <Route path={`${path}/new`} element={<NewItemPage />} />
              <Route path={`${path}/edit/:id`} element={<UpdateItemPage />} />
            </React.Fragment>
          ))}
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </ItemsContextProvider>
    </BrowserRouter>
  );
}

export default App;
