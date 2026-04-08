from flask import Flask, request, jsonify
from database import get_db_connection, create_database_and_table
import re

app = Flask(__name__)

# Setup database on startup
print("=" * 50)
print("Setting up database...")
print("=" * 50)
create_database_and_table()

# Validation function
def validate_student_data(data, is_update=False):
    """Validate student data"""
    errors = []
    
    if not is_update or 'name' in data:
        if not data.get('name'):
            errors.append("Name is required")
        elif len(data['name']) < 2:
            errors.append("Name must be at least 2 characters")
    
    if not is_update or 'email' in data:
        if not data.get('email'):
            errors.append("Email is required")
        elif not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', data['email']):
            errors.append("Invalid email format")
    
    if not is_update or 'age' in data:
        if data.get('age') is None:
            errors.append("Age is required")
        else:
            try:
                age = int(data['age'])
                if age < 1 or age > 120:
                    errors.append("Age must be between 1 and 120")
            except:
                errors.append("Age must be a number")
    
    if not is_update or 'grade' in data:
        if not data.get('grade'):
            errors.append("Grade is required")
    
    return errors

# ==================== CRUD ENDPOINTS ====================

# 1. CREATE - Add new student (POST)
@app.route('/students', methods=['POST'])
def create_student():
    try:
        data = request.get_json()
        
        # Validate
        errors = validate_student_data(data)
        if errors:
            return jsonify({
                'status': 'error',
                'message': 'Validation failed',
                'errors': errors
            }), 400
        
        connection = get_db_connection()
        if not connection:
            return jsonify({
                'status': 'error',
                'message': 'Database connection failed'
            }), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Check if email exists
        cursor.execute("SELECT id FROM student WHERE email = %s", (data['email'],))
        if cursor.fetchone():
            return jsonify({
                'status': 'error',
                'message': 'Email already exists'
            }), 409
        
        # Insert student
        insert_query = """
        INSERT INTO student (name, email, age, grade, phone)
        VALUES (%s, %s, %s, %s, %s)
        """
        values = (data['name'], data['email'], data['age'], data['grade'], data.get('phone'))
        
        cursor.execute(insert_query, values)
        connection.commit()
        
        return jsonify({
            'status': 'success',
            'message': 'Student created successfully',
            'student_id': cursor.lastrowid
        }), 201
        
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'connection' in locals() and connection:
            connection.close()

# 2. READ - Get all students (GET)
@app.route('/students', methods=['GET'])
def get_all_students():
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({
                'status': 'error',
                'message': 'Database connection failed'
            }), 500
        
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT id, name, email, age, grade, phone FROM student")
        students = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({
            'status': 'success',
            'count': len(students),
            'students': students
        }), 200
        
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# 3. READ - Get single student by ID (GET)
@app.route('/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({
                'status': 'error',
                'message': 'Database connection failed'
            }), 500
        
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT id, name, email, age, grade, phone FROM student WHERE id = %s", (student_id,))
        student = cursor.fetchone()
        
        cursor.close()
        connection.close()
        
        if not student:
            return jsonify({
                'status': 'error',
                'message': 'Student not found'
            }), 404
        
        return jsonify({
            'status': 'success',
            'student': student
        }), 200
        
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# 4. UPDATE - Update student (PUT)
@app.route('/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    try:
        data = request.get_json()
        
        connection = get_db_connection()
        if not connection:
            return jsonify({
                'status': 'error',
                'message': 'Database connection failed'
            }), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Check if student exists
        cursor.execute("SELECT id FROM student WHERE id = %s", (student_id,))
        if not cursor.fetchone():
            return jsonify({
                'status': 'error',
                'message': 'Student not found'
            }), 404
        
        # Validate data
        errors = validate_student_data(data, is_update=True)
        if errors:
            return jsonify({
                'status': 'error',
                'message': 'Validation failed',
                'errors': errors
            }), 400
        
        # Check email uniqueness if updating email
        if 'email' in data:
            cursor.execute("SELECT id FROM student WHERE email = %s AND id != %s", (data['email'], student_id))
            if cursor.fetchone():
                return jsonify({
                    'status': 'error',
                    'message': 'Email already exists'
                }), 409
        
        # Build update query
        update_fields = []
        values = []
        
        if 'name' in data:
            update_fields.append("name = %s")
            values.append(data['name'])
        if 'email' in data:
            update_fields.append("email = %s")
            values.append(data['email'])
        if 'age' in data:
            update_fields.append("age = %s")
            values.append(data['age'])
        if 'grade' in data:
            update_fields.append("grade = %s")
            values.append(data['grade'])
        if 'phone' in data:
            update_fields.append("phone = %s")
            values.append(data['phone'])
        
        if not update_fields:
            return jsonify({
                'status': 'error',
                'message': 'No fields to update'
            }), 400
        
        values.append(student_id)
        update_query = f"UPDATE student SET {', '.join(update_fields)} WHERE id = %s"
        
        cursor.execute(update_query, values)
        connection.commit()
        
        return jsonify({
            'status': 'success',
            'message': 'Student updated successfully'
        }), 200
        
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'connection' in locals() and connection:
            connection.close()

# 5. DELETE - Delete student (DELETE)
@app.route('/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({
                'status': 'error',
                'message': 'Database connection failed'
            }), 500
        
        cursor = connection.cursor()
        
        # Check if student exists
        cursor.execute("SELECT id FROM student WHERE id = %s", (student_id,))
        if not cursor.fetchone():
            return jsonify({
                'status': 'error',
                'message': 'Student not found'
            }), 404
        
        # Delete student
        cursor.execute("DELETE FROM student WHERE id = %s", (student_id,))
        connection.commit()
        
        cursor.close()
        connection.close()
        
        return jsonify({
            'status': 'success',
            'message': 'Student deleted successfully'
        }), 200
        
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Root endpoint
@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'status': 'success',
        'message': 'Student Management API is running',
        'endpoints': {
            'POST /students': 'Create new student',
            'GET /students': 'Get all students',
            'GET /students/{id}': 'Get student by ID',
            'PUT /students/{id}': 'Update student',
            'DELETE /students/{id}': 'Delete student'
        }
    })

# Run the app
if __name__ == '__main__':
    print("=" * 50)
    print("Server is running at: http://localhost:5000")
    print("=" * 50)
    print("\nTest in Postman:")
    print("1. GET  http://localhost:5000/")
    print("2. POST http://localhost:5000/students")
    print("=" * 50)
    app.run(debug=True, host='127.0.0.1', port=5000)