import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Order.css';
import { useAdminAuth } from '../../context/AdminContext';
const Order = () => {
  const [orders, setOrders] = useState([]);
  const { url } = useAdminAuth();


  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/orders/all`, {
       
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(`${url}/api/orders/${orderId}`, 
        { status: newStatus },
       
      );
      if (response.data.success) {
        fetchOrders(); // Refresh orders after update
      } else {
        console.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="admin-orders">
      <h2>All Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="admin-order-item">
          <p>Order ID: {order.id}</p>
          <p>User: {order.user.name} ({order.user.email})</p>
          <p>Total Amount: Rs {order.totalAmount}</p>
          <p>Status: {order.status}</p>
          <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
          <select
            value={order.status}
            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
          >
            <option value="Preparing">Preparing</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Order;