import React from 'react';
import {
  Text,
  View,
  Button,
  AsyncStorage,
  Picker
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import styles from '../styles/app.scss';

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
    role: 'caregiver'
  };

  render() {
    return (
      <View style={styles.welcomeContainer}>
        <Input
          name="name"
          placeholder='Firstname Lastname'
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          onChangeText={(name) => this.setState({name})}
        />
        <Input
          name="email"
          placeholder='name@email.com'
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
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
        <Picker
          selectedValue={this.state.role}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({role: itemValue})
          }>
          <Picker.Item label="Caregiver" value="caregiver" />
          <Picker.Item label="Patient" value="patient" />
        </Picker>
        <Button title="Create Account" onPress={this._signUp} />
      </View>
    );
  }

  _signUp = async () => {
    try {
      const { name, email, password, role } = this.state;

      if (!name || !email || !password || !role) {
        throw `Please fill out all the fields correctly`;
      }

      const signup = await firebase.auth().createUserWithEmailAndPassword(email, password);

      const uid = signup.user.uid;

      const newDoc = await firebase.firestore().collection('users').doc(uid).set({
        name,
        role
      });

      this.props.navigation.navigate('Auth');
    } catch (err) {
      console.error(err);
    }
  };
}
