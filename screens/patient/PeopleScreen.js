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
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';

import styles from '../../styles/app.scss';
import HeaderTitle from '../../components/HeaderTitle.js';

export default class PeopleScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <HeaderTitle/>,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.getParam('goToSettings')()} style={{paddingRight:20}}>
          <Icon.Ionicons name="md-cog" size={25} />
        </TouchableOpacity>
      )
    };
  };

  state = {
    me: {
      name: '',
      avatar: 'http://www.thecellartrust.org/wp-content/uploads/2017/04/Trustees.jpg'
    },
    caregivers: []
  }

  async componentDidMount() {
    this.props.navigation.setParams({ goToSettings: this._goToSettings });
    const userId = await AsyncStorage.getItem('userId');
    const getUser= await firebase.firestore().collection('users').doc(userId).get();
    const me = getUser.data();

    const getCaregivers = await firebase.firestore()
    .collection('userToUsers')
    .where('patient', '==', userId)
    .get();

    const caregivers = await Promise.all(getCaregivers.docs.map(async result => {
      const getCaregiver = await firebase.firestore().collection('users').doc(result.data().caregiver).get();
      const caregiver = getCaregiver.data();
      caregiver.id = getCaregiver.id;
      return caregiver;
    }));

    this.setState({
      me,
      caregivers
    })
  }

  _goToSettings = () => {
    this.props.navigation.navigate('Settings');
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.peopleContainer} contentContainerStyle={styles.peopleContentContainer}>
          <View style={{
            borderRadius: 1000,
            borderWidth: 75,
            borderColor: '#6e82b7'
          }}>
            <Avatar
              size="xlarge"
              rounded
              source={{uri: this.state.me.avatar}}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            />
          </View>
        {this.state.caregivers.map((caregiver, i) => {
          return <View
            key={caregiver.id}
            style={{
            borderRadius: 100,
            borderWidth: 5,
            borderColor: '#f492a5',
            position: 'absolute',
            transform: [
              { rotate: (360 / (this.state.caregivers.length || 1) * i).toString() + 'deg' },
              { translateY: 150 },
              { rotate: '-' + (360 / (this.state.caregivers.length || 1) * i).toString() + 'deg' }
            ]
          }}>
            <Avatar
              size="large"
              rounded
              source={{uri: caregiver.avatar}}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            />
          </View>
            return
          })}
        </ScrollView>
      </View>
    );
  }
}
