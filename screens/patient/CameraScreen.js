import React from 'react';
import { TouchableOpacity, ImageBackground, View } from 'react-native';
import { Icon } from 'expo';
import CameraComponent from '../../components/CameraComponent';
import HeaderTitle from '../../components/HeaderTitle.js';

export default class CameraScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <HeaderTitle/>,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.getParam('goToSettings')()} style={{paddingRight:20}}>
          <Icon.Ionicons name="md-cog" size={25} color="#6e82b7" />
        </TouchableOpacity>
      )
    };
  };

  state = {
    picture: null,
    face: null
  };

  componentDidMount() {
    this.props.navigation.setParams({ goToSettings: this._goToSettings });
  }

  _goToSettings = () => {
    this.props.navigation.navigate('Settings');
  }

  previewPicture = (pic, response) => {
    const picUri = 'data:image/jpeg;base64,' + pic.base64;
    const {width, height} = pic;
    let face = null;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = 0;
    let maxY = 0;

    if (response.faceAnnotations && response.faceAnnotations.length > 0) {
      let vertices = response.faceAnnotations[0].boundingPoly.vertices;

      for (let { x, y } of vertices) {
        if (x < minX) {
          minX = x;
        } else if (x > maxX) {
          maxX = x;
        }

        if (y < minY) {
          minY = y;
        } else if (y > maxY) {
          maxY = y;
        }
      }

      let x = (minX / width) * 100;
      let y = (minY / height) * 100;
      let faceHeight = ((maxY - minY) / height) * 100;
      let faceWidth = ((maxX - minX) / width) * 100;

      face = { x:  `${x}%`, y: `${y}%`, height: `${faceHeight}%`, width: `${faceWidth}%` };
    }

    this.setState({ picture: picUri, face });
  }

  render() {
    if (this.state.picture) {
      return (<ImageBackground
        source={{
            isStatic: true,
            uri: this.state.picture,
          }}
        style={{height: '100%', width:'100%', position:'relative'}}>
        {this.state.face && <View
          style={{
            position: 'absolute',
            top: this.state.face.y,
            left: this.state.face.x,
            height: this.state.face.height,
            width: this.state.face.width,
            borderWidth: 3,
            borderColor: '#ff0',
            borderRadius: 10
          }}>
          </View>}
        </ImageBackground>)
    } else {
      return <CameraComponent previewPicture={this.previewPicture} />;
    }
  }
}
