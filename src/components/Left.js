import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export const Left = ({ login }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    password: '',
  });

  const { state, dispatch } = useContext(CartContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let name, value;
  const handleInputs = (el) => {
    name = el.target.name;
    value = el.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = user;
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await res.json();
    localStorage.setItem('tokenuser', data.encodedToken);

    console.log(res);
    console.log(state.user);
    if (res.status === 422 || !data) {
      window.alert('Invalid Registration');
      console.log('Invalid Registration');
    } else {
      window.alert('Registration Successfully');
      console.log('Registration Successfully');
      dispatch({
        type: 'LOGIN_STATUS',
      });
      dispatch({
        type: 'ADD_USER',
        payload: data.foundUser,
      });
      navigate('/');
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    localStorage.setItem('tokenuser', data.encodedToken);

    console.log(JSON.stringify({ email, password }));
    if (res.status === 404 || res.status === 401 || !data) {
      window.alert('Invalid Credential');
      console.log('Invalid Credential');
    } else {
      window.alert('Sign in Successfully');
      console.log('Sign in Successfully');
      dispatch({
        type: 'LOGIN_STATUS',
      });
      dispatch({
        type: 'ADD_USER',
        payload: data.foundUser,
      });

      navigate(location?.state?.from?.pathname);
    }
  };

  return (
    <section
      style={{
        width: '100%',
        backgroundColor: 'black',
        borderRadius:
          login === 'SIGN UP' ? '0rem 1rem 1rem 0rem' : '1rem 0rem 0rem 1rem',
        color: 'white',
      }}
    >
      <form
        method="POST"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
        }}
        onSubmit={login === 'SIGN UP' ? postData : loginUser}
      >
        <h2
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: '2.25rem',
            lineHeight: '2.5rem',
            fontWeight: '700',
            width: '90%',
          }}
        >
          {login}
        </h2>
        <p
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '0.25rem',
            marginBottom: '1rem',
            width: '90%',
          }}
        >
          How do i get started ? here
        </p>

        {login === 'Login' ? (
          <>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              name="email"
              id="email"
              style={{
                padding: '0.5rem',
                margin: '1rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '0.5rem',
                backgroundColor: '#EDE9FE',
                borderRadius: '0.375rem',
                width: '90%',
                border: 'none',
              }}
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              name="password"
              id="password"
              style={{
                padding: '0.5rem',
                margin: '0.5rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundColor: '#EDE9FE',
                borderRadius: '0.375rem',
                width: '90%',
              }}
            />
          </>
        ) : (
          <>
            <input
              type="text"
              required
              placeholder="FIRSTNAME"
              name="first name"
              id="first-name"
              value={user.firstName}
              onChange={handleInputs}
              style={{
                padding: '0.5rem',
                margin: '0.5rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundColor: '#EDE9FE',
                borderRadius: '0.375rem',
                width: '90%',
              }}
            />
            <input
              type="text"
              required
              placeholder="LASTNAME"
              name="last name"
              id="last-name"
              value={user.lastName}
              onChange={handleInputs}
              style={{
                padding: '0.5rem',
                margin: '0.5rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundColor: '#EDE9FE',
                borderRadius: '0.375rem',
                width: '90%',
              }}
            />
            <input
              type="email"
              required
              placeholder="Email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleInputs}
              style={{
                padding: '0.5rem',
                margin: '0.5rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundColor: '#EDE9FE',
                borderRadius: '0.375rem',
                width: '90%',
              }}
            />

            <input
              type="password"
              required
              placeholder="Password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleInputs}
              style={{
                padding: '0.5rem',
                margin: '0.5rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundColor: '#EDE9FE',
                borderRadius: '0.375rem',
                width: '90%',
              }}
            />
          </>
        )}

        {login === 'SIGN UP' ? (
          <></>
        ) : (
          <div
            style={{
              display: 'flex',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '0.5rem',
              marginBottom: '1.5rem',
              fontWeight: '600',
              justifyContent: 'space-between',
              width: '70%',
            }}
          >
            <Link
              to="/signup"
              style={{
                textDecoration: 'none',
                color: 'rgb(60 0 255)',
                margin: 'auto 0px',
              }}
            >
              Sign UP ?
            </Link>
            <p>Forgot password?</p>
          </div>
        )}

        <button
          type="submit"
          style={{
            padding: '0.5rem',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            marginTop: '2rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: '#8B5CF6',
            color: '#ffffff',
            fontSize: '1.25rem',
            lineHeight: '1.75rem',
            fontWeight: '600',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
          }}
          className="submit-button"
        >
          {login}
        </button>

        {login === 'Login' ? (
          <></>
        ) : (
          <p style={{ margin: '1rem', textAlign: 'center' }}>
            Already a user.{' '}
            <Link
              to="/signin"
              style={{
                textDecoration: 'none',
                color: 'rgb(60 0 255)',
                fontSize: '1.125rem',
                lineHeight: '1.75rem',
                fontWeight: '600',
              }}
            >
              SignIn ?{' '}
            </Link>
          </p>
        )}
      </form>
    </section>
  );
};

export default Left;
