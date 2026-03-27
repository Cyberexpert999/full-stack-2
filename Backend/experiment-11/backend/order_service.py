from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory data storage
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

next_order_id = 4

# ============================================
# ORDER ENDPOINTS
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
    POST - Create new order
    
    Postman Setup:
    - Method: POST
    - URL: http://localhost:5002/api/orders
    - Headers: Content-Type: application/json
    - Body: {
        "customer_id": 1,
        "product": "Tablet",
        "quantity": 1,
        "price": 499.99,
        "status": "pending"
    }
    """
    global next_order_id
    
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['customer_id', 'product', 'quantity', 'price']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400
    
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
    
    orders[next_order_id] = new_order
    next_order_id += 1
    
    return jsonify({
        "message": "Order created successfully",
        "order": new_order
    }), 201

@app.route('/api/orders/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    """
    PUT - Update entire order
    
    Postman Setup:
    - Method: PUT
    - URL: http://localhost:5002/api/orders/1
    - Headers: Content-Type: application/json
    - Body: {
        "customer_id": 1,
        "product": "Gaming Laptop",
        "quantity": 1,
        "price": 1299.99,
        "status": "processing"
    }
    """
    if order_id not in orders:
        return jsonify({"error": "Order not found"}), 404
    
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    # Update order
    orders[order_id] = {
        "id": order_id,
        "customer_id": data.get('customer_id', orders[order_id]['customer_id']),
        "product": data.get('product', orders[order_id]['product']),
        "quantity": data.get('quantity', orders[order_id]['quantity']),
        "price": data.get('price', orders[order_id]['price']),
        "status": data.get('status', orders[order_id]['status']),
        "order_date": data.get('order_date', orders[order_id].get('order_date', '2024-01-30'))
    }
    
    return jsonify({
        "message": "Order updated successfully",
        "order": orders[order_id]
    }), 200

@app.route('/api/orders/<int:order_id>/status', methods=['PUT'])
def update_order_status(order_id):
    """
    PUT - Update order status only
    
    Postman Setup:
    - Method: PUT
    - URL: http://localhost:5002/api/orders/1/status
    - Headers: Content-Type: application/json
    - Body: {
        "status": "shipped"
    }
    """
    if order_id not in orders:
        return jsonify({"error": "Order not found"}), 404
    
    data = request.get_json()
    
    if not data or 'status' not in data:
        return jsonify({"error": "Status is required"}), 400
    
    new_status = data['status']
    valid_statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
    
    if new_status not in valid_statuses:
        return jsonify({"error": f"Invalid status. Must be one of: {valid_statuses}"}), 400
    
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
    DELETE - Delete order
    
    Postman Setup:
    - Method: DELETE
    - URL: http://localhost:5002/api/orders/1
    """
    if order_id not in orders:
        return jsonify({"error": "Order not found"}), 404
    
    deleted_order = orders.pop(order_id)
    
    return jsonify({
        "message": "Order deleted successfully",
        "deleted_order": deleted_order
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5002)