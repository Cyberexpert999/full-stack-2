from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ============================================
# IN-MEMORY DATABASE
# ============================================

# Customer data
customers = {
    1: {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "123-456-7890",
        "address": "123 Main St"
    },
    2: {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane@example.com",
        "phone": "987-654-3210",
        "address": "456 Oak Ave"
    }
}

# Order data
orders = {
    1: {
        "id": 1,
        "customer_id": 1,
        "product": "Laptop",
        "quantity": 1,
        "price": 999.99,
        "status": "pending",
        "order_date": "2024-01-15"
    },
    2: {
        "id": 2,
        "customer_id": 1,
        "product": "Mouse",
        "quantity": 2,
        "price": 29.99,
        "status": "shipped",
        "order_date": "2024-01-20"
    },
    3: {
        "id": 3,
        "customer_id": 2,
        "product": "Keyboard",
        "quantity": 1,
        "price": 79.99,
        "status": "delivered",
        "order_date": "2024-01-25"
    }
}

next_customer_id = 3  # For creating new customers
next_order_id = 4     # For creating new orders

# ============================================
# CUSTOMER ENDPOINTS (GET, POST, PUT, DELETE)
# ============================================

@app.route('/api/customers', methods=['GET'])
def get_all_customers():
    """GET all customers"""
    return jsonify(list(customers.values())), 200

@app.route('/api/customers/<int:customer_id>', methods=['GET'])
def get_customer(customer_id):
    """GET customer by ID"""
    customer = customers.get(customer_id)
    if customer:
        return jsonify(customer), 200
    return jsonify({"error": "Customer not found"}), 404

@app.route('/api/customers', methods=['POST'])
def create_customer():
    """
    POST - Create a new customer
    
    Postman Setup:
    - Method: POST
    - URL: http://localhost:5001/api/customers
    - Headers: Content-Type: application/json
    - Body (raw JSON):
    {
        "name": "Bob Wilson",
        "email": "bob@example.com",
        "phone": "555-123-4567",
        "address": "789 Pine St"
    }
    """
    global next_customer_id
    
    # Get JSON data from request body
    data = request.get_json()
    
    # Validate required fields
    if not data or 'name' not in data or 'email' not in data:
        return jsonify({"error": "Name and email are required"}), 400
    
    # Create new customer
    new_customer = {
        "id": next_customer_id,
        "name": data['name'],
        "email": data['email'],
        "phone": data.get('phone', ''),  # Optional field
        "address": data.get('address', '')  # Optional field
    }
    
    # Save to database
    customers[next_customer_id] = new_customer
    next_customer_id += 1
    
    return jsonify({
        "message": "Customer created successfully",
        "customer": new_customer
    }), 201

