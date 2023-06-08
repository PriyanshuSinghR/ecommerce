import React, { useContext, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { CartContext } from '../context/CartContext';

const NavigationBar = () => {
  const { state, dispatch } = useContext(CartContext);
  const history = useNavigate();
  useEffect(() => {
    if (state.searchInput.length > 0) {
      dispatch({
        type: 'UPDATE_PRODUCTS',
        payload: [...state.allProducts].filter((item) =>
          item.name.toLowerCase().includes(state.searchInput.toLowerCase()),
        ),
      });
      history('./shop');
    } else {
      dispatch({
        type: 'UPDATE_PRODUCTS',
        payload: [...state.allProducts],
      });
    }
  }, [state.searchInput]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: 'auto',
        padding: '0px 20px',
      }}
    >
      <Link
        to="/"
        style={{ textDecoration: 'none' }}
        // onClick={() =>
        //   dispatch({
        //     type: 'CHANGE_LOADING',
        //     payload: true,
        //   })
        // }
      >
        <h1 style={{ color: 'white' }}>Sportifest</h1>
      </Link>
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          backgroundColor: 'white',
          borderRadius: '10px',
          width: '400px',
        }}
      >
        <Icon
          icon="material-symbols:search"
          width="30"
          height="30"
          style={{ margin: '5px', color: '#4700d3' }}
        />
        <input
          value={state.searchInput}
          onChange={(event) =>
            dispatch({ type: 'SEARCH_PRODUCTS', payload: event.target.value })
          }
          style={{
            width: '100%',
            border: 'none',
            borderRadius: '0px 10px 10px 0px',
            fontSize: '18px',
            color: '#4700d3',
          }}
        />{' '}
      </div>

      <nav style={{ margin: ' auto 0px' }}>
        <NavLink
          to="/shop"
          className="link"
          style={{
            color: 'white',
            textDecoration: 'none',
            marginRight: '20px',
          }}
          // onClick={() =>
          //   dispatch({
          //     type: 'CHANGE_LOADING',
          //     payload: true,
          //   })
          // }
        >
          <Icon
            icon="material-symbols:local-mall-sharp"
            color="white"
            width="30"
            height="30"
          />
        </NavLink>
        <NavLink
          to="/fav"
          className="link"
          style={{
            color: 'white',
            textDecoration: 'none',
            marginRight: '20px',
          }}
          // onClick={() =>
          //   dispatch({
          //     type: 'CHANGE_LOADING',
          //     payload: true,
          //   })
          // }
        >
          <Icon icon="mdi:favorite" color="white" width="30" height="30" />
        </NavLink>
        <NavLink
          to="/cart"
          className="link"
          style={{
            color: 'white',
            textDecoration: 'none',
            marginRight: '20px',
          }}
          // onClick={() =>
          //   dispatch({
          //     type: 'CHANGE_LOADING',
          //     payload: true,
          //   })
          // }
        >
          <Icon
            icon="ic:round-shopping-cart"
            color="white"
            width="30"
            height="30"
          />
        </NavLink>
        <NavLink
          to="/profile"
          className="link"
          style={{
            color: 'white',
            textDecoration: 'none',
            marginRight: '20px',
          }}
          // onClick={() =>
          //   dispatch({
          //     type: 'CHANGE_LOADING',
          //     payload: true,
          //   })
          // }
        >
          <Icon
            icon="iconamoon:profile-fill"
            color="white"
            width="30"
            height="30"
          />
        </NavLink>
      </nav>
    </div>
  );
};

export default NavigationBar;
