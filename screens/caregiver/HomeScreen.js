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
import { Icon } from 'expo';
import moment from 'moment';

import styles from '../../styles/home.scss';
import HomeCard from '../../components/HomeCard.js';
import HeaderTitle from '../../components/HeaderTitle.js';

export default class HomeScreen extends React.Component {
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

  componentDidMount() {
    this.props.navigation.setParams({ goToSettings: this._goToSettings });
  }

  _goToSettings = () => {
    this.props.navigation.navigate('Settings');
  }

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
