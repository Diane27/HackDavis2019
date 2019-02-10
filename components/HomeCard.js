import React from 'react';
import { Card, Text } from 'react-native-elements';
import { NunitoText } from './StyledText';

import styles from '../styles/home-card.scss';

export default class HomeCard extends React.Component {
  render() {
    return (
      <Card containerStyle={styles.card} title={this.props.card.title} titleStyle={styles.title}>
        <NunitoText style={styles.message}>{this.props.card.message}</NunitoText>
        <NunitoText style={styles.subText}>{this.props.card.subText}</NunitoText>
      </Card>
    );
  }
}
