import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { StoreContext } from '../../context/StoreContext';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const { cartItems, getTotalCartAmount, clearCart } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const items = JSON.stringify(cartItems);
    const totalAmount = getTotalCartAmount();

    try {
      const response = await axios.post('http://localhost:8080/api/orders/',
        {
          items,
          totalAmount,
          deliveryInfo: formData
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (response.data.success) {
        clearCart();
        setOrderPlaced(true);
        toast.success('Order placed successfully!'); // Show success toast notification
        setTimeout(() => {
          navigate('/'); // Navigate to home page after 2 seconds
        }, 2000);
      } else {
        console.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const cartAmount = getTotalCartAmount();
  const deliveryFee = cartAmount > 400 ? 0 : 40;
  const totalAmount = cartAmount + deliveryFee;

  if (orderPlaced) {
    return <div className="order-success">Order placed successfully!</div>;
  }

  return (
    <div className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleInputChange}
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="zipCode"
            placeholder="Zip-Code"
            value={formData.zipCode}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="cart-total-section">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>RS{cartAmount.toFixed(2)}</p>
          </div>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>RS{deliveryFee.toFixed(2)}</p>
          </div>
          <div className="cart-total-details">
            <b>Total</b>
            <b>RS{totalAmount.toFixed(2)}</b>
          </div>
          <button type="submit" onClick={handlePlaceOrder}>Place Order</button>

        </div>
        <div className="cart-promocode">
          <p>If you have a promo code, enter here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Promo code" />
            <button type="button">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
