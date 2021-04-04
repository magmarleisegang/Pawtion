/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  // Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Header from './src/elements/header'
import Main from './src/Main'
import PortionCalculator from './src//calculator/PortionCalculator'


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
   // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}> */}
        <View>
        <Header />
        <PortionCalculator />
      </View>
    </SafeAreaView>
  );
};

export default App;
