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
          <Icon.Ionicons name="md-cog" size={25} />
        </TouchableOpacity>
      )
    };
  };

  async componentDidMount() {
    this.props.navigation.setParams({ goToSettings: this._goToSettings });
    const userId = await AsyncStorage.getItem('userToken');
    const result = await firebase.firestore().collection('users').doc(userId).get();
    const name = result.get('name');
    const nameCard = this.state.cards[0];
    nameCard.message = name;

    this.setState({
      cards: [nameCard, ...this.state.cards.slice(1)]
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
