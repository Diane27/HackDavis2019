import React from 'react'
import percent from 'rnative-percent'
import { Text, View, TouchableOpacity, Platform } from 'react-native'
import { Camera, Permissions } from 'expo'
import Fab from './Fab'
import Environment from "../config/environment"
//import firebase from "../utils/firebase";

export default class CameraComponent extends React.Component {

    constructor(props) {
        super(props)
 
        // Function Contructors
        this.takePicture = this.takePicture.bind(this)
        this.uploadPicture = this.uploadPicture.bind(this)
    }
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        uploading: false,
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
          hasCameraPermission: status === 'granted',
          textData: ''
        })
    }

    render () {
        const { hasCameraPermission } = this.state
        if (hasCameraPermission === null) {
            return <View />
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera 
                        style={{ flex: 1 }}
                        ref={ref => (this.camera = ref)}
                        type={this.state.type}>
                        <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            style={{
                            flex: 0.1,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            }}
                            onPress={() => {
                            this.setState({
                                type: this.state.type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back,
                            });
                            }}>
                            <Text
                            style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                            {' '}Flip{' '}
                            </Text>
                        </TouchableOpacity>
                        <Fab name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'}
                            onPress={this.takePicture.bind(this)}>
                        </Fab>
                        </View>
                    </Camera>
                </View>
            )
        }
    }

    async takePicture() {
        if (this.camera) {
          let picture = await this.camera.takePictureAsync({base64:true, quality:0.5, skipProcessing:true});
          this.camera.pausePreview();
          this.setState({image: picture}, async ()=>{
            let response = await this.uploadPicture();
            this.props.previewPicture(this.state.image, response);
          });
        }
    }

    uploadPicture = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                this.setState({ uploading: true });
                let { image } = this.state;
                let body = JSON.stringify({
                  requests: [
                    {
                      features: [
                        { type: "LABEL_DETECTION", maxResults: 10 },
                        { type: "FACE_DETECTION", maxResults: 5 },
                        { type: "CROP_HINTS", maxResults: 5 },
                      ],
                      image: {
                        content: image.base64,
                      }
                    }
                  ]
                });
                //console.log(` request body ${body}`)
                let response = await fetch(
                  "https://vision.googleapis.com/v1/images:annotate?key=" +
                    Environment["GOOGLE_CLOUD_VISION_API_KEY"],
                  {
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: body
                  }
                );
                let responseJson = await response.json();
                //console.log(responseJson);
                this.setState({
                  googleResponse: responseJson.responses[0],
                  uploading: false
                }, ()=> {
                    // console.log(this.state.googleResponse);
                    resolve(this.state.googleResponse);
                });
              } catch (error) {
                console.log(error);
                reject(error);
              }
        });
        };

}