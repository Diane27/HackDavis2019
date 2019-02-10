import React from 'react';
import { AsyncStorage } from 'react-native';
import { Button, View } from 'react-native-elements';
import HeaderTitle from '../components/HeaderTitle.js';

import * as firebase from 'firebase';
import QRCode from 'react-native-qrcode';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <HeaderTitle/>
  };

  _signOut = async () => {
    await firebase.auth().signOut();
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  async render() {
    let qrcode = null
    let uid = await AsyncStorage.getItem('userId');

    if (uid) {
      qrcode = <QRCode value={uid} size={200} ></QRCode>
    }

    return (
      <View>
        {qrcode && qrcode}
        <Button title="Sign Out" onPress={this._signOut} />
      </View>
    );
  }
}
