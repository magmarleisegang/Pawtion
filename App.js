import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PortionCalculator from './PortionCalculator'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello world</Text>
        <PortionCalculator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
