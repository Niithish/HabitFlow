import React from 'react';
import 'react-native-gesture-handler';
import { AppProvider } from './context/AppContext';
import AppNavigator from './navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
};

export default App;