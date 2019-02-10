import React from 'react';
import CameraComponent from '../../components/CameraComponent';

export default class CameraScreen extends React.Component {
  static navigationOptions = {
    title: 'CareBuddy',
  };

  render() {
    return (
      <CameraComponent></CameraComponent>
    );
  }
}
