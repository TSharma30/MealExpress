import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyOrder.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/orders/user', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // This effect will run when the component mounts or when it regains focus
  useEffect(() => {
    const handleFocus = () => {
      fetchOrders();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {loading ? (
        <div className="loading">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="no-orders">No orders found.</div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-item">
            <div className="order-details">
              <p>Order ID: {order.id}</p>
              <p>Total Amount: Rs {order.totalAmount}</p>
              <p>Status: {order.status}</p>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;