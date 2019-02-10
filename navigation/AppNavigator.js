import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

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
    Settings: SettingsScreen
  },
  {
    initialRouteName: 'AuthLoading'
  }
));
