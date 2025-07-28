# HabitFlow

Cross-platform habit tracker and daily task manager built with React Native

## 🌟 Features

- **Habit Tracking**: Build and maintain daily habits with streak tracking
- **Task Management**: Organize daily tasks with priority levels
- **Cross-Platform**: Runs on both iOS and Android
- **Offline First**: All data stored locally with AsyncStorage
- **Beautiful UI**: Clean, modern interface following design system principles
- **TypeScript**: Full type safety throughout the application

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 18)
- npm (>= 8)
- React Native development environment set up
- Android Studio or Xcode for device/emulator testing

### Installation

1. Clone the repository
```bash
git clone https://github.com/Niithish/HabitFlow.git
cd HabitFlow
```

2. Install dependencies
```bash
npm install
```

3. Install iOS dependencies (macOS only)
```bash
cd ios && pod install && cd ..
```

### Running the App

#### Android
```bash
npm run android
```

#### iOS
```bash
npm run ios
```

#### Start Metro Bundler
```bash
npm start
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (Button, Input, Card, Header)
│   ├── habits/          # Habit-specific components
│   ├── tasks/           # Task-specific components
│   └── dashboard/       # Dashboard components
├── screens/             # Screen components
│   ├── auth/           # Authentication screens
│   ├── main/           # Main app screens
│   └── modals/         # Modal screens
├── navigation/          # Navigation configuration
├── services/           # Data services and API layer
├── context/            # React Context for state management
├── styles/             # Theme and styling configuration
└── utils/              # Utility functions
```

## 🛠️ Technology Stack

- **React Native 0.72+** - Cross-platform mobile framework
- **TypeScript** - Type safety and better development experience
- **React Navigation v6** - Navigation with bottom tabs
- **AsyncStorage** - Local data persistence
- **React Context API** - State management
- **React Native Vector Icons** - Icon library
- **React Native Reanimated** - Smooth animations

## 📱 Core Features

### Habit Management
- Create custom habits with icons and colors
- Track daily completion with streak counters
- Flexible frequency settings (daily, weekly, custom)
- Habit categories and organization

### Task Management
- Create tasks with priority levels (high, medium, low)
- Due date tracking
- Task completion with progress tracking
- Filter tasks by status and priority

### Dashboard
- Overview of daily progress
- Completion statistics
- Quick actions for adding habits and tasks
- Weekly calendar view

### Data Management
- Local storage with AsyncStorage
- Data export/import functionality
- Offline-first approach
- Future backend integration ready

## 🎨 Design System

### Colors
- Primary: #6366F1 (Indigo)
- Secondary: #10B981 (Emerald)
- Success: #22C55E (Green)
- Warning: #F59E0B (Amber)
- Error: #EF4444 (Red)

### Typography
- Font sizes: 12px to 36px scale
- Font weights: Normal (400) to Bold (700)
- Consistent line heights

### Spacing
- 4px base unit system
- Spacing scale: 4, 8, 16, 24, 32, 48px

### Components
- Consistent border radius (6, 12, 16px)
- Elevation system for cards and modals
- Standardized button variants and sizes

## 🧪 Development

### Scripts

```bash
npm start          # Start Metro bundler
npm run android    # Run on Android
npm run ios        # Run on iOS
npm test           # Run tests
npm run typescript # Type checking
npm run lint       # Code linting
```

### Code Quality

- **ESLint** - Code linting with React Native configuration
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Jest** - Testing framework

### Testing

Run the test suite:
```bash
npm test
```

Type checking:
```bash
npm run typescript
```

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue in the GitHub repository.

---

**HabitFlow** - Build great habits, achieve your goals! 🌟
