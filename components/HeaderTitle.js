import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/header-title.scss';

export default class HeaderTitle extends React.Component {
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.primary}>Care</Text><Text style={styles.secondary}>Buddy</Text>
      </View>
    );
  }
}
