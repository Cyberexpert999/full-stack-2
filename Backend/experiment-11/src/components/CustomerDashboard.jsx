// src/components/CustomerDashboard.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services/api';  // Import unified API
import './CustomerDashboard.css';

function CustomerDashboard() {
  const [customerId, setCustomerId] = useState('');
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [servicesStatus, setServicesStatus] = useState({});

  // Check backend services on component mount
  useEffect(() => {
    checkServices();
  }, []);

  const checkServices = async () => {
    const status = await apiService.healthCheck();
    setServicesStatus(status);
    if (!status.customerService) {
      setError('⚠️ Customer Service is not running on port 5001');
    }
    if (!status.orderService) {
      setError(prev => prev + '\n⚠️ Order Service is not running on port 5002');
    }
  };

  const fetchCustomerData = async () => {
    if (!customerId) {
      setError('Please enter a customer ID');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Fetch customer details using unified API
      const customerData = await apiService.getCustomer(customerId);
      setCustomer(customerData);
      
      // Fetch customer orders
      const ordersData = await apiService.getCustomerOrders(customerId);
      setOrders(ordersData.orders || []);
    } catch (err) {
      setError(err.message || 'Customer not found or server error');
      setCustomer(null);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId) => {
    if (!newStatus) {
      alert('Please select a status');
      return;
    }

    try {
      const response = await apiService.updateOrderStatus(orderId, newStatus);
      
      // Update the orders list with the new status
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: response.new_status }
          : order
      ));
      
      setSelectedOrder(null);
      setNewStatus('');
      alert('Order status updated successfully!');
    } catch (err) {
      alert(err.message || 'Failed to update order status');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchCustomerData();
    }
  };

  const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="dashboard">
      <h1>Order Management System</h1>
      
      {/* Service Status Indicators */}
      <div className="service-status">
        <div className={`status-indicator ${servicesStatus.customerService ? 'online' : 'offline'}`}>
          Customer Service: {servicesStatus.customerService ? '✅ Online' : '❌ Offline'}
        </div>
        <div className={`status-indicator ${servicesStatus.orderService ? 'online' : 'offline'}`}>
          Order Service: {servicesStatus.orderService ? '✅ Online' : '❌ Offline'}
        </div>
      </div>
      
      <div className="search-section">
        <div className="search-container">
          <label htmlFor="customerId">Customer ID:</label>
          <input
            id="customerId"
            type="number"
            placeholder="Enter Customer ID (1 or 2)"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={fetchCustomerData} disabled={loading}>
            {loading ? 'Searching...' : 'Search Customer'}
          </button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {/* Rest of your component remains the same */}
      {customer && (
        <div className="customer-info">
          <div className="customer-header">
            <h2>Customer Information</h2>
            <div className="customer-id-large">
              <span className="id-label">Customer ID:</span>
              <span className="id-value">{customer.id}</span>
            </div>
          </div>
          
          <div className="customer-details">
            <div className="detail-row">
              <div className="detail-item">
                <strong>Name:</strong>
                <span>{customer.name}</span>
              </div>
              <div className="detail-item">
                <strong>Email:</strong>
                <span>{customer.email}</span>
              </div>
              <div className="detail-item">
                <strong>Customer ID:</strong>
                <span className="customer-id-highlight">{customer.id}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders section */}
      {orders.length > 0 && (
        <div className="orders-section">
          <div className="orders-header">
            <h2>Orders for Customer #{customer?.id}</h2>
            <div className="orders-count">Total Orders: {orders.length}</div>
          </div>
          
          <div className="orders-grid">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h3>Order #{order.id}</h3>
                  <div className="customer-ref">Customer ID: {order.customer_id}</div>
                </div>
                
                <div className="order-details">
                  <p><strong>Product:</strong> {order.product}</p>
                  <p><strong>Quantity:</strong> {order.quantity}</p>
                  <p><strong>Price:</strong> ${order.price}</p>
                  <p><strong>Total:</strong> ${(order.price * order.quantity).toFixed(2)}</p>
                  <p>
                    <strong>Status:</strong> 
                    <span className={`status-badge status-${order.status}`}>
                      {order.status}
                    </span>
                  </p>
                </div>
                
                {selectedOrder === order.id ? (
                  <div className="update-form">
                    <label>Update Status:</label>
                    <select 
                      value={newStatus} 
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <option value="">Select new status</option>
                      {statusOptions.map(status => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                    <div className="form-buttons">
                      <button className="confirm-btn" onClick={() => handleUpdateStatus(order.id)}>
                        Confirm Update
                      </button>
                      <button className="cancel-btn" onClick={() => setSelectedOrder(null)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    className="update-btn"
                    onClick={() => setSelectedOrder(order.id)}
                  >
                    Update Status
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerDashboard;