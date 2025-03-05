// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Asegura que importamos BrowserRouter
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* 🔹 Ahora toda la app tiene acceso a React Router */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

