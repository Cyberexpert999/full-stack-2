from flask import Blueprint, request, jsonify

# Explanation of the code structure and functionality:

# This code defines a set of routes for managing student data in a Flask application. 
# The `student_bp` Blueprint is created to group all student-related routes together.
# The routes include:
# - `create_student`: A POST route to create a new student. It expects a JSON payload with the student's name and optionally their age. It returns the created student object with a unique ID.
# - `get_students`: A GET route to retrieve a list of all students. It returns a JSON array of student objects.
# - `get_student`: A GET route to retrieve a specific student by their ID. It returns the student object if found, or an error message if the student is not found.         
# - `update_student`: A PUT route to update an existing student's information. It expects a JSON payload with the updated name and/or age. It returns the updated student object if found, or an error message if the student is not found.
# - `delete_student`: A DELETE route to remove a student by their ID. It returns a success message if the student is deleted, or an error message if the student is not found.      

# what is a blueprint in flask?
# A Blueprint in Flask is a way to organize a group of related routes and functionality. It allows you to modularize your application by grouping routes, templates, and static files together.
# Blueprints can be registered on the main application, and they help in keeping the codebase organized and maintainable, especially as the application grows in size. They also allow for better code reuse and separation of concerns.        


student_bp = Blueprint("students", __name__)

# In-memory storage
students = []
current_id = 1


# CREATE
@student_bp.route("/students", methods=["POST"])
def create_student():
    global current_id

    data = request.get_json()

    if not data or "name" not in data:
        return jsonify({"error": "Name is required"}), 400

    student = {
        "id": current_id,
        "name": data["name"],
        "age": data.get("age", None)
    }

    students.append(student)
    current_id += 1

    return jsonify(student), 201


# READ ALL
@student_bp.route("/students", methods=["GET"])
def get_students():
    return jsonify(students), 200


# READ ONE
@student_bp.route("/students/<int:student_id>", methods=["GET"])
def get_student(student_id):
    student = next((s for s in students if s["id"] == student_id), None)

    if not student:
        return jsonify({"error": "Student not found"}), 404

    return jsonify(student), 200



# UPDATE
@student_bp.route("/students/<int:student_id>", methods=["PUT"])
def update_student(student_id):
    data = request.get_json()
    student = next((s for s in students if s["id"] == student_id), None)

    if not student:
        return jsonify({"error": "Student not found"}), 404

    student["name"] = data.get("name", student["name"])
    student["age"] = data.get("age", student["age"])

    return jsonify(student), 200


# DELETE
@student_bp.route("/students/<int:student_id>", methods=["DELETE"])
def delete_student(student_id):
    global students

    student = next((s for s in students if s["id"] == student_id), None)

    if not student:
        return jsonify({"error": "Student not found"}), 404

    students = [s for s in students if s["id"] != student_id]

    return jsonify({"message": "Deleted successfully"}), 200