import React from 'react';
import CameraComponent from '../../components/CameraComponent';
import HeaderTitle from '../../components/HeaderTitle.js';

export default class CameraScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <HeaderTitle/>
  };

  render() {
    return (
      <CameraComponent></CameraComponent>
    );
  }
}
