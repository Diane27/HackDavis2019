import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import styles from '../styles/app.scss';

import * as firebase from 'firebase';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <View style={styles.welcomeContainer}>
        <Input
          name="email"
          placeholder='name@email.com'
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          onChangeText={(email) => this.setState({email})}
        />
        <Input
          name="password"
          secureTextEntry={true}
          password={true}
          placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'
          leftIcon={{ type: 'font-awesome', name: 'key' }}
          onChangeText={(password) => this.setState({password})}
        />
        <Button title="Sign In" onPress={this._signIn} />
        <Button title="Sign Up" onPress={this._goToSignUp} />
      </View>
    );
  }

  _signIn = async () => {
    const { email, password } = this.state;
    const user = firebase.auth().signInWithEmailAndPassword(email, password);
    this.props.navigation.navigate('Main');
  };

  _goToSignUp = () => {
    this.props.navigation.navigate('SignUp');
  }
}
