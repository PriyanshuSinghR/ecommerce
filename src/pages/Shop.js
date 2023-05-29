import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { Link } from 'react-router-dom';
import {
  getFilteredPriceProducts,
  getFilteredProducts,
  getSearchedProducts,
  getSortedProducts,
} from '../utils';

export const Shop = () => {
  const { state, dispatch } = useContext(CartContext);

  const handleChecked = (event) => {
    if (event.target.checked) {
      dispatch({
        type: 'FILTER_BY_TAG',
        payload: [...state.filterTag, event.target.value],
      });
    } else {
      dispatch({
        type: 'FILTER_BY_TAG',
        payload: state.filterTag.filter((tag) => tag !== event.target.value),
      });
    }
  };

  console.log(state.filterTag);
  const sortedProducts = getSortedProducts(state.allProducts, state.sortBy);
  const filteredItems = getFilteredProducts(sortedProducts, state.filterTag);
  const filteredPrice = getFilteredPriceProducts(filteredItems, state.price);
  const foundProducts = getSearchedProducts(filteredPrice, state.searchInput);
  // console.log(state.price);

  return (
    <div
      style={{
        display: 'flex',
        marginTop: '100px',
      }}
    >
      <div style={{ width: '300px' }}>
        <div style={{ position: 'absolute', right: '15px', top: '100px' }}>
          <b style={{ marginRight: '10px' }}>Sort By</b>
          <select
            value={state.sortBy}
            onChange={(event) =>
              dispatch({ type: 'SORT', payload: event.target.value })
            }
            style={{ padding: '5px', borderRadius: '5px' }}
          >
            <option value="ALL">All</option>
            <option value="HIGH_TO_LOW">Price - High to Low</option>
            <option value="LOW_TO_HIGH">Price - Low to High</option>
          </select>
        </div>
        <div style={{ padding: '1rem', width: '300px' }}>
          <h3 style={{ textAlign: 'left' }}>FILTERS:-</h3>
          <div
            style={{
              border: '1px solid',
              backgroundColor: 'white',
              width: '100%',
              marginBottom: '20px',
              textAlign: 'left',
              padding: '0.5rem',
              paddingBottom: '10px',
            }}
          >
            <h3>Price</h3>
            <div
              style={{
                display: 'flex',
                width: '300px',
                justifyContent: 'space-between',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              <p>1000</p>
              <p>2000</p>
              <p>4000</p>
            </div>
            <input
              type="range"
              min="1000"
              max="4000"
              value={state.price}
              onChange={(event) =>
                dispatch({
                  type: 'FILTER_BY_PRICE',
                  payload: event.target.value,
                })
              }
              style={{ width: '90%' }}
            />

            <div
              style={{
                textAlign: 'right',
                marginRight: '10px',
                fontWeight: 'bold',
              }}
            >
              {state.price}
            </div>
          </div>
          <div
            style={{
              border: '1px solid',
              backgroundColor: 'white',
              width: '100%',
              marginBottom: '20px',
              textAlign: 'left',
              padding: '0.5rem',
            }}
          >
            <h3>CATEGORIES</h3>
            <div
              style={{
                // paddingLeft: '10px',
                width: '90%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                height: '150px',
              }}
            >
              {state.allCategories.map((category) => (
                <div key={category._id} style={{ paddingBottom: '5px' }}>
                  <input
                    type="checkbox"
                    value={category.categoryName}
                    checked={state.filterTag.includes(category.categoryName)}
                    onChange={handleChecked}
                    style={{ cursor: 'pointer' }}
                  />
                  {category.categoryName.toUpperCase()}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => dispatch({ type: 'CLEAR_FILTERS' })}
            style={{
              color: 'white',
              cursor: 'pointer',
              border: 'none',
              padding: '10px',
              backgroundColor: 'purple',
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>
      <div style={{ marginLeft: '60px', width: '100%', marginBottom: '50px' }}>
        <h1>Shop</h1>
        <div>
          <div>
            {state.searchInput.length > 0 && (
              <p>Search result by: {state.searchInput}</p>
            )}
          </div>
          <div
            className="cards"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'left',
            }}
          >
            {foundProducts.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <Link
              style={{ textDecoration: 'none', color: 'black' }}
              key={product._id}
              to={`/shop/${product._id}`}
            >
              <ProductCard product={product} />
            </Link> */
}
