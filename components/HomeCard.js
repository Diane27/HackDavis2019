import React from 'react';
import { Card, Text } from 'react-native-elements';
import { NunitoText } from './StyledText';

import styles from '../styles/home-card.scss';

export default class HomeCard extends React.Component {
  render() {
    return (
      <Card containerStyle={styles.card}>
        <NunitoText>{ this.props.card.super }</NunitoText>
        <NunitoText style={styles.title}>{ this.props.card.title }</NunitoText>
        <NunitoText>{ this.props.card.subText }</NunitoText>
      </Card>
    );
  }
}
