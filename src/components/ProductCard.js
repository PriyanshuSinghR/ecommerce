import React, { useContext } from 'react';
import { Icon } from '@iconify/react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ProductCard = ({ product }) => {
  const history = useNavigate();
  const { _id, name, url, price, discountprice, categoryName } = product;
  const { state, dispatch, addToCart, addToFav, removeFromFav } =
    useContext(CartContext);

  return (
    <div
      className="card"
      style={{
        width: '300px',
        height: '530px',
        margin: '25px',
        boxShadow: '1px 1px 10px 5px black',
        textAlign: 'left',
        position: 'relative',
        backgroundColor: 'black',
        color: 'white',
      }}
      key={_id}
    >
      <Icon
        icon="mdi:favorite"
        color="gray"
        width="30"
        height="30"
        className="add-fav"
        style={{
          position: 'absolute',
          right: 0,
          border: '1px solid black',
          color: state.fav.find((e) => e._id === _id) ? 'red' : '',

          backgroundColor: 'black',
        }}
        onClick={() =>
          state.fav.find((e) => e._id === _id)
            ? removeFromFav(_id)
            : addToFav(product)
        }
      />
      <Link
        style={{ textDecoration: 'none', color: 'white' }}
        key={product._id}
        to={`/shop/${product._id}`}
      >
        <img
          src={url}
          alt={name}
          style={{
            display: 'box',
            width: '300px',
            height: '300px',
            backgroundColor: 'white',
          }}
        ></img>
        <div style={{ paddingLeft: '10px' }}>
          <p
            style={{ fontSize: '15px', fontWeight: 'bold', margin: '10px 0px' }}
          >
            {categoryName.toUpperCase()}
          </p>
          <h1 style={{ margin: '10px 0px' }}>{name}</h1>
          <div style={{ display: 'flex' }}>
            <p
              style={{
                marginRight: '20px',
                backgroundColor: '#4700d3',
                padding: '10px',
                borderRadius: '0px 15px 15px 0px',
              }}
            >
              {discountprice}
            </p>
            <p style={{ textDecoration: 'line-through', padding: '10px' }}>
              {price}
            </p>
          </div>
        </div>
      </Link>
      <div
        style={{
          position: 'absolute',
          left: '10px',
          bottom: '30px',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {state.cart.find((e) => e._id === _id) ? (
          <div style={{ marginBottom: '10px' }}>
            <Link
              to="/cart"
              style={{
                textDecoration: 'none',
                color: 'white',
                backgroundColor: 'purple',

                padding: '10px',
                borderRadius: '10px',
              }}
            >
              Go to cart
            </Link>
          </div>
        ) : (
          <button
            onClick={() =>
              !state.cart.find((e) => e._id === _id) && addToCart(product)
            }
            style={{
              border: 'none',
              cursor: 'pointer',
              color: 'white',
              backgroundColor: 'purple',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            <Icon
              icon="ic:round-shopping-cart"
              color="black"
              width="20"
              height="20"
            />
            <span style={{ margin: '1px' }}>Add to Cart</span>
          </button>
        )}
      </div>
    </div>
  );
};
