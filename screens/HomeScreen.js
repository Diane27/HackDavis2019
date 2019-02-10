import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';

import styles from '../styles/home.scss';
import HomeCard from '../components/HomeCard.js';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'CareBuddy',
  };

  state = {
    cards: [
      {
        title: 'hello',
        message: 'John Smith',
        subText: ['Age: 71', '\n', 'Caretaker: ', <Text style={{fontFamily: 'nunito-bold'}} key="caretaker">Jane Doe</Text>]
      },
      {
        title: 'Today is',
        message: [moment().format('dddd h:mm A'), '\n', moment().format('D MMMM YYYY')],
        subText: ''
      },
      {
        title: 'A reminder for you:',
        message: 'Your caretaker will take you to the doctor at 1:00PM',
        subText: ''
      }
    ]
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
