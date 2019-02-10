import React from 'react';
import { Icon } from 'expo';
import { TouchableOpacity } from 'react-native'

export default class Fab extends React.Component {
  render() {
    return (
        <TouchableOpacity
            style={{
            backgroundColor: '#faf4ef',
            alignSelf: 'flex-end',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderRadius: 50,
            width: 50,
            height: 50
            }}
            onPress={this.props.onPress}>
            <Icon.Ionicons
                name={this.props.name}
                size={26}
                //style={{ marginBottom: -3 }}
                color='grey'
            />
            
        </TouchableOpacity>
      
    );
  }
}