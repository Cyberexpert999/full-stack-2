from flask import Flask
from database import create_database_and_table
from student_routes import setup_routes

# Create Flask app
app = Flask(__name__)

# Setup database
print("Setting up database...")
create_database_and_table()

# Setup routes
setup_routes(app)

# Root endpoint
@app.route('/', methods=['GET'])
def home():
    return {
        'message': 'Student Management API',
        'endpoints': {
            'GET /students': 'Get all students',
            'GET /students/<id>': 'Get student by ID',
            'POST /students': 'Create new student',
            'PUT /students/<id>': 'Update student',
            'DELETE /students/<id>': 'Delete student'
        }
    }

if __name__ == '__main__':
    print("Starting Flask server...")
    print("Server running at http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)