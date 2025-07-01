# C25K Training Plan Visualizer

A comprehensive web application for the Couch to 5K (C25K) running program, built with React, TypeScript, and modern UI components.

## ✨ Features

### 🏃‍♂️ Core Functionality
- **Complete 9-week C25K program** with detailed workout plans
- **Interactive workout timer** with audio cues and interval tracking
- **Progress tracking** with achievements and milestones
- **User profile management** with preferences and goals
- **Multi-format exports** (ICS, CSV, JSON, Markdown)
- **Dark/Light mode** with system preference detection

### 🎯 User Experience
- **Responsive design** that works on all devices
- **Accessibility features** including high contrast and large fonts
- **Multi-language support** (English, Spanish, French, German, Portuguese)
- **Audio feedback** during workouts with customizable settings
- **Visual progress indicators** and achievement badges

### 🔧 Technical Features
- **TypeScript** for type safety and better development experience
- **React 18** with modern hooks and patterns
- **Tailwind CSS** for styling with dark mode support
- **shadcn/ui components** for consistent, accessible UI
- **Local storage** for data persistence
- **Python backend** for advanced export functionality

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Python 3.8+ (for backend features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd c25k-training-plan-visualizer
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies** (optional - for advanced exports)
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

### Running the Application

#### Frontend Only
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

#### Full Stack (with backend)
```bash
# Terminal 1 - Start frontend
npm run dev

# Terminal 2 - Start backend
cd backend
python api_server.py
```

#### Using the convenience script
```bash
chmod +x start_full_app.sh
./start_full_app.sh
```

## 📱 Usage

### First Time Setup
1. **Create your profile** - Enter basic information, fitness level, and preferences
2. **Set your goals** - Choose what you want to achieve with the C25K program
3. **Configure preferences** - Set workout times, rest days, and accessibility options
4. **Start your journey** - Begin with Week 1, Day 1

### Using the Workout Timer
1. **Select a workout** from the weekly calendar
2. **Start the timer** and follow the audio/visual cues
3. **Track your progress** as intervals are completed
4. **Review your session** and add notes if desired

### Tracking Progress
- **View achievements** earned for milestones and consistency
- **Export your data** in multiple formats for external tracking
- **Monitor weekly stats** and running time progression
- **Sync with fitness apps** (Strava, Garmin, etc.)

## 🎨 Dark Mode

The application includes comprehensive dark mode support:
- **System preference detection** - Automatically matches your device theme
- **Manual toggle** - Switch between light, dark, and system modes
- **Persistent preference** - Your choice is remembered across sessions
- **Accessible colors** - High contrast ratios in both modes

To toggle dark mode:
1. Click the theme toggle button in the top navigation
2. Choose from Light, Dark, or System options

## 📊 Export Features

### Available Formats
- **📅 ICS (Calendar)** - Import into Apple Calendar, Google Calendar, Outlook
- **📊 CSV (Spreadsheet)** - Open with Excel, Google Sheets, Numbers
- **🔗 JSON (Data)** - Use with fitness apps or custom integrations
- **📄 Markdown (Checklist)** - Print as a checklist or view in text editors

### Export Process
1. Navigate to the **Export** tab
2. Choose your desired format
3. Click **Export** to download the file
4. Import into your preferred application

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── ExportManager.tsx
│   ├── ProgramOverview.tsx
│   ├── UserProfileSetup.tsx
│   ├── WorkoutTimer.tsx
│   └── ...
├── data/               # Static data and program definitions
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── styles/             # CSS and styling

backend/
├── api_server.py       # Flask API server
├── requirements.txt    # Python dependencies
└── ...
```

## 🔧 Development

### Building for Production
```bash
npm run build
```

### Linting and Code Quality
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

## 🎯 Accessibility

The application is built with accessibility in mind:
- **Keyboard navigation** support throughout
- **Screen reader** compatibility with proper ARIA labels
- **High contrast mode** for visual accessibility
- **Large font options** for improved readability
- **Color blind friendly** design patterns

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [NHS Couch to 5K](https://www.nhs.uk/live-well/exercise/couch-to-5k-week-by-week/) for the program structure
- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Lucide React](https://lucide.dev/) for the icon set

## 🐛 Troubleshooting

### Common Issues

**Application won't start**
- Ensure Node.js 18+ is installed
- Run `npm install` to install dependencies
- Check for port conflicts on 5173

**Backend exports not working**
- Ensure Python 3.8+ is installed
- Install backend dependencies: `pip install -r backend/requirements.txt`
- Start the backend server on port 3001

**Dark mode not working**
- Clear browser cache and local storage
- Ensure JavaScript is enabled
- Check browser console for errors

### Support

For additional support, please check the [Issues](https://github.com/your-repo/issues) section or create a new issue with detailed information about your problem.

---

Built with ❤️ for runners everywhere. Happy training! 🏃‍♀️🏃‍♂️
