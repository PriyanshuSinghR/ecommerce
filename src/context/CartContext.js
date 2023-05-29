import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

export const CartContext = createContext();

const reduceShop = (state, action) => {
  switch (action.type) {
    case 'SORT':
      return { ...state, sortBy: action.payload };
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
        isLoggedIn: !state.isLoggedIn,
      };
    case 'ADD_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'REMOVE_USER':
      return {
        ...state,
        user: {},
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
    case 'CLEAR_FILTERS':
      return {
        ...state,
        searchInput: '',
        sortBy: '',
        filterTag: [],
        price: 4000,
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
    searchInput: '',
    filterTag: [],
    sortBy: '',
    price: 4000,
    allCategories: [],
    isLoggedIn: false,
    user: {},
    cart: [],
    fav: [],
  });

  const getProducts = async () => {
    try {
      const response = await fetch('api/products');
      if (response.status === 200) {
        const products = await response.json();
        dispatch({
          type: 'ADD_ALL_PRODUCTS',
          payload: await products.products,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.status === 200) {
        const categories = await response.json();
        dispatch({
          type: 'ADD_CATEGORIES',
          payload: await categories.categories,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getToCart = async () => {
    const encodedToken = localStorage.getItem('tokenuser');
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const getToFav = async () => {
    const encodedToken = localStorage.getItem('tokenuser');
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (product) => {
    const encodedToken = localStorage.getItem('tokenuser');
    console.log(product);
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
      console.log(response.data.cart);
    } catch (error) {
      console.log(error);
      window.alert('Please First Sign In ');
      history('/signin');
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
      console.log(response.data.wishlist);
    } catch (error) {
      console.log(error);
      window.alert('Please First Sign In ');

      history('/signin');
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
    getToCart();
    getToFav();
  }, []);
  return (
    <CartContext.Provider
      value={{ state, dispatch, addToCart, addToFav, removeFromFav }}
    >
      {children}
    </CartContext.Provider>
  );
}
