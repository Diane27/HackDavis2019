import React from 'react';
import {
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'expo';
import * as firebase from 'firebase';

import styles from '../../styles/home.scss';
import HeaderTitle from '../../components/HeaderTitle.js';

export default class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <HeaderTitle/>,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.getParam('goToSettings')()} style={{paddingRight:20}}>
          <Icon.Ionicons name="md-cog" size={25} color="#6e82b7"/>
        </TouchableOpacity>
      )
    };
  };

  async componentDidMount() {
    this.props.navigation.setParams({ goToSettings: this._goToSettings });
    const userId = await AsyncStorage.getItem('userId');
    const result = await firebase.firestore().collection('users').doc(userId).get();
    const name = result.get('name');
  }

  _goToSettings = () => {
    this.props.navigation.navigate('Settings');
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text>Chat</Text>
        </ScrollView>
      </View>
    );
  }
}
