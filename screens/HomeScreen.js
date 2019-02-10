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
    header: null,
  };

  state = {
    cards: [
      {
        super: 'hello',
        title: 'John Smith',
        subText: ['Age: 71', '\n', 'Caretaker: Jane Doe']
      },
      {
        super: 'Today is',
        title: [moment().format('dddd h:mm A'), '\n', moment().format('D MMMM YYYY')],
        subText: ''
      },
      {
        super: 'A reminder for you:',
        title: 'Your caretaker will take you to the doctor at 1:00PM',
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
