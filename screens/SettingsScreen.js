import React from 'react';
import { AsyncStorage } from 'react-native';
import { Button, View } from 'react-native-elements';
import HeaderTitle from '../components/HeaderTitle.js';
import styles from '../styles/home.scss';

import * as firebase from 'firebase';
import QRCode from 'react-native-qrcode';

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <HeaderTitle/>,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.getParam('goBack')()} style={{paddingRight:20}}>
          <Icon.Ionicons name="md-arrow-back" size={25} />
        </TouchableOpacity>
      )
    };
  };

  state = {
    role: null
  }

  async componentDidMount() {
    this.props.navigation.setParams({ goBack: this._goBack });
    const userId = await AsyncStorage.getItem('userId');
    const result = await firebase.firestore().collection('users').doc(userId).get();
    this.setState({ role: result.data().role });
  }

  _goBack = () => {
    if (this.state.role === 'caregiver') {
      this.props.navigation.navigate('Caregiver');
    } else {
      this.props.navigation.navigate('Patient');
    }
  }

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
