

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/routes/router';
import AuthProvider from './src/screens/contexts/context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';



  return (

    <NavigationContainer>
      <AuthProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}backgroundColor='#f0f4ff'/>
        <Router />
      </AuthProvider>
    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
