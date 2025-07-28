# HabitFlow

Cross-platform habit tracker and daily task manager built with React Native. HabitFlow combines habit tracking with daily task management in one unified interface, designed for self-improvement enthusiasts who want to build consistent habits and stay organized.

## Features

- **Habit Tracking**: Create and track daily habits with streak counters
- **Task Management**: Organize daily tasks with priority levels and due dates
- **Dashboard**: Progress overview with completion percentages and statistics
- **Local Storage**: All data stored locally using AsyncStorage for offline functionality
- **Cross-Platform**: Built with React Native for iOS and Android

## Tech Stack

- **React Native 0.72+** with TypeScript
- **React Navigation v6** with bottom tabs
- **AsyncStorage** for local data persistence
- **React Native Vector Icons** (Ionicons)
- **React Native Reanimated** for smooth animations

## Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   ├── habits/           # Habit-specific components
│   ├── tasks/            # Task-specific components
│   └── dashboard/        # Dashboard components
├── screens/
│   ├── main/             # Main tab screens
│   └── modals/           # Modal screens
├── navigation/           # Navigation configuration
├── services/             # API and storage services
├── styles/               # Theme and styling
└── utils/                # Utility functions
```

## Setup Instructions

### Prerequisites

- Node.js 16+ 
- React Native development environment set up
- iOS Simulator (for iOS development)
- Android Studio and Android SDK (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Niithish/HabitFlow.git
   cd HabitFlow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the application**
   
   For iOS:
   ```bash
   npm run ios
   ```
   
   For Android:
   ```bash
   npm run android
   ```

### Development Scripts

- `npm start` - Start Metro bundler
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run tests

## Design System

### Colors
- Primary: #6366F1 (Indigo)
- Secondary: #10B981 (Emerald)
- Success: #22C55E (Green)
- Error: #EF4444 (Red)
- Warning: #F59E0B (Amber)

### Spacing
- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 32px
- XXL: 48px

### Typography
- H1: 32px, Bold
- H2: 24px, SemiBold
- H3: 20px, SemiBold
- Body: 16px, Regular
- Caption: 14px, Regular

## Core Features

### Habit Tracking
- Create habits with custom colors and frequencies
- Track daily completions with streak counters
- View habit history and progress

### Task Management
- Create tasks with priority levels (Low, Medium, High)
- Set due dates and track completion status
- Delete completed tasks

### Dashboard
- Daily progress overview
- Completion percentage for habits
- Statistics for habits and tasks

## Future Enhancements

- User authentication and cloud sync
- Habit analytics and insights
- Task categories and tags
- Reminder notifications
- Data export/import
- Social features and challenges

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
