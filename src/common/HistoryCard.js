import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class HistoryCard extends React.Component {
  render() {
    return (
      <View>
        <View style={{
          marginTop: 5,
          borderBottomColor: 'white',
          borderWidth: 1,
          borderColor: '#ddd',
          backgroundColor: '#f2f2f2',
          height: '25%',
          width: '100%',
          justifyContent: 'center'
        }}>
          <Text style={{color: '#000000', fontWeight: 'bold', marginLeft: 20}}>{this.props.topText}</Text>

        </View>
        <View
          style={{
            backgroundColor: '#f2f2f2',
            padding: 10,
            //   margin: 10,
            flexDirection: 'row',
            borderColor: '#ddd',
            borderWidth: 1
          }}
        >

          <View style={{marginLeft: 10, width: '60%'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'black'}}>{this.props.shift} :</Text>
              <Text style={{color: 'black'}}>Time: {this.props.time}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'black'}}>Morning :</Text>
              <Text style={{color: 'black'}}>Time: 6: 00, pm</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'black'}}>Morning :</Text>
              <Text style={{color: 'black'}}>Time: 6: 00, pm</Text>
            </View>
          </View>
          <View style={{alignItems: 'center', alignSelf: 'center'}}>
            <Icon
              name='md-arrow-dropright'
              size={30}
              style={{paddingLeft: 10, paddingRight: 20, alignSelf: 'flex-end', marginLeft: 75}}
              onPress={this.props.onPress}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default HistoryCard;