@app.route('/api/customers/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    """
    PUT - Update an existing customer
    
    Postman Setup:
    - Method: PUT
    - URL: http://localhost:5001/api/customers/1
    - Headers: Content-Type: application/json
    - Body (raw JSON):
    {
        "name": "John Updated",
        "email": "john.updated@example.com",
        "phone": "111-222-3333",
        "address": "Updated Address"
    }
    """
    # Check if customer exists
    if customer_id not in customers:
        return jsonify({"error": "Customer not found"}), 404
    
    # Get JSON data from request body
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    # Update only the fields that are provided
    customer = customers[customer_id]
    
    if 'name' in data:
        customer['name'] = data['name']
    if 'email' in data:
        customer['email'] = data['email']
    if 'phone' in data:
        customer['phone'] = data['phone']
    if 'address' in data:
        customer['address'] = data['address']
    
    return jsonify({
        "message": "Customer updated successfully",
        "customer": customer
    }), 200

@app.route('/api/customers/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    """
    DELETE - Delete a customer
    
    Postman Setup:
    - Method: DELETE
    - URL: http://localhost:5001/api/customers/1
    """
    # Check if customer exists
    if customer_id not in customers:
        return jsonify({"error": "Customer not found"}), 404
    
    # Delete customer
    deleted_customer = customers.pop(customer_id)
    
    # Also delete all orders for this customer
    global orders
    orders = {k: v for k, v in orders.items() if v['customer_id'] != customer_id}
    
    return jsonify({
        "message": "Customer deleted successfully",
        "deleted_customer": deleted_customer
    }), 200

# ============================================
# CUSTOMER ORDERS ENDPOINTS
# ============================================

@app.route('/api/customers/<int:customer_id>/orders', methods=['GET'])
def get_customer_orders(customer_id):
    """GET all orders for a specific customer"""
    customer_orders = [order for order in orders.values() 
                      if order['customer_id'] == customer_id]
    
    return jsonify({
        "customer_id": customer_id,
        "orders": customer_orders
    }), 200

# ============================================
# ORDER ENDPOINTS (GET, POST, PUT, DELETE)
# ============================================

@app.route('/api/orders', methods=['GET'])
def get_all_orders():
    """GET all orders"""
    return jsonify(list(orders.values())), 200

@app.route('/api/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    """GET order by ID"""
    order = orders.get(order_id)
    if order:
        return jsonify(order), 200
    return jsonify({"error": "Order not found"}), 404

@app.route('/api/orders', methods=['POST'])
def create_order():
    """
    POST - Create a new order
    
    Postman Setup:
    - Method: POST
    - URL: http://localhost:5001/api/orders
    - Headers: Content-Type: application/json
    - Body (raw JSON):
    {
        "customer_id": 1,
        "product": "Monitor",
        "quantity": 1,
        "price": 299.99,
        "status": "pending"
    }
    """
    global next_order_id
    
    # Get JSON data from request body
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['customer_id', 'product', 'quantity', 'price']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400
    
    # Check if customer exists
    if data['customer_id'] not in customers:
        return jsonify({"error": "Customer not found"}), 404
    
    # Create new order
    new_order = {
        "id": next_order_id,
        "customer_id": data['customer_id'],
        "product": data['product'],
        "quantity": data['quantity'],
        "price": data['price'],
        "status": data.get('status', 'pending'),
        "order_date": data.get('order_date', '2024-01-30')
    }
    
    # Save to database
    orders[next_order_id] = new_order
    next_order_id += 1
    
    return jsonify({
        "message": "Order created successfully",
        "order": new_order
    }), 201

@app.route('/api/orders/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    """
    PUT - Update an entire order
    
    Postman Setup:
    - Method: PUT
    - URL: http://localhost:5001/api/orders/1
    - Headers: Content-Type: application/json
    - Body (raw JSON):
    {
        "customer_id": 1,
        "product": "Gaming Laptop",
        "quantity": 1,
        "price": 1299.99,
        "status": "processing"
    }
    """
    # Check if order exists
    if order_id not in orders:
        return jsonify({"error": "Order not found"}), 404
    
    # Get JSON data from request body
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    # Validate required fields
    required_fields = ['customer_id', 'product', 'quantity', 'price', 'status']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400
    
    # Check if customer exists
    if data['customer_id'] not in customers:
        return jsonify({"error": "Customer not found"}), 404
    
    # Update order
    orders[order_id] = {
        "id": order_id,
        "customer_id": data['customer_id'],
        "product": data['product'],
        "quantity": data['quantity'],
        "price": data['price'],
        "status": data['status'],
        "order_date": data.get('order_date', orders[order_id].get('order_date', '2024-01-30'))
    }
    
    return jsonify({
        "message": "Order updated successfully",
        "order": orders[order_id]
    }), 200

@app.route('/api/orders/<int:order_id>/status', methods=['PUT'])
def update_order_status(order_id):
    """
    PUT - Update only the order status (PATCH equivalent)
    
    Postman Setup:
    - Method: PUT
    - URL: http://localhost:5001/api/orders/1/status
    - Headers: Content-Type: application/json
    - Body (raw JSON):
    {
        "status": "shipped"
    }
    """
    # Check if order exists
    if order_id not in orders:
        return jsonify({"error": "Order not found"}), 404
    
    # Get JSON data from request body
    data = request.get_json()
    
    if not data or 'status' not in data:
        return jsonify({"error": "Status is required"}), 400
    
    new_status = data['status']
    valid_statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
    
    if new_status not in valid_statuses:
        return jsonify({"error": f"Invalid status. Must be one of: {valid_statuses}"}), 400
    
    # Update status
    old_status = orders[order_id]['status']
    orders[order_id]['status'] = new_status
    
    return jsonify({
        "message": "Order status updated successfully",
        "order_id": order_id,
        "old_status": old_status,
        "new_status": new_status,
        "order": orders[order_id]
    }), 200

@app.route('/api/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    """
    DELETE - Delete an order
    
    Postman Setup:
    - Method: DELETE
    - URL: http://localhost:5001/api/orders/1
    """
    # Check if order exists
    if order_id not in orders:
        return jsonify({"error": "Order not found"}), 404
    
    # Delete order
    deleted_order = orders.pop(order_id)
    
    return jsonify({
        "message": "Order deleted successfully",
        "deleted_order": deleted_order
    }), 200

# ============================================
# RUN THE APPLICATION
# ============================================

if __name__ == '__main__':
    app.run(debug=True, port=5001)