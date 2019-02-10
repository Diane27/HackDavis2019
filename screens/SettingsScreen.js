import React from 'react';
import HeaderTitle from '../components/HeaderTitle.js';
import { Button, Text } from 'react-native-elements';

import * as firebase from 'firebase';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <HeaderTitle/>
  };

  _signOut = async () => {
    await firebase.auth().signOut();
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (
      <Button title="Sign Out" onPress={this._signOut} />
    );
  }
}
