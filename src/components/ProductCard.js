import React, { useContext } from 'react';
import { Icon } from '@iconify/react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const ProductCard = ({ product }) => {
  const history = useNavigate();
  const { _id, name, url, price, discountprice, categoryName, rating } =
    product;
  const { state, dispatch, addToCart, addToFav, removeFromFav } =
    useContext(CartContext);

  return (
    <div
      className="card"
      style={{
        width: '300px',
        height: '520px',
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p
              style={{
                fontSize: '15px',
                fontWeight: 'bold',
                margin: '10px 0px',
              }}
            >
              {categoryName.toUpperCase()}
            </p>
            <p
              style={{
                fontSize: '12px',
                fontWeight: 'bold',
                margin: '5px',
                borderRadius: '20px',
                backgroundColor: 'purple',
                padding: '5px',
              }}
            >
              <span style={{ marginRight: '5px' }}>{rating}</span>
              <Icon icon="mdi:star" color="white" width="12" height="12" />
            </p>
          </div>
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
          bottom: '15px',
          cursor: 'pointer',
          textAlign: 'center',
          margin: '0px 15px',
        }}
      >
        {state.cart.find((e) => e._id === _id) ? (
          <Link
            to="/cart"
            style={{
              display: 'block',
              textDecoration: 'none',
              color: 'white',
              backgroundColor: 'purple',
              width: '250px',
              padding: '10px',
              borderRadius: '10px',
              marginTop: '10px',
            }}
            className="button-shadow"
          >
            Go to cart
          </Link>
        ) : (
          <button
            onClick={() => {
              !state.cart.find((e) => e._id === _id) && addToCart(product);
            }}
            className="button-shadow"
            style={{
              border: 'none',
              cursor: 'pointer',
              color: 'white',
              backgroundColor: 'purple',
              padding: '10px',
              borderRadius: '10px',
              width: '250px',
              margin: '0 8px',
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
