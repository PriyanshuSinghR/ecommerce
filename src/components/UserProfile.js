import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const UserProfile = () => {
  const history = useNavigate();
  const { state, dispatch } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem('user'));
  const { firstName, lastName, email } = user;
  const logoutHandler = () => {
    localStorage.removeItem('tokenuser');
    localStorage.removeItem('user');
    toast.success('Logout Successfully');

    dispatch({
      type: 'LOGIN_STATUS',
      payload: false,
    });
    dispatch({
      type: 'UPDATE_CART',
      payload: [],
    });
    dispatch({
      type: 'UPDATE_FAV',
      payload: [],
    });
    dispatch({
      type: 'ADD_ADDRESS',
      payload: {},
    });
    dispatch({
      type: 'ADD_ALL_ADDRESSES',
      payload: [],
    });
    dispatch({
      type: 'CHANGE_PRICE',
      payload: 0,
    });
    history('/');
  };

  console.log(state.user);

  return (
    <div style={{ margin: '150px', minHeight: '40vh', color: 'white' }}>
      <h1>UserProfile</h1>
      <div
        style={{
          boxShadow: '1px 1px 10px 1px black',
          width: '300px',
          height: '150px',
          margin: '20px auto',
          padding: '20px',
          backgroundColor: 'black',
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
