from flask import request, g
import time
from functools import wraps

def register_middlewares(app):
    
    @app.before_request
    def before_request():
        g.start_time = time.time()
        print(f"\n[{time.strftime('%Y-%m-%d %H:%M:%S')}]")
        print(f"Request: {request.method} {request.path}")
        if request.is_json:
            print(f"Body: {request.get_json()}")
    
    @app.after_request
    def after_request(response):
        if hasattr(g, 'start_time'):
            elapsed = time.time() - g.start_time
            print(f"Response Status: {response.status}")
            print(f"Time taken: {elapsed:.3f}s")
        return response
    
    # Error handler
    @app.errorhandler(404)
    def not_found(error):
        return {"error": "Resource not found"}, 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return {"error": "Internal server error"}, 500