import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import HeaderTitle from '../../components/HeaderTitle.js';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <HeaderTitle/>
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
