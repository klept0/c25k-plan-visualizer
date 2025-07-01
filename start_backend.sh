#!/bin/bash

echo "Starting C25K Backend API Server..."

cd backend

# Check if Python dependencies are installed
if ! python3 -c "import flask, flask_cors" 2>/dev/null; then
    echo "Installing required Python packages..."
    python3 -m pip install --break-system-packages Flask Flask-CORS
fi

echo "Starting Flask server on port 3001..."
export PYTHONPATH="${PYTHONPATH}:../Base Code"
python3 api_server.py

echo "Backend server stopped."