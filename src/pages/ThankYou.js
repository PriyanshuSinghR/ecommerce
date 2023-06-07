import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export const ThankYou = () => {
  const { state } = useContext(CartContext);
  return (
    <div style={{ marginTop: '100px', minHeight: '65vh' }}>
      <h1>Thank You</h1>
      <h3>Your order is Successfully Placed</h3>
      <div
        style={{
          border: '1px solid black',
          width: '300px',
          borderRadius: '10px',
          height: '100%',
          backgroundColor: 'black',
          color: 'white',
          boxShadow: '1px 1px 10px 1px black',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        <p>
          <b>Payment Id: </b>XYZ
        </p>
        <p>
          <b>Total Amount: </b>
          Rs. {state.totalPrice}
        </p>
        <p>Order will be delivered in 10 days</p>
        <p>
          <b>Order Address: </b>
          <p>{`${state.address.address} ${state.address.city} ${state.address.state} Pin code: ${state.address.zip}`}</p>
        </p>
        <p>
          <b>Mobile: </b>
          {state.address.phone}
        </p>
      </div>
    </div>
  );
};
