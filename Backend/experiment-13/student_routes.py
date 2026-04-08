from flask import Flask, request, jsonify
from database import get_db_connection
import re

# Validation functions
def validate_student_data(data, is_update=False):
    """Validate student data with proper error messages"""
    errors = []
    
    if not is_update or 'name' in data:
        if not data.get('name'):
            errors.append("Name is required")
        elif len(data['name']) < 2:
            errors.append("Name must be at least 2 characters long")
        elif len(data['name']) > 100:
            errors.append("Name must be less than 100 characters")
    
    if not is_update or 'email' in data:
        if not data.get('email'):
            errors.append("Email is required")
        elif not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', data['email']):
            errors.append("Invalid email format")
    
    if not is_update or 'age' in data:
        if data.get('age') is not None:
            try:
                age = int(data['age'])
                if age < 1 or age > 120:
                    errors.append("Age must be between 1 and 120")
            except (ValueError, TypeError):
                errors.append("Age must be a valid number")
        else:
            errors.append("Age is required")
    
    if not is_update or 'grade' in data:
        if not data.get('grade'):
            errors.append("Grade is required")
        elif not re.match(r'^[A-F][+-]?$|^[0-9]{1,3}$', data['grade'].upper()):
            errors.append("Invalid grade format")
    
    if not is_update or 'phone' in data:
        if data.get('phone'):
            if not re.match(r'^[0-9]{10,15}$', data['phone']):
                errors.append("Phone must be 10-15 digits")
    
    return errors

def setup_routes(app):
    
    # Create (POST) - Add a new student
    @app.route('/students', methods=['POST'])
    def create_student():
        try:
            data = request.get_json()
            
            # Validate data
            errors = validate_student_data(data)
            if errors:
                return jsonify({
                    'status': 'error',
                    'message': 'Validation failed',
                    'errors': errors
                }), 400
            
            connection = get_db_connection()
            if not connection:
                return jsonify({'status': 'error', 'message': 'Database connection failed'}), 500
            
            cursor = connection.cursor(dictionary=True)
            
            # Check if email already exists
            cursor.execute("SELECT id FROM student WHERE email = %s", (data['email'],))
            if cursor.fetchone():
                return jsonify({'status': 'error', 'message': 'Email already exists'}), 409
            
            # Insert student
            insert_query = """
            INSERT INTO student (name, email, age, grade, phone)
            VALUES (%s, %s, %s, %s, %s)
            """
            values = (data['name'], data['email'], data['age'], 
                     data['grade'], data.get('phone'))
            
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
    
    # Read (GET) - Get all students
    @app.route('/students', methods=['GET'])
    def get_all_students():
        try:
            connection = get_db_connection()
            if not connection:
                return jsonify({'status': 'error', 'message': 'Database connection failed'}), 500
            
            cursor = connection.cursor(dictionary=True)
            cursor.execute("SELECT id, name, email, age, grade, phone, created_at, updated_at FROM student")
            students = cursor.fetchall()
            
            return jsonify({
                'status': 'success',
                'count': len(students),
                'students': students
            }), 200
            
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 500
        finally:
            if 'cursor' in locals():
                cursor.close()
            if 'connection' in locals() and connection:
                connection.close()
    
    # Read (GET) - Get student by ID
    @app.route('/students/<int:student_id>', methods=['GET'])
    def get_student(student_id):
        try:
            connection = get_db_connection()
            if not connection:
                return jsonify({'status': 'error', 'message': 'Database connection failed'}), 500
            
            cursor = connection.cursor(dictionary=True)
            cursor.execute("SELECT id, name, email, age, grade, phone, created_at, updated_at FROM student WHERE id = %s", (student_id,))
            student = cursor.fetchone()
            
            if not student:
                return jsonify({'status': 'error', 'message': 'Student not found'}), 404
            
            return jsonify({
                'status': 'success',
                'student': student
            }), 200
            
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 500
        finally:
            if 'cursor' in locals():
                cursor.close()
            if 'connection' in locals() and connection:
                connection.close()
    
    # Update (PUT) - Update student
    @app.route('/students/<int:student_id>', methods=['PUT'])
    def update_student(student_id):
        try:
            data = request.get_json()
            
            # Check if student exists
            connection = get_db_connection()
            if not connection:
                return jsonify({'status': 'error', 'message': 'Database connection failed'}), 500
            
            cursor = connection.cursor(dictionary=True)
            cursor.execute("SELECT id FROM student WHERE id = %s", (student_id,))
            if not cursor.fetchone():
                return jsonify({'status': 'error', 'message': 'Student not found'}), 404
            
            # Validate data
            errors = validate_student_data(data, is_update=True)
            if errors:
                return jsonify({
                    'status': 'error',
                    'message': 'Validation failed',
                    'errors': errors
                }), 400
            
            # Check email uniqueness if email is being updated
            if 'email' in data:
                cursor.execute("SELECT id FROM student WHERE email = %s AND id != %s", 
                             (data['email'], student_id))
                if cursor.fetchone():
                    return jsonify({'status': 'error', 'message': 'Email already exists'}), 409
            
            # Build update query dynamically
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
                return jsonify({'status': 'error', 'message': 'No fields to update'}), 400
            
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
    
    # Delete (DELETE) - Delete student
    @app.route('/students/<int:student_id>', methods=['DELETE'])
    def delete_student(student_id):
        try:
            connection = get_db_connection()
            if not connection:
                return jsonify({'status': 'error', 'message': 'Database connection failed'}), 500
            
            cursor = connection.cursor()
            
            # Check if student exists
            cursor.execute("SELECT id FROM student WHERE id = %s", (student_id,))
            if not cursor.fetchone():
                return jsonify({'status': 'error', 'message': 'Student not found'}), 404
            
            # Delete student
            cursor.execute("DELETE FROM student WHERE id = %s", (student_id,))
            connection.commit()
            
            return jsonify({
                'status': 'success',
                'message': 'Student deleted successfully'
            }), 200
            
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 500
        finally:
            if 'cursor' in locals():
                cursor.close()
            if 'connection' in locals() and connection:
                connection.close()