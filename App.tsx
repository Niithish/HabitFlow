import React from 'react';
import {StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {theme} from './src/styles/theme';

const App: React.FC = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.surface}
      />
      <AppNavigator />
    </>
  );
};

export default App;
