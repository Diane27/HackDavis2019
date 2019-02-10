import React from 'react';
import {
  AsyncStorage,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import { Button, Image } from 'react-native-elements';
import { Icon } from 'expo';
import HeaderTitle from '../components/HeaderTitle.js';
import styles from '../styles/home.scss';

import * as firebase from 'firebase';
import * as QRCode from 'qrcode';

const generateQR = async text => {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error(err)
  }
}

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
    let qrcode = []
    let uid = await AsyncStorage.getItem('userId');

    if (uid) {
      // console.log(await generateQR(uid));
      // qrcode.push(<Image source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==' }} style={{width: 400, height: 400}} key="qr"/>);
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Button title="Sign Out" onPress={this._signOut} />
        </ScrollView>
      </View>
    );
  }
}
