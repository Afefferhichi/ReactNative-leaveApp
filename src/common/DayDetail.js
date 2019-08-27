import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class DayDetail extends Component {
  render() {
    return (
      <View>
        <View
          style={{
            height: 30,
            width: '100%',
            backgroundColor: '#f3f3f3',
            justifyContent: 'center'
          }}
        >
          <Text style={{alignSelf: 'center'}}>{this.props.DayHeader}</Text>
        </View>
        <View
          style={{
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: '#ddd',
            padding: 15,
            flexDirection: 'row'
          }}
        >
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <Text>Morning:</Text>
              <Text>{this.props.Time1}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text>Afternoon:</Text>
              <Text>{this.props.Time2}</Text>
            </View>
          </View>
          <View
            style={{
              height: 35,
              width: 35,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 50,
              marginLeft: 130
            }}
          >
            <Icon
              activeOpacity={0.8}
              name='md-arrow-down'
              style={{color: 'red'}}
              size={22}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default DayDetail;
