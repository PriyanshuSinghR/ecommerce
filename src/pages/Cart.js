import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { CartCard } from '../components/CartCard';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const { state } = useContext(CartContext);

  const calculateTotal = (list) => list.reduce((sum, item) => sum + item, 0);
  return (
    <div style={{ marginTop: '100px', minHeight: '65vh' }}>
      <h1>MY CART({state.cart.length})</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ marginLeft: '50px', width: '700px' }}>
          {state.cart.map((product) => (
            <CartCard product={product} />
          ))}
        </div>
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
          <div>
            <p>
              Price{' '}
              {`(${calculateTotal(state.cart.map(({ qty }) => qty))} Items)`}:{' '}
              Rs.{' '}
              {calculateTotal(
                state.cart.map(({ price, qty }) => Number(price) * qty),
              )}
            </p>
            <p>
              Discount: -Rs.{' '}
              {calculateTotal(
                state.cart.map(({ price, qty }) => Number(price) * qty),
              ) -
                calculateTotal(
                  state.cart.map(
                    ({ discountprice, qty }) => Number(discountprice) * qty,
                  ),
                )}
            </p>
            <p>
              Total Price: Rs.{' '}
              {calculateTotal(
                state.cart.map(
                  ({ discountprice, qty }) => Number(discountprice) * qty,
                ),
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
