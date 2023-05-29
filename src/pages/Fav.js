import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { CartContext } from '../context/CartContext';

export const Fav = () => {
  const { state } = useContext(CartContext);
  return (
    <div style={{ minHeight: '65vh', marginTop: '100px' }}>
      <h1>MY WISHLIST</h1>
      {state.fav.length === 0 && <h2>Your Wishlist Is Empty ! ☹️</h2>}
      <div className="cards" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {state.fav.map((product) => (
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            key={product._id}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};
