
## Experiment No. 8

A Flask-based REST API for performing CRUD operations on student data using in-memory storage.  
This project demonstrates how to build a modular backend server using REST principles.

---

## 📌 Project Overview

This experiment demonstrates:

- Creating a backend server using Python Flask  
- Implementing RESTful APIs for CRUD operations  
- Storing data in-memory using Python lists/dictionaries  
- Organizing routes using Blueprints  
- Implementing request logging middleware  
- Testing API endpoints using Postman  
- Preparing the project for deployment on Render  

---

## 🛠 Technologies Used

- Python 3.x  
- Flask  
- Flask-CORS  
- Gunicorn (Production Server)  
- Postman (API Testing Tool)  
- Render (Cloud Deployment Platform)  

---

## 📁 Project Structure
</> Bash
rest-api-lab/
│
├── app.py                     # Flask App Factory
├── run.py                     # Application Entry Point
│
├── routes/
│   └── student_routes.py      # Student CRUD Endpoints
│
└── middleware/
    └── logger.py              # Request Logging Middleware

---

## 🚀 Installation & Running the Project

### 1️⃣ Install Dependencies
</> Bash
pip install flask flask-cors gunicorn

### 2️⃣ Run the Application
</> Bash
python run.py

Server runs at:
http://localhost:5000

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | `/` | Health Check |
| POST | `/students` | Create a new student |
| GET | `/students` | Get all students |
| GET | `/students/<id>` | Get student by ID |
| PUT | `/students/<id>` | Update student |
| DELETE | `/students/<id>` | Delete student |


## 🧪 Testing Using Postman

1. Open Postman  
2. Select method (GET/POST/PUT/DELETE)  
3. Use URL: http://localhost:5000/students  
4. For POST/PUT → Body → JSON  
5. Send request  

---

## 🌐 Deployment on Render

1. Push project to GitHub  
2. Go to Render.com  
3. Create New Web Service  
4. Connect repository  
5. Start command:

gunicorn run:app

---

## 🎯 Learning Outcomes

- Understand Flask app factory pattern  
- Implement CRUD APIs  
- Use Blueprints and middleware  
- Handle JSON requests/responses  
- Test APIs using Postman  
- Deploy Flask app to cloud  

