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
import moment from 'moment';
import * as firebase from 'firebase';

import styles from '../../styles/home.scss';
import HomeCard from '../../components/HomeCard.js';
import HeaderTitle from '../../components/HeaderTitle.js';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <HeaderTitle/>,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.getParam('goToSettings')()} style={{paddingRight:20}}>
          <Icon.Ionicons name="md-cog" size={25} color="#6e82b7" />
        </TouchableOpacity>
      )
    };
  };

  async componentDidMount() {
    this.props.navigation.setParams({ goToSettings: this._goToSettings });
    const userId = await AsyncStorage.getItem('userId');
    const result = await firebase.firestore().collection('users').doc(userId).get();
    const name = result.get('name');
    const nameCard = this.state.cards[0];
    nameCard.message = name;
    const getReminder = await firebase.firestore().collection('reminders').doc(userId).get();
    const reminder = getReminder.data().reminder;
    const reminderCard = this.state.cards[2];
    reminderCard.message = reminder;

    this.setState({
      cards: [nameCard, this.state.cards[1], reminderCard]
    });
  }

  _goToSettings = () => {
    this.props.navigation.navigate('Settings');
  }

  state = {
    cards: [
      {
        title: 'Hello,',
        message: '',
        subText: ''
      },
      {
        title: 'Today is',
        message: [moment().format('dddd h:mm A'), '\n', moment().format('D MMMM YYYY')],
        subText: ''
      },
      {
        title: 'A reminder for you:',
        message: '',
        subText: ''
      }
    ],
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {this.state.cards.map((card, i) => <HomeCard card={card} key={i}></HomeCard>)}
        </ScrollView>
      </View>
    );
  }
}
