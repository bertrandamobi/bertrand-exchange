import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './pages/App.jsx';
import { store } from './store/store.js';
import './styles/app.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}><App /></Provider>
);
