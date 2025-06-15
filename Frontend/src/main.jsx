import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './css/album.css';
import './css/productdetails.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './auth.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)