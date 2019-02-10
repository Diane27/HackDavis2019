import React from 'react';
import {
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal
} from 'react-native';
import { Icon } from 'expo';
import { Button, Avatar } from 'react-native-elements';
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
    caregivers: [],
    modalVisible: false,
    selectedCaregiver: {}
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
      caregiver.note = result.data().note || '';
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

  _openCaregiver = (index) => {
    this.setState({
      selectedCaregiver: this.state.caregivers[index]
    }, () => {
      this.setState({ modalVisible: true });
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={styles.container}>
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
                height: 300,
                width: 300,
                borderRadius: 25,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff'
              }}>

              <Avatar
                size="xlarge"
                rounded
                source={{uri: this.state.selectedCaregiver.avatar}}
                activeOpacity={0.7}
              />
            <Text style={styles.peopleCardHeading}>{this.state.selectedCaregiver.name}</Text>
            <Text style={styles.peopleCardText}>{this.state.selectedCaregiver.note}</Text>

              <Button
                title="Close"
                buttonStyle={styles.closeButton}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }} />
            </View>
          </View>
        </Modal>

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
              onPress={() => this._openCaregiver(i)}
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
