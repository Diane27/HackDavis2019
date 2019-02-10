import React from 'react';
import { AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import HeaderTitle from '../components/HeaderTitle.js';

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
