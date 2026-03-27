import axios from 'axios';

class APIService {
  constructor() {
    // Configuration
    this.customerServiceURL = process.env.REACT_APP_CUSTOMER_SERVICE_URL || 'http://localhost:5001/api';
    this.orderServiceURL = process.env.REACT_APP_ORDER_SERVICE_URL || 'http://localhost:5002/api';
    
    // Create axios instances with default config
    this.customerAPI = axios.create({
      baseURL: this.customerServiceURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    this.orderAPI = axios.create({
      baseURL: this.orderServiceURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    // Add request interceptor for logging
    this.customerAPI.interceptors.request.use(
      config => {
        console.log(`📤 Customer Service Request: ${config.method.toUpperCase()} ${config.url}`);
        return config;
      },
      error => Promise.reject(error)
    );
    
    this.orderAPI.interceptors.request.use(
      config => {
        console.log(`📤 Order Service Request: ${config.method.toUpperCase()} ${config.url}`);
        return config;
      },
      error => Promise.reject(error)
    );
    
    // Add response interceptor for logging
    this.customerAPI.interceptors.response.use(
      response => {
        console.log(`📥 Customer Service Response:`, response.status);
        return response;
      },
      error => {
        console.error(`❌ Customer Service Error:`, error.message);
        return Promise.reject(error);
      }
    );
    
    this.orderAPI.interceptors.response.use(
      response => {
        console.log(`📥 Order Service Response:`, response.status);
        return response;
      },
      error => {
        console.error(`❌ Order Service Error:`, error.message);
        return Promise.reject(error);
      }
    );
  }
  
  // Customer Service Methods
  async getCustomer(customerId) {
    try {
      const response = await this.customerAPI.get(`/customers/${customerId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async getCustomerOrders(customerId) {
    try {
      const response = await this.customerAPI.get(`/customers/${customerId}/orders`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async createCustomer(customerData) {
    try {
      const response = await this.customerAPI.post('/customers', customerData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async updateCustomer(customerId, customerData) {
    try {
      const response = await this.customerAPI.put(`/customers/${customerId}`, customerData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async deleteCustomer(customerId) {
    try {
      const response = await this.customerAPI.delete(`/customers/${customerId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Order Service Methods
  async getAllOrders() {
    try {
      const response = await this.orderAPI.get('/orders');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async getOrder(orderId) {
    try {
      const response = await this.orderAPI.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async createOrder(orderData) {
    try {
      const response = await this.orderAPI.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async updateOrder(orderId, orderData) {
    try {
      const response = await this.orderAPI.put(`/orders/${orderId}`, orderData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async updateOrderStatus(orderId, status) {
    try {
      const response = await this.orderAPI.put(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async deleteOrder(orderId) {
    try {
      const response = await this.orderAPI.delete(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Error Handler
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      return {
        status: error.response.status,
        message: error.response.data.error || 'Server error',
        data: error.response.data
      };
    } else if (error.request) {
      // Request made but no response
      return {
        status: 0,
        message: 'Cannot connect to server. Please check if backend is running.',
        error: error.message
      };
    } else {
      // Something else happened
      return {
        status: 0,
        message: error.message,
        error: error
      };
    }
  }
  
  // Check if services are running
  async healthCheck() {
    const results = {
      customerService: false,
      orderService: false
    };
    
    try {
      await this.customerAPI.get('/customers/1');
      results.customerService = true;
    } catch (error) {
      results.customerService = false;
    }
    
    try {
      await this.orderAPI.get('/orders/1');
      results.orderService = true;
    } catch (error) {
      results.orderService = false;
    }
    
    return results;
  }
}

// Create and export a single instance
const apiService = new APIService();
export default apiService;