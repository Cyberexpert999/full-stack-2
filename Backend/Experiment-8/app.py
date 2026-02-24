from flask import Flask, jsonify, request

app = Flask(__name__)

# In-memory storage
students = []
next_id = 1

# GET all students
@app.route('/students', methods=['GET'])
def get_students():
    return jsonify(students), 200

# GET a single student by ID
@app.route('/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    student = next((s for s in students if s['id'] == student_id), None)
    if student:
        return jsonify(student), 200
    return jsonify({"error": "Student not found"}), 404

# CREATE a new student
@app.route('/students', methods=['POST'])
def add_student():
    global next_id
    data = request.get_json()
    student = {
        "id": next_id,
        "name": data.get("name"),
        "age": data.get("age"),
        "email": data.get("email")
    }
    students.append(student)
    next_id += 1
    return jsonify(student), 201

# UPDATE a student
@app.route('/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    student = next((s for s in students if s['id'] == student_id), None)
    if not student:
        return jsonify({"error": "Student not found"}), 404
    data = request.get_json()
    student.update(data)
    return jsonify(student), 200

# DELETE a student
@app.route('/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    global students
    students = [s for s in students if s['id'] != student_id]
    return jsonify({"message": "Student deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)