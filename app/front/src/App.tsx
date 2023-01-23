import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListPage from './pages/list';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <ListPage></ListPage>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
