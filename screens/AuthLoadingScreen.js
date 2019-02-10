import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import styles from '../styles/app.scss';

import * as firebase from 'firebase';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  async _bootstrapAsync() {
    const unsub = firebase.auth().onAuthStateChanged(async user => {
      unsub();
      if (user) {
        const userId = user.uid;
        const result = await firebase.firestore().collection('users').doc(userId).get();
        const role = result.get('role');

        if (role === 'caregiver') {
          this.props.navigation.navigate('Caregiver');
        } else {
          this.props.navigation.navigate('Patient');
        }
      } else {
        this.props.navigation.navigate('Auth');
      }
    });
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
