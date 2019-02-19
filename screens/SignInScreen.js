import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import styles from '../styles/app.scss';
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderTitle from '../components/HeaderTitle';

import * as firebase from 'firebase';
import 'firebase/firestore';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  state = {
    spinner: false
  }

  render() {
    return (
      <View style={styles.welcomeContainer}>
        <HeaderTitle />
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Input
          name="email"
          placeholder='name@email.com'
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          onChangeText={(email) => this.setState({email})}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          returnKeyType="next"
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
    try {
      this.setState({
        spinner: true
      });

      const { email, password } = this.state;
      const signin = await firebase.auth().signInWithEmailAndPassword(email, password).catch(function(err){
        console.log(err.message);
      });
      const result = await firebase.firestore().collection('users').doc(signin.user.uid).get();
      const role = result.data().role;

      this.setState({
        spinner: false
      });

      await AsyncStorage.setItem('userId', signin.user.uid);

      if (role === 'caregiver') {
        this.props.navigation.navigate('Caregiver');
      } else {
        this.props.navigation.navigate('Patient');
      }
    } catch (err) {
      this.setState({
        spinner: false
      }, () => {
        Alert.alert('Error', JSON.stringify(err));
      });
    }
  };

  _goToSignUp = () => {
    this.props.navigation.navigate('SignUp');
  }
}
