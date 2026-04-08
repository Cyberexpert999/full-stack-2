from flask import Flask, request, jsonify
import sqlite3
import os
import re
from datetime import datetime

app = Flask(__name__)

# Database setup - Creates file-based database (no password needed!)
def init_database():
    """Initialize SQLite database - no password, no localhost required"""
    try:
        conn = sqlite3.connect('students.db')
        cursor = conn.cursor()
        
        # Create student table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                age INTEGER NOT NULL,
                grade TEXT NOT NULL,
                phone TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        conn.close()
        print("✅ Database initialized successfully on Render!")
        return True
    except Exception as e:
        print(f"Database init error: {e}")
        return False

# Initialize database when app starts
init_database()

# Validation function
def validate_student(data):
    """Validate student data"""
    errors = []
    
    if not data.get('name'):
        errors.append("Name is required")
    elif len(data['name']) < 2:
        errors.append("Name must be at least 2 characters")
    
    if not data.get('email'):
        errors.append("Email is required")
    elif not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', data['email']):
        errors.append("Invalid email format")
    
    if not data.get('age'):
        errors.append("Age is required")
    else:
        try:
            age = int(data['age'])
            if age < 1 or age > 120:
                errors.append("Age must be between 1 and 120")
        except:
            errors.append("Age must be a number")
    
    if not data.get('grade'):
        errors.append("Grade is required")
    
    return errors

# ==================== CRUD ENDPOINTS ====================

# Root endpoint - Test if API is working
@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'status': 'success',
        'message': 'Student Management API is running on Render!',
        'database': 'SQLite (No password required)',
        'server': 'Render Cloud',
        'endpoints': {
            'POST /students': 'Create new student',
            'GET /students': 'Get all students',
            'GET /students/{id}': 'Get student by ID',
            'PUT /students/{id}': 'Update student',
            'DELETE /students/{id}': 'Delete student'
        }
    })

# 1. CREATE - Add new student
@app.route('/students', methods=['POST'])
def create_student():
    try:
        data = request.get_json()
        
        # Validate data
        errors = validate_student(data)
        if errors:
            return jsonify({
                'status': 'error',
                'message': 'Validation failed',
                'errors': errors
            }), 400
        
        # Connect to database
        conn = sqlite3.connect('students.db')
        cursor = conn.cursor()
        
        # Check if email already exists
        cursor.execute("SELECT id FROM students WHERE email = ?", (data['email'],))
        if cursor.fetchone():
            conn.close()
            return jsonify({
                'status': 'error',
                'message': 'Email already exists'
            }), 409
        
        # Insert new student
        cursor.execute('''
            INSERT INTO students (name, email, age, grade, phone)
            VALUES (?, ?, ?, ?, ?)
        ''', (data['name'], data['email'], data['age'], data['grade'], data.get('phone', '')))
        
        conn.commit()
        student_id = cursor.lastrowid
        conn.close()
        
        return jsonify({
            'status': 'success',
            'message': 'Student created successfully',
            'student_id': student_id,
            'data': data
        }), 201
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

# 2. READ - Get all students
@app.route('/students', methods=['GET'])
def get_all_students():
    try:
        conn = sqlite3.connect('students.db')
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("SELECT id, name, email, age, grade, phone, created_at FROM students ORDER BY id DESC")
        students = [dict(row) for row in cursor.fetchall()]
        
        conn.close()
        
        return jsonify({
            'status': 'success',
            'count': len(students),
            'students': students
        }), 200
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

# 3. READ - Get single student by ID
@app.route('/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    try:
        conn = sqlite3.connect('students.db')
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("SELECT id, name, email, age, grade, phone, created_at FROM students WHERE id = ?", (student_id,))
        student = cursor.fetchone()
        
        conn.close()
        
        if not student:
            return jsonify({
                'status': 'error',
                'message': f'Student with ID {student_id} not found'
            }), 404
        
        return jsonify({
            'status': 'success',
            'student': dict(student)
        }), 200
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

# 4. UPDATE - Update student
@app.route('/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    try:
        data = request.get_json()
        
        conn = sqlite3.connect('students.db')
        cursor = conn.cursor()
        
        # Check if student exists
        cursor.execute("SELECT id FROM students WHERE id = ?", (student_id,))
        if not cursor.fetchone():
            conn.close()
            return jsonify({
                'status': 'error',
                'message': f'Student with ID {student_id} not found'
            }), 404
        
        # Build update query dynamically
        update_fields = []
        values = []
        
        if 'name' in data:
            update_fields.append("name = ?")
            values.append(data['name'])
        if 'email' in data:
            update_fields.append("email = ?")
            values.append(data['email'])
        if 'age' in data:
            update_fields.append("age = ?")
            values.append(data['age'])
        if 'grade' in data:
            update_fields.append("grade = ?")
            values.append(data['grade'])
        if 'phone' in data:
            update_fields.append("phone = ?")
            values.append(data['phone'])
        
        if not update_fields:
            conn.close()
            return jsonify({
                'status': 'error',
                'message': 'No fields to update'
            }), 400
        
        values.append(student_id)
        query = f"UPDATE students SET {', '.join(update_fields)} WHERE id = ?"
        
        cursor.execute(query, values)
        conn.commit()
        conn.close()
        
        return jsonify({
            'status': 'success',
            'message': 'Student updated successfully',
            'updated_fields': list(data.keys())
        }), 200
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

# 5. DELETE - Delete student
@app.route('/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    try:
        conn = sqlite3.connect('students.db')
        cursor = conn.cursor()
        
        # Check if student exists
        cursor.execute("SELECT id FROM students WHERE id = ?", (student_id,))
        if not cursor.fetchone():
            conn.close()
            return jsonify({
                'status': 'error',
                'message': f'Student with ID {student_id} not found'
            }), 404
        
        # Delete student
        cursor.execute("DELETE FROM students WHERE id = ?", (student_id,))
        conn.commit()
        conn.close()
        
        return jsonify({
            'status': 'success',
            'message': f'Student with ID {student_id} deleted successfully'
        }), 200
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

# Health check endpoint for Render
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'database': 'connected'
    }), 200

# Run the app
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Server running on port {port}")
    print(f"Visit: https://your-render-url.onrender.com")
    app.run(host='0.0.0.0', port=port)