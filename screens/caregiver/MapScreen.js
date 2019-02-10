import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native';
import { Icon } from 'expo';
import HeaderTitle from '../../components/HeaderTitle.js';

export default class MapScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <HeaderTitle/>,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.getParam('goToSettings')()} style={{paddingRight:20}}>
          <Icon.Ionicons name="md-cog" size={25} />
        </TouchableOpacity>
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ goToSettings: this._goToSettings });
  }

  _goToSettings = () => {
    this.props.navigation.navigate('Settings');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Map here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
