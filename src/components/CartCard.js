import axios from 'axios';
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

export const CartCard = ({ product }) => {
  const { _id, name, url, price, discountprice, categoryName, qty } = product;

  const { state, dispatch, removeFromFav, addToFav } = useContext(CartContext);
  const removeFromCart = async (_id) => {
    const encodedToken = localStorage.getItem('tokenuser');
    try {
      const response = await axios.delete(`/api/user/cart/${_id}`, {
        headers: {
          authorization: encodedToken,
        },
      });
      dispatch({
        type: 'UPDATE_CART',
        payload: response.data.cart,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const countFromCart = async (_id, action) => {
    const encodedToken = localStorage.getItem('tokenuser');
    try {
      const response = await axios.post(
        `/api/user/cart/${_id}`,
        {
          action: {
            type: action,
          },
        },
        {
          headers: {
            authorization: encodedToken,
          },
        },
      );
      dispatch({
        type: 'UPDATE_CART',
        payload: response.data.cart,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ position: 'relative' }} key={_id}>
      <Link
        style={{
          textDecoration: 'none',
          display: 'flex',
          margin: '20px',
          padding: '10px',
          borderRadius: '10px',
          backgroundColor: 'black',
          color: 'white',
          boxShadow: '1px 1px 10px 1px black',
        }}
        key={product._id}
        to={`/shop/${product._id}`}
      >
        <img
          src={url}
          alt={name}
          style={{ width: '230px', height: '230px' }}
        ></img>
        <div style={{ textAlign: 'left', marginLeft: '20px' }}>
          <h3 style={{ margin: '10px 0px' }}>{name}</h3>
          <p
            style={{ margin: '10px 0px', fontSize: '12px', fontWeight: 'bold' }}
          >
            {categoryName.toUpperCase()}
          </p>
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
          bottom: '0px',
          left: '280px',
          right: 0,
        }}
      >
        <div
          style={{
            color: 'white',
            width: '400px',

            display: 'flex',
            height: '25px',
          }}
        >
          <span style={{ marginRight: '10px' }}>Quantity:</span>
          <Icon
            icon="teenyicons:minus-circle-solid"
            color="white"
            width="30"
            height="30"
            onClick={() =>
              qty > 1 ? countFromCart(_id, 'decrement') : removeFromCart(_id)
            }
            className="link"
          />

          <p style={{ width: '25px', margin: '0px', padding: '5px' }}>{qty}</p>

          <Icon
            icon="teenyicons:plus-circle-solid"
            color="white"
            width="30"
            height="30"
            onClick={() => countFromCart(_id, 'increment')}
            className="link"
          />
        </div>
        <button
          onClick={() =>
            state.fav.find((e) => e._id === _id)
              ? removeFromFav(_id)
              : addToFav(product)
          }
          className="button-fav button-shadow"
          style={{
            margin: '10px 20px',
            width: '300px',
            cursor: 'pointer',
            zIndex: 10,
            border: 'none',
            color: 'white',
            backgroundColor: 'purple',
            padding: '10px',
            borderRadius: '10px',
            marginTop: '30px',
            marginRight: '50px',
          }}
        >
          <Icon
            icon="mdi:favorite"
            color="gray"
            width="20"
            height="20"
            className="show-fav"
            style={{
              color: state.fav.find((e) => e._id === _id) ? 'red' : '',
            }}
          />
          {state.fav.find((e) => e._id === _id)
            ? 'Remove From Wishlist'
            : 'Add To Wishlist'}
        </button>
      </div>

      <Icon
        icon="ic:baseline-delete"
        color="white"
        width="30"
        height="30"
        onClick={() => removeFromCart(_id)}
        style={{
          cursor: 'pointer',
          position: 'absolute',
          top: '10px',
          right: '30px',
        }}
        className="link"
      />
    </div>
  );
};
