import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import "./Cart.css";
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets'; // Assuming assets is properly imported

const Cart = () => {
  const { cartItems, food_list, addToCart, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
 
  const cartAmount = getTotalCartAmount();
  console.log(cartAmount)
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

          {food_list.map((item) => {
            if (cartItems[item.id] > 0) {
              return (
                <div className="cart-items-item" key={item.id}>
                  <div className="cart-item-image">
                    <img src={url + "/images/" + item.image} alt={item.name} />
                    <p className='name'>{item.name}</p>
                    <p>ID: {item.id}</p>
                  </div>
                  <p className="cart-item-price price">{item.price}</p>
                  <div className="cart-item-quantity qty">
                    <img
                      className='remove-button'
                      onClick={() => removeFromCart(item.id)}
                      src={assets.remove_icon_red}
                      alt="Remove"
                    />
                    <p>{cartItems[item.id]}</p>
                    <img
                      className='add-button'
                      onClick={() => addToCart(item.id)}
                      src={assets.add_icon_green}
                      alt="Add"
                    />
                  </div>
                  <p className="cart-item-total">{item.price * cartItems[item.id]}</p>
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
          <Link to="/order">
            <button>Proceed To Checkout</button>
          </Link>
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