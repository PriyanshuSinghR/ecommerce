import React, { useContext } from 'react';
import image from '../img/home1.jpeg';
import heading from '../img/heading.png';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

export const Home = () => {
  const { state, dispatch } = useContext(CartContext);
  return (
    <div style={{ marginTop: '80px' }}>
      <div
        style={{
          position: 'absolute',
          textAlign: 'left',
          left: '300px',
          top: '120px',
          color: 'white',
        }}
      >
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
          Welcome To Sportifest
        </p>
        <p style={{ fontSize: '48px', fontWeight: 'bold' }}>
          Give you Sport A Plus Point
        </p>
        <p style={{ fontSize: '48px', fontWeight: 'bold' }}>
          Which Comfort Your Game
        </p>
        <button
          className="shop-now"
          style={{
            border: 'none',
            borderRadius: '10px',
            padding: '10px',
            backgroundColor: 'purple',
            cursor: 'pointer',
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
          <Link
            to="/shop"
            style={{
              textDecoration: 'none',
              color: 'white',
            }}
          >
            BUY NOW
          </Link>
        </button>
      </div>
      <img src={image} style={{ width: '100%', height: '90vh' }}></img>
      <div style={{ margin: '50px 0px' }}>
        <div style={{ marginBottom: '50px' }}>
          <img src={heading} style={{ width: '50%', height: '100px' }}></img>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          {state.allCategories.map((category) => (
            <Link
              className="card"
              style={{
                boxShadow: '1px 1px 10px 5px black',
                textDecoration: 'none',
                backgroundColor: 'black',
                color: 'white',
              }}
              to="/shop"
              onClick={() => {
                dispatch({
                  type: 'FILTER_BY_TAG',
                  payload: [category.categoryName],
                });
              }}
            >
              <img
                src={category.url}
                style={{ height: '300px', width: '300px' }}
              ></img>
              <p>{category.categoryName.toUpperCase()}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
