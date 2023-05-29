import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Icon } from '@iconify/react';

export const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { state, dispatch, addToCart, addToFav, removeFromFav } =
    useContext(CartContext);
  const { _id, name, url, price, discountprice, categoryName } = product;
  const getToProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${productId}`);
      setProduct(response.data.product);
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getToProduct();
  }, []);
  return (
    <div style={{ margin: '150px', textAlign: 'center' }}>
      {isLoading ? (
        'Loading...'
      ) : isError ? (
        'Error'
      ) : (
        <div
          style={{
            display: 'flex',
            backgroundColor: 'black',
            color: 'white',
            width: '50%',
            boxShadow: '1px 1px 10px 1px black',
            margin: ' auto',
            padding: '20px',
          }}
        >
          <img
            src={url}
            style={{
              width: '300px',
              height: '300px',
              border: '1px solid black',
            }}
          ></img>
          <div style={{ textAlign: 'left', marginLeft: '10px' }}>
            <h2>{name}</h2>
            <p style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {categoryName?.toUpperCase()}
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
            <div>
              <button
                onClick={() =>
                  !state.cart.find((e) => e._id === _id) && addToCart(product)
                }
                style={{ cursor: 'pointer' }}
              >
                {state.cart.find((e) => e._id === _id) ? (
                  <Link to="/cart">Go to cart</Link>
                ) : (
                  <div>
                    <Icon
                      icon="ic:round-shopping-cart"
                      color="black"
                      width="20"
                      height="20"
                    />
                    Add to Cart
                  </div>
                )}
              </button>
            </div>
            <div>
              <button
                onClick={() =>
                  state.fav.find((e) => e._id === _id)
                    ? removeFromFav(_id)
                    : addToFav(product)
                }
                style={{
                  margin: 'auto',
                  padding: '5px',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                <Icon
                  icon="mdi:favorite"
                  color="gray"
                  width="20"
                  height="20"
                  className="add-fav"
                  style={{
                    color: state.fav.find((e) => e._id === _id) ? 'red' : '',
                  }}
                />
                {state.fav.find((e) => e._id === _id)
                  ? 'Remove From Wishlist'
                  : 'Add To Wishlist'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
