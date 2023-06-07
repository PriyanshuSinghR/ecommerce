import setupLocatorUI from '@locator/runtime';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartContext, CartProvider } from './context/CartContext';
import './index.css';
import App from './App';
import { makeServer } from './server';
export { CartContext };

const container = document.getElementById('root');
const root = createRoot(container);
if (process.env.NODE_ENV === 'development') {
  setupLocatorUI();
}

// Call make Server
makeServer();

root.render(
  <StrictMode>
    <Router>
      <CartProvider>
        <App />
      </CartProvider>
    </Router>
  </StrictMode>,
);
