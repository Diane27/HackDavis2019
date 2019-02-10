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
import { Card, ListItem, Button, Avatar } from 'react-native-elements';
import * as firebase from 'firebase';

import styles from '../../styles/app.scss';
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

  state = {
    chats: []
  }

  async componentDidMount() {
    this.props.navigation.setParams({ goToSettings: this._goToSettings });
    const userId = await AsyncStorage.getItem('userId');
    const result = await firebase.firestore().collection('users').doc(userId).get();
    const getChats = await firebase.firestore().collection('chats').get();

    const chats = await Promise.all(getChats.docs.map(async result => {
      const chat = result.data();
      const getUser = await firebase.firestore().collection('users').doc(chat.user).get();
      chat.user = getUser.data();
      return chat;
    }));

    this.setState({
      chats
    })
  }

  _goToSettings = () => {
    this.props.navigation.navigate('Settings');
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Card containerStyle={{padding: 0}} >
            {
              this.state.chats.map((c, i) => {
                return (
                  <ListItem
                    key={i}
                    roundAvatar
                    title={c.user.name}
                    subtitle={c.text}
                    leftAvatar={{source:{uri:c.user.avatar}}}
                    titleStyle={styles.chatUser}
                    subtitleStyle={styles.chatText}
                  />
                );
              })
            }
          </Card>
        </ScrollView>
      </View>
    );
  }
}
