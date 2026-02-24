import requests
import json

BASE_URL = "http://localhost:5000/api"

def test_api():
    # Test GET all students (empty initially)
    print("GET /students")
    response = requests.get(f"{BASE_URL}/students")
    print(response.json())
    print("-" * 50)
    
    # Test POST - Create student
    print("POST /students")
    student_data = {
        "name": "John Doe",
        "age": 20,
        "email": "john@example.com"
    }
    response = requests.post(
        f"{BASE_URL}/students", 
        json=student_data,
        headers={"Content-Type": "application/json"}
    )
    print(response.json())
    print("-" * 50)
    
    # Test GET all students (should have one)
    print("GET /students")
    response = requests.get(f"{BASE_URL}/students")
    print(response.json())
    
if __name__ == "__main__":
    test_api()