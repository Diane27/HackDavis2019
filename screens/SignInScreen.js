import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage
} from 'react-native';
import styles from '../styles/app.scss';

import { MonoText } from '../components/StyledText';

export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signIn} />
      </View>
    );
  }

  _signIn = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Main');
  };
}
