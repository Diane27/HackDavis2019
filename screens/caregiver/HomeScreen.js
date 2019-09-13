import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Icon } from 'expo';
import moment from 'moment';

import * as firebase from 'firebase';

import styles from '../../styles/app.scss';
import HomeCard from '../../components/HomeCard.js';
import HeaderTitle from '../../components/HeaderTitle.js';
import Spinner from 'react-native-loading-spinner-overlay';

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

    const reminderId = 'EWiuZ9QmJCP9ObOqPtFlNuZDOEt1';
    const getReminder = await firebase.firestore().collection('reminders').doc(reminderId).get();
    const reminder = getReminder.data().reminder;
    const reminderCard = this.state.cards[1];
    reminderCard.message = reminder;

    this.setState({
      cards: [nameCard, reminderCard],
      reminder
    });
  }

  _goToSettings = () => {
    this.props.navigation.navigate('Settings');
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  async saveReminder() {
    try {
      this.setState({
        spinner: true
      });

      const { reminder } = this.state;

      if (!reminder) {
        reminder = '';
      }

      const createKeep = await firebase.firestore().collection('reminders').doc('EWiuZ9QmJCP9ObOqPtFlNuZDOEt1').update({
        reminder
      });

      this.setState({
        spinner: false,
        modalVisible: false
      });
    } catch (err) {
      Alert.alert('Error', JSON.stringify(err));
    }
  }

  state = {
    cards: [
      {
        title: 'Hello,',
        message: '',
        subText: ''
      },
      {
        title: 'A reminder for your patient:',
        message: '',
        subText: ''
      }
    ],
    reminder: '',
    modalVisible: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => console.log('ey')}
        >
          <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00000080'
            }}>
            <View style={{
                height: 375,
                width: 300,
                borderRadius: 25,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff'
              }}>

              <View style={{
                borderBottomWidth: 3,
                borderColor: '#f492a5',
                flex: 1,
                width: 300
                }}>
                <TextInput
                    multiline = {true}
                    numberOfLines = {10}
                    onChangeText={(reminder) => this.setState({reminder})}
                    value={this.state.reminder}
                    placeholder="Note to patient"
                    style={{
                      fontFamily: 'nunito',
                      fontSize: 20,
                      textAlignVertical: 'top',
                      padding: 20}}
                />
              </View>


              <Button
                title="Save"
                buttonStyle={styles.closeButton}
                titleStyle={styles.buttonText}
                onPress={() => {
                  this.saveReminder();
              }} />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              >
              <Text style={styles.cancelText}>Close</Text>
            </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {this.state.cards.map((card, i) => <HomeCard card={card} key={i}></HomeCard>)}
          <Button
            title="Edit Reminder"
            buttonStyle={styles.createButton}
            titleStyle={styles.buttonText}
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }} />
        </ScrollView>
      </View>
    );
  }
}
