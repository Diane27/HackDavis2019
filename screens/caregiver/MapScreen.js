import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'CareBuddy',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Map here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
