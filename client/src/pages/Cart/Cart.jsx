import React, { useContext } from 'react';
import "./Cart.css";
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets'; // Assuming assets is properly imported

const Cart = () => {
  const { cartItems, food_list, addToCart, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
 
  const cartAmount = getTotalCartAmount();
  const deliveryFee = cartAmount > 400 ? 0 : 40;
  const totalAmount = cartAmount + deliveryFee;


  return (
    <div className="cart-container">
      <div className="cart-items-section">
        <div className="cart-items">
          <div className="cart-items-titles">
            <p className="cart-item-header">ITEMS</p>
            <p className="cart-item-price">PRICE</p>
            <p className="cart-item-quantity">QUANTITY</p>
            <p className="cart-item-total">TOTAL</p>
          </div>

          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div className="cart-items-item" key={index}>
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                    <p className='name'>{item.name}</p>
                    <p>ID: {item._id}</p>
                  </div>
                  <p className="cart-item-price price">{item.price}</p>
                  <div className="cart-item-quantity qty">
                    <img
                      className='remove-button'
                      onClick={() => removeFromCart(item._id)}
                      src={assets.remove_icon_red}
                      alt="Remove"
                    />
                    <p>{cartItems[item._id]}</p>
                    <img
                      className='add-button'
                      onClick={() => addToCart(item._id)}
                      src={assets.add_icon_green}
                      alt="Add"
                    />
                  </div>
                  <p className="cart-item-total">{item.price * cartItems[item._id]}</p>
                </div>
              )
            }
            return null;
          })}
        </div>
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
};

export default Cart;
