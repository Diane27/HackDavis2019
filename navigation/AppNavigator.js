import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import CaregiverNavigator from './CaregiverNavigator';
import PatientNavigator from './PatientNavigator';
import AuthNavigator from './AuthNavigator';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthNavigator,
    Patient: PatientNavigator,
    Caregiver: CaregiverNavigator,
    Settings: createStackNavigator({
      Settings: SettingsScreen
    })
  },
  {
    initialRouteName: 'AuthLoading'
  }
));
