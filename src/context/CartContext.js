import axios from 'axios';
import { createContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const CartContext = createContext();

const reduceShop = (state, action) => {
  switch (action.type) {
    case 'SORT':
      return { ...state, sortBy: action.payload };
    case 'SORT_RATING':
      return { ...state, rating: action.payload };
    case 'ADD_ALL_PRODUCTS':
      return {
        ...state,
        allProducts: action.payload,
        filteredProducts: action.payload,
      };
    case 'ADD_CATEGORIES':
      return {
        ...state,
        allCategories: action.payload,
      };
    case 'UPDATE_PRODUCTS':
      return {
        ...state,
        filteredProducts: action.payload,
      };
    case 'UPDATE_ALL_PRODUCTS':
      return {
        ...state,
        allProducts: action.payload,
      };
    case 'SEARCH_PRODUCTS':
      return {
        ...state,
        searchInput: action.payload,
      };
    case 'FILTER_BY_TAG':
      return {
        ...state,
        filterTag: action.payload,
      };
    case 'LOGIN_STATUS':
      return {
        ...state,
        isLoggedIn: action.payload || !state.isLoggedIn,
      };

    case 'FILTER_BY_PRICE':
      return {
        ...state,
        price: action.payload,
      };
    case 'UPDATE_CART':
      return {
        ...state,
        cart: action.payload,
      };
    case 'UPDATE_FAV':
      return {
        ...state,
        fav: action.payload,
      };
    case 'ADD_ALL_ADDRESSES':
      return {
        ...state,
        allAddresses: action.payload,
      };
    case 'ADD_ADDRESS':
      return {
        ...state,
        address: action.payload,
      };
    case 'CHANGE_PRICE':
      return {
        ...state,
        totalPrice: action.payload,
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        product: action.payload,
      };
    case 'CHANGE_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'CLEAR_FILTERS':
      return {
        ...state,
        searchInput: '',
        sortBy: '',
        filterTag: [],
        price: 4000,
        rating: '',
        filteredProducts: state.allProducts,
      };

    default:
      break;
  }
};

export function CartProvider({ children }) {
  const history = useNavigate();
  const [state, dispatch] = useReducer(reduceShop, {
    allProducts: [],
    filteredProducts: [],
    testProducts: [],
    product: {},
    searchInput: '',
    filterTag: [],
    sortBy: '',
    price: 4000,
    rating: '4',
    allCategories: [],
    isLoggedIn: false,
    cart: [],
    fav: [],
    allAddresses: [],
    address: {},
    totalPrice: 0,
    isLoading: false,
  });

  const getProducts = async () => {
    dispatch({
      type: 'CHANGE_LOADING',
      payload: true,
    });
    try {
      const response = await fetch('api/products');
      if (response.status === 200) {
        const products = await response.json();
        dispatch({
          type: 'ADD_ALL_PRODUCTS',
          payload: await products.products,
        });
        // dispatch({
        //   type: 'CHANGE_LOADING',
        //   payload: false,
        // });
      }
    } catch (e) {
      console.error(e);
      // dispatch({
      //   type: 'CHANGE_LOADING',
      //   payload: false,
      // });
    } finally {
      setTimeout(() => {
        dispatch({
          type: 'CHANGE_LOADING',
          payload: false,
        });
      }, 2000);
    }
  };

  const getCategories = async () => {
    dispatch({
      type: 'CHANGE_LOADING',
      payload: true,
    });
    try {
      const response = await fetch('/api/categories');
      if (response.status === 200) {
        const categories = await response.json();
        dispatch({
          type: 'ADD_CATEGORIES',
          payload: await categories.categories,
        });
        // dispatch({
        //   type: 'CHANGE_LOADING',
        //   payload: false,
        // });
      }
    } catch (e) {
      console.error(e);
      // dispatch({
      //   type: 'CHANGE_LOADING',
      //   payload: false,
      // });
    } finally {
      setTimeout(() => {
        dispatch({
          type: 'CHANGE_LOADING',
          payload: false,
        });
      }, 2000);
    }
  };

  const getToCart = async () => {
    const encodedToken = localStorage.getItem('tokenuser');
    dispatch({
      type: 'CHANGE_LOADING',
      payload: true,
    });
    try {
      const response = await axios.get(`/api/user/cart`, {
        headers: {
          authorization: encodedToken,
        },
      });
      dispatch({
        type: 'UPDATE_CART',
        payload: response.data.cart,
      });
      // dispatch({
      //   type: 'CHANGE_LOADING',
      //   payload: false,
      // });
      console.log(response.data.cart);
    } catch (error) {
      console.log(error);
      // dispatch({
      //   type: 'CHANGE_LOADING',
      //   payload: false,
      // });
    } finally {
      setTimeout(() => {
        dispatch({
          type: 'CHANGE_LOADING',
          payload: false,
        });
      }, 2000);
    }
  };
  const getToFav = async () => {
    const encodedToken = localStorage.getItem('tokenuser');
    dispatch({
      type: 'CHANGE_LOADING',
      payload: true,
    });
    try {
      const response = await axios.get(`/api/user/wishlist`, {
        headers: {
          authorization: encodedToken,
        },
      });
      dispatch({
        type: 'UPDATE_FAV',
        payload: response.data.wishlist,
      });
      // dispatch({
      //   type: 'CHANGE_LOADING',
      //   payload: false,
      // });
      console.log(response.data.wishlist);
    } catch (error) {
      console.log(error);
      // dispatch({
      //   type: 'CHANGE_LOADING',
      //   payload: false,
      // });
    } finally {
      setTimeout(() => {
        dispatch({
          type: 'CHANGE_LOADING',
          payload: false,
        });
      }, 2000);
    }
  };

  const addToCart = async (product) => {
    const encodedToken = localStorage.getItem('tokenuser');

    try {
      const response = await axios.post(
        `/api/user/cart`,
        { product },
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
      dispatch({
        type: 'LOGIN_STATUS',
        payload: true,
      });
      toast.success('Added to cart');
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.warning('Please First Sign In');
      setTimeout(() => {
        history('/signin');
      }, 2000);
    }
  };
  const addToFav = async (product) => {
    const encodedToken = localStorage.getItem('tokenuser');
    try {
      const response = await axios.post(
        `/api/user/wishlist`,
        { product },
        {
          headers: {
            authorization: encodedToken,
          },
        },
      );
      dispatch({
        type: 'UPDATE_FAV',
        payload: response.data.wishlist,
      });
      dispatch({
        type: 'LOGIN_STATUS',
        payload: true,
      });
      toast.success('Added to Wishlist');
      console.log(response.data.wishlist);
    } catch (error) {
      console.log(error);
      toast.warning('Please First Sign In');
      setTimeout(() => {
        history('/signin');
      }, 2000);
    }
  };

  const removeFromFav = async (_id) => {
    const encodedToken = localStorage.getItem('tokenuser');
    try {
      const response = await axios.delete(`/api/user/wishlist/${_id}`, {
        headers: {
          authorization: encodedToken,
        },
      });
      dispatch({
        type: 'UPDATE_FAV',
        payload: response.data.wishlist,
      });
      toast.success('Removed from Wishlist');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
    getToCart();
    getToFav();
  }, [state.isLoggedIn]);
  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        addToFav,
        removeFromFav,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
