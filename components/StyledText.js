import React from 'react';
import { Text } from 'react-native';

export class NunitoText extends React.Component {
  render() {
    return <Text {...this.props} style={[{ fontFamily: 'nunito' }, this.props.style]} />;
  }
}
