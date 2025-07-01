# 🏃‍♀️ C25K Plan Visualizer - Integrated Application

A modern, full-stack Couch to 5K training plan generator that combines a beautiful React UI with a powerful Python backend.

## 🌟 Overview

This application integrates the original Python-based C25K Calendar Creator with a modern React frontend, providing:

- **✨ Modern React UI**: Beautiful, responsive interface built with React, TypeScript, and Tailwind CSS
- **🐍 Python Backend**: Powerful plan generation using the original NHS-based C25K algorithms
- **📊 Multiple Export Formats**: ICS calendar files, CSV spreadsheets, JSON data, and Markdown checklists
- **📱 Progressive Features**: User profiles, progress tracking, workout timer, and achievement system

## 🚀 Quick Start

### Prerequisites

- **Node.js** (16+) and npm
- **Python 3.8+**
- **Git**

### One-Command Startup

```bash
# Start both frontend and backend services
./start_full_app.sh
```

This will automatically:
1. Install Python dependencies (Flask, Flask-CORS)
2. Start the backend API server on port 3001
3. Start the React development server on port 8080
4. Open your browser to http://localhost:8080

### Manual Setup

If you prefer to start services individually:

```bash
# 1. Install Node.js dependencies
npm install

# 2. Install Python dependencies
python3 -m pip install --break-system-packages Flask Flask-CORS

# 3. Start backend (Terminal 1)
./start_backend.sh

# 4. Start frontend (Terminal 2)
npm run dev
```

## 🏗️ Architecture

```
C25K Plan Visualizer
├── Frontend (React + TypeScript)
│   ├── Modern UI components
│   ├── User profile management
│   ├── Workout timer
│   └── Progress tracking
├── Backend (Python + Flask)
│   ├── Plan generation API
│   ├── Export functionality
│   └── Original C25K algorithms
└── Integration Layer
    ├── RESTful API
    ├── File downloads
    └── Real-time communication
```

## 📱 Features

### ✅ Working Features

- **🎯 User Profile Setup**: Personalized onboarding with health considerations
- **📅 Training Plan Visualization**: Week-by-week workout calendar
- **⏱️ Interactive Workout Timer**: Real-time interval training with audio cues
- **📊 Progress Tracking**: Achievements, statistics, and workout history
- **📥 Export Functionality**: Multiple formats for different use cases
- **♿ Accessibility**: High contrast, large fonts, screen reader support

### 📥 Export Formats

| Format | Use Case | Status |
|--------|----------|---------|
| **📅 ICS** | Apple Calendar, Google Calendar, Outlook | ✅ Working |
| **📊 CSV** | Excel, Google Sheets, Numbers | ✅ Working |
| **🔗 JSON** | App integration, data processing | ✅ Working |
| **📄 Markdown** | Printable checklists | ✅ Working |

### 🔧 Advanced Features (Extensible)

The backend supports advanced features from the original Python application:
- **📱 Fitness Platform APIs**: Strava, RunKeeper, Garmin Connect
- **📄 PDF Generation**: Comprehensive training guides
- **📊 QR Code Export**: Easy plan sharing
- **🌍 Multi-language Support**: 5+ languages
- **🌤️ Weather Integration**: Smart workout recommendations

## 🔌 API Endpoints

The backend provides these key endpoints:

```
GET  /api/health                 # Health check
POST /api/generate-plan          # Generate training plan
POST /api/export-plan           # Export plan in various formats
GET  /api/export-formats        # Get available export formats
```

## 🏃‍♀️ Usage Guide

### 1. Initial Setup
1. Launch the application using `./start_full_app.sh`
2. Complete your user profile (age, weight, fitness level, preferences)
3. Set your preferred workout time and rest days

### 2. Training Plan
- View your personalized 9-week C25K program
- Navigate between weeks using arrow buttons
- Click workout cards to start the timer

### 3. Workout Timer
- Follow interval-based training sessions
- Get audio cues for run/walk transitions
- Track completed intervals in real-time

### 4. Export & Share
- Go to the "Export" tab
- Choose from ICS, CSV, JSON, or Markdown formats
- Import into your favorite calendar or fitness app

### 5. Progress Tracking
- Monitor completed workouts and running time
- Earn achievements for milestones
- Export your data for external analysis

## 🔧 Development

### Project Structure

```
.
├── src/                        # React frontend source
│   ├── components/            # UI components
│   ├── hooks/                 # React hooks
│   ├── pages/                 # Page components
│   └── types/                 # TypeScript definitions
├── backend/                   # Python backend
│   ├── api_server.py          # Flask API server
│   └── requirements.txt       # Python dependencies
├── Base Code/                 # Original Python C25K logic
│   └── modules/               # Core algorithms and exports
├── start_full_app.sh          # Complete application startup
└── start_backend.sh           # Backend-only startup
```

### Adding New Export Formats

1. Add the export logic to `Base Code/modules/exports.py`
2. Update the backend API in `backend/api_server.py`
3. The React UI will automatically discover new formats

### Customizing the UI

The React frontend uses:
- **Tailwind CSS** for styling
- **shadcn/ui** for component library
- **Lucide React** for icons
- **React Query** for state management

## 🐛 Troubleshooting

### Backend Issues

```bash
# Check if backend is running
curl http://localhost:3001/api/health

# Manual backend restart
cd backend && python3 api_server.py
```

### Frontend Issues

```bash
# Clear cache and restart
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Python Dependencies

```bash
# Install required packages
python3 -m pip install --break-system-packages Flask Flask-CORS
```

## 🎯 Outstanding Issues Resolved

This integration resolves several key issues:

✅ **Backend Integration**: React UI now connects to Python C25K algorithms  
✅ **Export Functionality**: Full export system with multiple formats  
✅ **API Communication**: RESTful API between frontend and backend  
✅ **File Downloads**: Proper file serving for exports  
✅ **Error Handling**: Graceful degradation and user feedback  
✅ **Development Workflow**: Easy startup scripts for development  

## 📚 Related Documentation

- **Original Python App**: See `Base Code/README.md` for the complete Python application
- **React Components**: See `src/components/` for individual component documentation
- **API Documentation**: Backend endpoints are documented in `backend/api_server.py`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## 📄 License

MIT License - see the original README.md for full license details.

---

## 🎉 Getting Started

Ready to start your C25K journey? 

```bash
./start_full_app.sh
```

Then open http://localhost:8080 and begin your personalized training plan!

---

**Medical Disclaimer**: This application is for informational purposes only. Always consult your healthcare provider before starting any new exercise program.