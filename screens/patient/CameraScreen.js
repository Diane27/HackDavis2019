import React from 'react';
import { TouchableOpacity, ImageBackground, View, Text } from 'react-native';
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
    face: null,
    name: null
  };

  componentDidMount() {
    this.props.navigation.setParams({ goToSettings: this._goToSettings });

    this.props.navigation.addListener('willFocus', () => {
      this.setState({ picture: null, face: null });
    });
  }

  _goToSettings = () => {
    this.props.navigation.navigate('Settings');
  }

  previewPicture = (pic, response) => {
    const picUri = 'data:image/jpeg;base64,' + pic.base64;
    const {width, height} = pic;
    let face = null;
    let name = name;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = 0;
    let maxY = 0;

    console.log(response);

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

    if (response.labelAnnotations && response.labelAnnotations.length > 0) {
      let glasses = false;
      let dreadlocks = false;

      response.labelAnnotations.forEach((annotation) => {
        if (annotation.description === 'Glasses' || annotation.description === 'Eyewear') {
          glasses = true;
        } else if (annotation.description === 'Dreadlocks') {
          dreadlocks = true;
        }
      });

      if (glasses) {
        name = 'Nadya';
      } else if (dreadlocks) {
        name = 'Diane';
      } else {
        name = 'Jesse';
      }
    }

    this.setState({ picture: picUri, face, name });
  }

  render() {
    if (this.state.picture) {
      return (<ImageBackground
        source={{
            isStatic: true,
            uri: this.state.picture,
          }}
        style={{height: '100%', width:'100%', position:'relative', flexDirection:'row', justifyContent:'center'}}>
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
          {this.state.name && <Text
          style={{
            position: 'absolute',
            bottom: 20,
            backgroundColor: '#000',
            color: '#fff',
            fontFamily: 'nunito',
            fontSize: 25
          }}>{' This is ' + this.state.name + ' '}</Text>}
        </ImageBackground>)
    } else {
      return <CameraComponent previewPicture={this.previewPicture} />;
    }
  }
}
