# 🏃‍♀️ C25K Plan Visualizer

A modern, full-stack Couch to 5K training plan generator that combines a beautiful React UI with a powerful Python backend.

## 🌟 Overview

This application integrates a Python-based C25K Calendar Creator with a modern React frontend, providing:

- **✨ Modern React UI**: Beautiful, responsive interface built with React, TypeScript, and Tailwind CSS
- **🐍 Python Backend**: Powerful plan generation using NHS-based C25K algorithms
- **📊 Multiple Export Formats**: ICS calendar files, CSV spreadsheets, JSON data, and Markdown checklists
- **📱 Progressive Features**: User profiles, progress tracking, workout timer, and achievement system

## 🚀 Self-Hosting Options

### Option 1: GitHub Codespaces (Recommended)

The easiest way to self-host this application is using GitHub Codespaces:

1. **Fork this repository** to your GitHub account
2. **Open in Codespaces**:
   - Click the "Code" button (green button) in your forked repository
   - Select the "Codespaces" tab
   - Click "Create codespace on main"
3. **Automatic Setup**: The devcontainer will automatically:
   - Install Node.js and Python
   - Install all dependencies
   - Forward ports 8080 (frontend) and 3001 (backend)
4. **Start the Application**:
   ```bash
   ./start_full_app.sh
   ```
5. **Access Your App**: Codespaces will automatically open the frontend at the forwarded port

**Benefits of GitHub Codespaces:**
- ✅ No local setup required
- ✅ Consistent development environment
- ✅ Free tier available (60 hours/month)
- ✅ Accessible from any device with a browser
- ✅ Easy to share with collaborators

### Option 2: Local Development

#### Prerequisites

- **Node.js** (16+) and npm
- **Python 3.8+**
- **Git**

#### Quick Start

```bash
# Clone the repository
git clone <your-fork-url>
cd c25k-plan-visualizer

# One-command startup
./start_full_app.sh
```

This will automatically:
1. Install Python dependencies (Flask, Flask-CORS)
2. Start the backend API server on port 3001
3. Start the React development server on port 8080
4. Open your browser to [http://localhost:8080](http://localhost:8080)

#### Manual Setup

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

### Option 3: Docker (Coming Soon)

Docker support is planned for future releases to provide containerized deployment.

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

### ✅ Core Features

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

## 🛠️ Development

### Project Structure

```
.
├── .devcontainer/             # GitHub Codespaces configuration
├── src/                       # React frontend source
│   ├── components/           # UI components
│   ├── hooks/                # React hooks
│   ├── pages/                # Page components
│   └── types/                # TypeScript definitions
├── backend/                  # Python backend
│   ├── api_server.py         # Flask API server
│   └── requirements.txt      # Python dependencies
├── public/                   # Static assets
├── start_full_app.sh         # Complete application startup
└── start_backend.sh          # Backend-only startup
```

### Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Python, Flask, Flask-CORS
- **Build Tools**: Vite, ESLint, PostCSS
- **Development**: GitHub Codespaces, VS Code

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

### GitHub Codespaces Issues

- **Port forwarding**: Ensure ports 8080 and 3001 are properly forwarded
- **Dependencies**: Rebuild the container if dependencies aren't installing
- **Python issues**: The devcontainer uses Python 3.11 by default

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test both frontend and backend
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Getting Started

Ready to start your C25K journey? 

**Using GitHub Codespaces (Recommended):**
1. Fork this repository
2. Open it in GitHub Codespaces
3. Run `./start_full_app.sh`
4. Start training!

**Local Development:**
```bash
git clone <your-fork-url>
cd c25k-plan-visualizer
./start_full_app.sh
```

---

**Medical Disclaimer**: This application is for informational purposes only. Always consult your healthcare provider before starting any new exercise program.
