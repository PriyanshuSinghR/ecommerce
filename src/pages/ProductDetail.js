import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Icon } from '@iconify/react';

export const ProductDetail = () => {
  const { state, dispatch, addToCart, addToFav, removeFromFav, getToProduct } =
    useContext(CartContext);
  const { productId } = useParams();
  useEffect(() => {
    getToProduct(productId);
  }, []);

  return (
    <div style={{ margin: '150px', textAlign: 'center' }}>
      <div
        style={{
          display: 'flex',
          backgroundColor: 'black',
          color: 'white',
          width: '700px',
          boxShadow: '1px 1px 10px 1px black',
          margin: ' auto',
          padding: '20px',
        }}
      >
        <img
          src={state?.product?.url}
          style={{
            width: '300px',
            height: '300px',
            border: '1px solid black',
          }}
        ></img>
        <div style={{ textAlign: 'left', marginLeft: '10px' }}>
          <h2>{state?.product?.name}</h2>
          <p style={{ fontSize: '12px', fontWeight: 'bold' }}>
            {state?.product?.categoryName?.toUpperCase()}
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
              {state?.product?.discountprice}
            </p>
            <p style={{ textDecoration: 'line-through', padding: '10px' }}>
              {state?.product?.price}
            </p>
          </div>
          <div>
            <div
              style={{
                cursor: 'pointer',
                margin: '10px 20px',
              }}
            >
              {state.cart.find((e) => e._id === state?.product?._id) ? (
                <div style={{ marginBottom: '10px' }}>
                  <Link
                    to="/cart"
                    style={{
                      textDecoration: 'none',
                      display: 'block',
                      color: 'white',
                      backgroundColor: 'purple',
                      width: '280px',
                      padding: '10px',
                      borderRadius: '10px',
                      textAlign: 'center',
                    }}
                    className="button-shadow"
                  >
                    Go to cart
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(state?.product)}
                  className="button-shadow"
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    color: 'white',
                    backgroundColor: 'purple',
                    padding: '10px',
                    borderRadius: '10px',
                    width: '300px',
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
          <div>
            <button
              onClick={() =>
                state.fav.find((e) => e._id === state?.product?._id)
                  ? removeFromFav(state?.product?._id)
                  : addToFav(state.product)
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
              }}
            >
              <Icon
                icon="mdi:favorite"
                color="gray"
                width="20"
                height="20"
                className="show-fav"
                style={{
                  color: state.fav.find((e) => e._id === state?.product?._id)
                    ? 'red'
                    : '',
                }}
              />
              {state.fav.find((e) => e._id === state?.product?._id)
                ? 'Remove From Wishlist'
                : 'Add To Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
