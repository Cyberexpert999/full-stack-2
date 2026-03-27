# 🚀 Order Management System - Full Stack Application

A modern, full-stack order management system built with microservices architecture using Flask (Python) backend and React frontend. This application demonstrates real-time order tracking, customer management, and seamless integration between services.
## File Structure:
```bash
experiment-11/
│
├── backend/
│   ├── customer_service.py
│   ├── order_service.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── CustomerDashboard.jsx
│   │   │   └── CustomerDashboard.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md


## 🎯 Project Overview

This Order Management System is a complete solution for managing customer orders with a microservices architecture. It demonstrates:

- **Separation of Concerns**: Customer and Order services run independently
- **RESTful API Design**: Clean, standardized API endpoints
- **Real-time Updates**: Instant order status changes
- **Modern UI**: Responsive design with glass morphism effects

The system allows users to search for customers, view their orders, and update order statuses in real-time. All data is stored in-memory for simplicity, making it perfect for learning and prototyping.

## ✨ Features

### Backend Features
- ✅ **RESTful API** with proper HTTP methods (GET, POST, PUT, DELETE)
- ✅ **Microservices Architecture** - Two independent services
- ✅ **In-memory Data Storage** - No database setup required
- ✅ **CORS Enabled** - Allows cross-origin requests
- ✅ **Error Handling** - Comprehensive error responses
- ✅ **Input Validation** - Proper request validation
- ✅ **Modular Design** - Easy to extend and modify

### Frontend Features
- ✅ **Modern UI Design** - Glass morphism effects, gradients, animations
- ✅ **Responsive Layout** - Works on desktop, tablet, and mobile
- ✅ **Real-time Updates** - Instant order status changes
- ✅ **Service Status Indicators** - Shows backend connection status
- ✅ **Loading States** - Spinners and loading animations
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Keyboard Shortcuts** - Press Enter to search
- ✅ **Smooth Animations** - Fade-ins, hover effects, transitions



## 🛠️ Technologies Used

### Backend
- **Flask 2.3.3** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Python 3.8+** - Programming language

### Frontend
- **React 18** - JavaScript library for UI
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with animations

### Development Tools
- **Postman** - API testing
- **Git** - Version control
- **VS Code** - Recommended IDE

## 📦 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (v6 or higher) - Comes with Node.js
- **Python** (v3.8 or higher) - [Download](https://www.python.org/)
- **pip** - Python package manager
- **Postman** (optional, for API testing) - [Download](https://www.postman.com/)

## 🔧 Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/Cyberexpert999/full-stack-2/tree/main/Backend/Experiment-11
cd experiment-11

## Setup Backend
# Navigate to backend folder
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Or install manually
pip install flask flask-cors
