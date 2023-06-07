import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { Link } from 'react-router-dom';
import {
  getFilteredPriceProducts,
  getFilteredProducts,
  getSearchedProducts,
  getSortedProducts,
  getSortedRatingProducts,
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
  const sortedRating = getSortedRatingProducts(filteredItems, state.rating);
  const filteredPrice = getFilteredPriceProducts(sortedRating, state.price);
  const foundProducts = getSearchedProducts(filteredPrice, state.searchInput);

  return (
    <div
      style={{
        display: 'flex',
        marginTop: '100px',
        color: 'white',
      }}
    >
      <div style={{ width: '300px' }}>
        <div style={{ position: 'absolute', right: '15px', top: '100px' }}>
          <b style={{ marginRight: '10px' }}>Sort By</b>
          <select
            value={state.sortBy}
            onChange={(event) => {
              dispatch({ type: 'SORT', payload: event.target.value });
            }}
            style={{ padding: '5px', borderRadius: '5px' }}
          >
            <option value="ALL">All</option>
            <option value="HIGH_TO_LOW">Price - High to Low</option>
            <option value="LOW_TO_HIGH">Price - Low to High</option>
          </select>
        </div>
        <div style={{ padding: '1rem', width: '300px' }}>
          <div
            style={{
              textAlign: 'left',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <h3>FILTERS:-</h3>
            <button
              onClick={() => dispatch({ type: 'CLEAR_FILTERS' })}
              style={{
                color: 'white',
                cursor: 'pointer',
                border: 'none',
                padding: '5px',
                backgroundColor: 'black',
                height: '30px',
                margin: '15px 0px',
              }}
              className="button-shadow"
            >
              Clear Filters
            </button>
          </div>
          <div
            style={{
              border: '3px solid purple',
              backgroundColor: 'black',
              color: 'white',
              width: '100%',
              marginBottom: '20px',
              textAlign: 'left',
              padding: '0.5rem',
              paddingBottom: '10px',
              boxShadow: '1px 1px 10px black',
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
              border: '3px solid purple',
              backgroundColor: 'black',
              color: 'white',
              width: '100%',
              marginBottom: '20px',
              textAlign: 'left',
              padding: '0.5rem',
              boxShadow: '1px 1px 10px black',
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
          <div
            style={{
              border: '3px solid purple',
              backgroundColor: 'black',
              width: '100%',
              marginBottom: '20px',
              textAlign: 'left',
              padding: '0.5rem',
              boxShadow: '1px 1px 10px black',
              color: 'white',
            }}
          >
            <h3>RATING</h3>
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
              <div>
                <input
                  type="radio"
                  name="rating"
                  value="1"
                  checked={state.rating === '1'}
                  onChange={(event) =>
                    dispatch({
                      type: 'SORT_RATING',
                      payload: event.target.value,
                    })
                  }
                  style={{ cursor: 'pointer' }}
                />
                1 Stars & above
              </div>
              <div>
                <input
                  type="radio"
                  name="rating"
                  value="2"
                  checked={state.rating === '2'}
                  onChange={(event) =>
                    dispatch({
                      type: 'SORT_RATING',
                      payload: event.target.value,
                    })
                  }
                  style={{ cursor: 'pointer' }}
                />
                2 Stars & above
              </div>
              <div>
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  checked={state.rating === '3'}
                  onChange={(event) =>
                    dispatch({
                      type: 'SORT_RATING',
                      payload: event.target.value,
                    })
                  }
                  style={{ cursor: 'pointer' }}
                />
                3 Stars & above
              </div>
              <div>
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  checked={state.rating === '4'}
                  onChange={(event) =>
                    dispatch({
                      type: 'SORT_RATING',
                      payload: event.target.value,
                    })
                  }
                  style={{ cursor: 'pointer' }}
                />
                4 Stars & above
              </div>
            </div>
          </div>
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
