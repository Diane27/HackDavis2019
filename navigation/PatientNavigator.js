import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/patient/HomeScreen';
import PeopleScreen from '../screens/patient/PeopleScreen';
import CameraScreen from '../screens/patient/CameraScreen';
import KeepsScreen from '../screens/patient/KeepsScreen';
import ChatScreen from '../screens/patient/ChatScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const PeopleStack = createStackNavigator({
  People: PeopleScreen,
});

PeopleStack.navigationOptions = {
  tabBarLabel: 'People',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-people${focused ? '' : '-outline'}`
          : 'md-people'
      }
    />
  ),
};

const CameraStack = createStackNavigator({
  Camera: CameraScreen,
});

CameraStack.navigationOptions = {
  tabBarLabel: 'Camera',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'}
    />
  ),
};

const KeepsStack = createStackNavigator({
  Keeps: KeepsScreen,
});

KeepsStack.navigationOptions = {
  tabBarLabel: 'Keeps',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-cube' : 'md-cube'}
    />
  ),
};

const ChatStack = createStackNavigator({
  Chat: ChatScreen,
});

ChatStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles'}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  PeopleStack,
  CameraStack,
  KeepsStack,
  ChatStack
},
{
  tabBarOptions: {
    activeTintColor: '#f492a5'
  }
});
