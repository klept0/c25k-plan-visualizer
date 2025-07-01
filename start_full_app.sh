#!/bin/bash

echo "🏃‍♀️ Starting C25K Plan Visualizer - Full Application"
echo "=================================================="

# Function to kill background processes on exit
cleanup() {
    echo ""
    echo "Shutting down..."
    jobs -p | xargs -r kill
    wait
    echo "All services stopped."
}

# Set up cleanup on script exit
trap cleanup EXIT

# Start backend API server
echo "📡 Starting Backend API Server..."
cd backend
export PYTHONPATH="${PYTHONPATH}:../Base Code"
python3 api_server.py &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Test backend health
echo "🔍 Testing backend health..."
if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "✅ Backend API is healthy"
else
    echo "❌ Backend API failed to start or is not responding"
    echo "   Check that Flask and Flask-CORS are installed:"
    echo "   python3 -m pip install --break-system-packages Flask Flask-CORS"
fi

# Start React development server
echo ""
echo "⚛️  Starting React Development Server..."
npm run dev &
FRONTEND_PID=$!

# Wait a moment for frontend to start
sleep 5

echo ""
echo "🎉 Application started successfully!"
echo "=================================================="
echo "📱 React Frontend: http://localhost:8080"
echo "📡 Backend API:    http://localhost:3001"
echo "🔍 API Health:     http://localhost:3001/api/health"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user to stop
wait