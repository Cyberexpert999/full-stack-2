from app import app

if __name__ == "__main__":
    # For production, use environment variable PORT or default to 5000
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)