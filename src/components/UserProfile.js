import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const UserProfile = () => {
  const history = useNavigate();
  const { state, dispatch } = useContext(CartContext);
  console.log(state.user);
  const { firstName, lastName, email } = state.user;
  const logoutHandler = () => {
    localStorage.removeItem('tokenuser');
    dispatch({
      type: 'REMOVE_USER',
    });
    dispatch({
      type: 'LOGIN_STATUS',
    });
    dispatch({
      type: 'UPDATE_CART',
      payload: [],
    });
    dispatch({
      type: 'UPDATE_FAV',
      payload: [],
    });
    history('/');
  };

  console.log(state.user);

  return (
    <div style={{ margin: '150px', minHeight: '40vh' }}>
      <h1>UserProfile</h1>
      <div
        style={{
          boxShadow: '1px 1px 10px 1px black',
          width: '300px',
          height: '150px',
          margin: '20px auto',
          padding: '20px',
          backgroundColor: 'black',
          color: 'white',
        }}
      >
        <p>First Name: {firstName}</p>
        <p>Last Name: {lastName}</p>
        <p>Email: {email}</p>
      </div>
      <div style={{}}>
        <button
          onClick={logoutHandler}
          style={{
            padding: '10px',
            backgroundColor: 'purple',
            border: 'none',
            borderRadius: '5px',
          }}
          className="submit-button"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
