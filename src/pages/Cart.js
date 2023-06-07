import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { CartCard } from '../components/CartCard';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const { state, dispatch } = useContext(CartContext);

  const calculateTotal = (list) => list.reduce((sum, item) => sum + item, 0);

  useEffect(() => {
    dispatch({
      type: 'CHANGE_PRICE',
      payload: calculateTotal(
        state.cart.map(({ discountprice, qty }) => Number(discountprice) * qty),
      ),
    });
  }, []);
  return (
    <div style={{ marginTop: '100px', minHeight: '65vh', color: 'white' }}>
      <h1>MY CART({state.cart.length})</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ marginLeft: '50px', width: '700px' }}>
          {state.cart.map((product) => (
            <CartCard product={product} />
          ))}
        </div>
        {state.cart.length > 0 && (
          <div
            style={{
              border: '1px solid black',
              width: '300px',
              borderRadius: '10px',
              height: '300px',
              backgroundColor: 'black',
              color: 'white',
              boxShadow: '1px 1px 10px 1px black',
            }}
          >
            <h3>CART PRICE DETAILS</h3>
            <div style={{ margin: '0px 15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>
                  Price
                  {`(${calculateTotal(
                    state.cart.map(({ qty }) => qty),
                  )} Items)`}
                </p>
                <p>
                  Rs.{' '}
                  {calculateTotal(
                    state.cart.map(({ price, qty }) => Number(price) * qty),
                  )}
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>Discount</p>{' '}
                <p>
                  -Rs.
                  {calculateTotal(
                    state.cart.map(({ price, qty }) => Number(price) * qty),
                  ) -
                    calculateTotal(
                      state.cart.map(
                        ({ discountprice, qty }) => Number(discountprice) * qty,
                      ),
                    )}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: 'white',
                  padding: '1px',
                }}
              ></div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <p>Total Price</p>{' '}
                <p>
                  Rs.
                  {state.totalPrice}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: 'white',
                  padding: '1px',
                  marginBottom: '30px',
                }}
              ></div>
            </div>
            <Link
              className="button-shadow"
              style={{
                display: 'block',
                padding: '10px',
                backgroundColor: 'purple',
                color: 'white',
                textDecoration: 'none',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                margin: 'auto',
                width: '85%',
              }}
              to="/checkout"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
