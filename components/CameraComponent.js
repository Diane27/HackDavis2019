import React from 'react'
import percent from 'rnative-percent'
import { Text, View, TouchableOpacity, Platform } from 'react-native'
import { Camera, Permissions } from 'expo'
import Fab from './Fab'

export default class CameraComponent extends React.Component {

    constructor(props) {
        super(props)
 
        // Function Contructors
        this.takePicture = this.takePicture.bind(this)
        //this.uploadPicture = this.uploadPicture.bind(this)
    }
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        submit: false,
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
                        style={{ flex: 1 }} type={this.state.type}
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
        console.log("happened");
        
        if (this.camera) {
          let picture = await this.camera.takePictureAsync()
            console.log(picture)
          this.setState({
            pic: picture
          })
    
          //this.uploadPicture()
        }
    }

}