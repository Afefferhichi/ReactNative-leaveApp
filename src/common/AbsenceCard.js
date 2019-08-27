import React, {Component} from 'react';
import {Text, View} from 'react-native';

class AbsenceCard extends Component {
  render() {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Duration: </Text>
          <Text style={{color: 'blue'}}>12/01/2018</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>FROM: </Text>
          <Text>HEART, JENNIFER</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>EMPLOYEE: </Text>
          <Text>HEART, JENNIFER</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>STATUS: </Text>
          <Text>PENDING</Text>
        </View>
      </View>
    );
  }
}

export default AbsenceCard;
