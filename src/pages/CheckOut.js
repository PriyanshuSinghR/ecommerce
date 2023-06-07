import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Icon } from '@iconify/react';
import { Popup } from '../components/Popup';
import { Link } from 'react-router-dom';

export const CheckOut = () => {
  const { state, dispatch } = useContext(CartContext);
  const [coupon, setCoupon] = useState({
    price: 0,
    input: '',
    addCoupon: 0,
    disabled: false,
  });
  const [form, setForm] = useState({});

  const [isOpen, setIsOpen] = useState(false);

  const handleInputs = (el) => {
    const name = el.target.name;
    const value = el.target.value;
    setForm({ ...form, [name]: value });
  };

  const calculateTotal = (list) => list.reduce((sum, item) => sum + item, 0);

  const handleCoupon = (input) => {
    if (input.toLowerCase() === 'lord20') {
      dispatch({
        type: 'CHANGE_PRICE',
        payload: state.totalPrice - (state.totalPrice * 20) / 100,
      });
      setCoupon({
        ...coupon,
        disabled: true,
        addCoupon: (state.totalPrice * 20) / 100,
      });
    } else if (input.toLowerCase() === 'lord50') {
      dispatch({
        type: 'CHANGE_PRICE',
        payload: state.totalPrice - (state.totalPrice * 50) / 100,
      });
      setCoupon({
        ...coupon,
        disabled: true,
        addCoupon: (state.totalPrice * 50) / 100,
      });
    } else {
      alert('Please enter a valid coupon code');
    }
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // console.log(addresses);
  console.log(state.address);

  return (
    <div style={{ marginTop: '100px', minHeight: '65vh' }}>
      <h1>Checkout</h1>
      <div style={{ display: 'flex', marginTop: '50px' }}>
        <div style={{ marginLeft: '50px', width: '700px', textAlign: 'left' }}>
          <h3>ADDRESS DETAILS</h3>
          <div>
            {state.allAddresses.map((address) => (
              <div
                style={{
                  display: 'flex',
                  border: '1px solid black',
                  width: '600px',
                  borderRadius: '10px',
                  height: '100%',
                  backgroundColor: 'black',
                  color: 'white',
                  boxShadow: '1px 1px 10px 1px black',
                  margin: '20px 0px',
                  paddingLeft: '10px',
                }}
              >
                <input
                  type="radio"
                  name="address"
                  onChange={(event) => {
                    dispatch({
                      type: 'ADD_ADDRESS',
                      payload: address,
                    });
                  }}
                />
                <div
                  style={{
                    textAlign: 'left',
                    paddingBottom: '20px',
                    paddingLeft: '20px',
                  }}
                >
                  <h2>{address.name}</h2>
                  <p>{`${address.address} ${address.city} ${address.state} Pin code: ${address.zip}`}</p>
                  <b>Mobile: {address.phone}</b>
                </div>
              </div>
            ))}
          </div>

          <div
            onClick={togglePopup}
            className="button-shadow"
            style={{
              padding: '10px',
              display: 'flex',
              color: 'black',
              border: '1px solid purple',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '590px',
              marginBottom: '20px',
            }}
          >
            <Icon
              icon="ph:plus-fill"
              color="purple"
              width="30"
              height="30"
              style={{ padding: '4px' }}
            />
            <span style={{ padding: '10px' }}>Add Address</span>
          </div>

          {isOpen && (
            <Popup
              content={
                <form
                  onSubmit={() => {
                    dispatch({
                      type: 'ADD_ALL_ADDRESSES',
                      payload: [...state.allAddresses, form],
                    });
                    togglePopup();
                    setForm({});
                  }}
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    height: '300px',
                  }}
                >
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div style={{ width: '45%' }}>
                      <input
                        value={form.name}
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="form-input-field"
                        placeholder="Name"
                        onChange={handleInputs}
                      />
                    </div>

                    <div style={{ width: '45%' }}>
                      <input
                        value={form.phone}
                        type="tel"
                        id="phone"
                        name="phone"
                        onChange={handleInputs}
                        required
                        className="form-input-field"
                        placeholder="Phone no."
                      />
                    </div>
                  </div>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div style={{ width: '45%' }}>
                      <input
                        value={form.city}
                        type="text"
                        id="city"
                        name="city"
                        onChange={handleInputs}
                        required
                        className="form-input-field"
                        placeholder="City"
                      />
                    </div>

                    <div style={{ width: '45%' }}>
                      <input
                        value={form.pin}
                        type="text"
                        id="pin"
                        name="pin"
                        onChange={handleInputs}
                        required
                        className="form-input-field"
                        placeholder="Pin Code"
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      value={form.address}
                      type="text"
                      id="address"
                      name="address"
                      onChange={handleInputs}
                      cols="10"
                      rows="10"
                      size="200"
                      required
                      className="form-input-field"
                      placeholder="Address"
                      // style={{ height: '100%' }}
                    />
                  </div>
                  <div>
                    <input
                      value={form.state}
                      type="text"
                      id="state"
                      name="state"
                      onChange={handleInputs}
                      required
                      className="form-input-field"
                      placeholder="State"
                    />
                  </div>

                  <button
                    type="submit"
                    className="button-shadow"
                    style={{
                      border: '1px solid black',
                      width: '300px',
                      borderRadius: '10px',
                      backgroundColor: 'purple',
                      color: 'white',
                      padding: '10px',
                      margin: '0px auto',
                    }}
                  >
                    Add
                  </button>
                </form>
              }
              handleClose={togglePopup}
            />
          )}
        </div>
        <div
          style={{
            border: '1px solid black',
            width: '300px',
            borderRadius: '10px',
            height: '100%',
            backgroundColor: 'black',
            color: 'white',
            boxShadow: '1px 1px 10px 1px black',
          }}
        >
          <h3>PRICE DETAILS</h3>
          <div style={{ marginBottom: '20px' }}>
            <Icon
              icon="clarity:tag-solid"
              color="white"
              width="20"
              height="15"
              style={{ marginRight: '5px' }}
            />
            <input
              style={{ marginRight: '5px', padding: '3px' }}
              onChange={(event) =>
                setCoupon({ ...coupon, input: event.target.value })
              }
            />
            <button
              style={{
                border: 'none',
                padding: '5px',
                borderRadius: '5px',
                cursor: !coupon.disabled && 'pointer',
                backgroundColor: coupon.disabled ? 'white' : 'purple',
              }}
              className={!coupon.disabled && 'button-shadow'}
              onClick={() => handleCoupon(coupon.input)}
              disabled={coupon.disabled}
            >
              Apply
            </button>
          </div>
          <div
            style={{
              backgroundColor: 'white',
              padding: '1px',
            }}
          ></div>
          <div style={{ margin: '0px 15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>
                Price
                {`(${calculateTotal(state.cart.map(({ qty }) => qty))} Items)`}
              </p>
              <p>
                Rs.{' '}
                {calculateTotal(
                  state.cart.map(({ price, qty }) => Number(price) * qty),
                )}
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Discount</p>{' '}
              <p>
                -Rs.
                {calculateTotal(
                  state.cart.map(({ price, qty }) => Number(price) * qty),
                ) -
                  calculateTotal(
                    state.cart.map(
                      ({ discountprice, qty }) => Number(discountprice) * qty,
                    ),
                  )}
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Delivery charges</p> <p>FREE</p>
            </div>
            {coupon.disabled && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>Coupon Discount</p>{' '}
                <p>
                  - Rs.
                  {coupon.addCoupon}
                </p>
              </div>
            )}
            <div
              style={{
                backgroundColor: 'white',
                padding: '1px',
              }}
            ></div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <p>Total Price</p>{' '}
              <p>
                Rs.
                {state.totalPrice}
              </p>
            </div>
            <div
              style={{
                backgroundColor: 'white',
                padding: '1px',
                marginBottom: '30px',
              }}
            ></div>
          </div>
          <Link to="/thanks">
            <button
              className="button-shadow"
              style={{
                padding: '10px',
                backgroundColor: 'purple',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '90%',
                marginBottom: '20px',
              }}
            >
              Place Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
