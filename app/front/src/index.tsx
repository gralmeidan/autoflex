import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/pico.min.css';
import './styles/material-symbols.css';
import App from './App';

const root = ReactDOM.createRoot(
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
