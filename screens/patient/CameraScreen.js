import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'expo';
import CameraComponent from '../../components/CameraComponent';
import HeaderTitle from '../../components/HeaderTitle.js';

export default class CameraScreen extends React.Component {
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
    return <CameraComponent />;
  }
}
