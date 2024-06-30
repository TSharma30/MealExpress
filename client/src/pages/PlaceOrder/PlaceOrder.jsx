import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const { getTotalCartAmount, cartAmount, deliveryFee, totalAmount } = useContext(StoreContext);

  return (
    <div className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>
        <input type="email" placeholder="Email Address" />
        <input type="text" placeholder="Street" />
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip-Code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone" />
      </div>
      <div className="cart-total-section">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>{cartAmount}</p>
          </div>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>{deliveryFee}</p>
          </div>
          <div className="cart-total-details">
            <b>Total</b>
            <b>{totalAmount}</b>
          </div>
          <button>Proceed To Checkout</button>
        </div>
        <div className="cart-promocode">
          <p>If you have a promo code, enter here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
