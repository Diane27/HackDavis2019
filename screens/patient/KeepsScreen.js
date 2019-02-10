import React from 'react';
import {
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { Button } from 'react-native-elements';
import { Icon } from 'expo';
import * as firebase from 'firebase';

import styles from '../../styles/app.scss';
import HomeCard from '../../components/HomeCard.js';
import HeaderTitle from '../../components/HeaderTitle.js';
import Spinner from 'react-native-loading-spinner-overlay';

export default class KeepsScreen extends React.Component {
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
    userId: '',
    keeps: [],
    newKeep: '',
    modalVisible: false,
    spinner: false
  }

  async componentDidMount() {
    this.props.navigation.setParams({ goToSettings: this._goToSettings });
    const userId = await AsyncStorage.getItem('userId');
    this.setState({
      userId: userId
    }, () => {
      this.getKeeps();
    });
  }

  getKeeps = async () => {
    const getMine = await firebase.firestore()
    .collection('keeps')
    .where('user', '==', this.state.userId)
    .get();

    const myKeeps = getMine.docs.map(result => result.data());

    this.setState({
      keeps: myKeeps
    });
  }


  _goToSettings = () => {
    this.props.navigation.navigate('Settings');
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  async saveKeep() {
    try {
      this.setState({
        spinner: true
      });

      const { newKeep } = this.state;

      if (!newKeep) {
        throw `You can't save an empty note!`;
      }

      const createKeep = await firebase.firestore().collection('keeps').doc().set({
        user: this.state.userId,
        note: newKeep
      });

      this.setState({
        newKeep: '',
        spinner: false,
        modalVisible: false
      }, () => {
        this.getKeeps();
      });
    } catch (err) {
      this.setState({
        spinner: false
      }, () => {
        Alert.alert('Error', JSON.stringify(err));
      });
    }
  }

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
                    onChangeText={(newKeep) => this.setState({newKeep})}
                    value={this.state.newKeep}
                    placeholder="Note to self"
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
                  this.saveKeep();
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
          <Button
            title="Create New Note"
            buttonStyle={styles.createButton}
            titleStyle={styles.buttonText}
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }} />
          {
            this.state.keeps.map((keep, i) => <HomeCard card={{subText: keep.note}} key={i}></HomeCard>)
          }
        </ScrollView>
      </View>
    );
  }
}
