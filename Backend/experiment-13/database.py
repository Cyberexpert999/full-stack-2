import mysql.connector
from mysql.connector import Error
from config import DB_CONFIG

def get_db_connection():
    """Create and return a database connection"""
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

def create_database_and_table():
    """Create database and student table if they don't exist"""
    try:
        # First connect without database
        connection = mysql.connector.connect(
            host=DB_CONFIG['host'],
            user=DB_CONFIG['user'],
            password=DB_CONFIG['password']
        )
        
        if connection.is_connected():
            cursor = connection.cursor()
            
            # Create database if not exists
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_CONFIG['database']}")
            print(f"Database '{DB_CONFIG['database']}' created or already exists")
            
            # Use the database
            cursor.execute(f"USE {DB_CONFIG['database']}")
            
            # Create student table
            create_table_query = """
            CREATE TABLE IF NOT EXISTS student (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                age INT NOT NULL,
                grade VARCHAR(10) NOT NULL,
                phone VARCHAR(15),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_email (email)
            )
            """
            cursor.execute(create_table_query)
            print("Table 'student' created or already exists")
            
            cursor.close()
            connection.close()
            print("Database setup completed successfully!")
            
    except Error as e:
        print(f"Error setting up database: {e}")

if __name__ == "__main__":
    create_database_and_table()