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

4. Open your browser to [http://localhost:8080](http://localhost:8080)

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

## Project Info

**URL**: [https://lovable.dev/projects/32662c6d-909e-4c7f-810d-2314fd533668](https://lovable.dev/projects/32662c6d-909e-4c7f-810d-2314fd533668)

## Editing Options

### Use Lovable

Simply visit the [Lovable Project](https://lovable.dev/projects/32662c6d-909e-4c7f-810d-2314fd533668) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

### Use Your Preferred IDE

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### Edit a File Directly in GitHub

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

### Use GitHub Codespaces

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/32662c6d-909e-4c7f-810d-2314fd533668) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
