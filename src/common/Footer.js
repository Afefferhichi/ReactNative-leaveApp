import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Footer extends Component {
  render() {
    return (
      <View
        style={{
          height: 40,
          width: '100%',
          backgroundColor: '#f3f3f3',
          justifyContent: 'center',
          flexDirection: 'row'
        }}
      >
        <View style={{ width: '25%' }}>
          <Button title='Open' onPress={this.props.onPress} />
        </View>
        <View
          style={{
            height: 35,
            width: 40,
            backgroundColor: 'tomato',
            marginLeft: 10
          }}
        >
          <Icon name='md-menu' size={29} style={{ marginLeft: 10 }} />
        </View>
      </View>
    );
  }
}

export default Footer;
