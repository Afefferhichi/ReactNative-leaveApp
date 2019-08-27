import React from 'react';
import {Image, Text, View} from 'react-native';
import Header from '../common/Header';

class AbsenceHistory extends React.Component {
  render() {
    return (
      <View>
        <Header HeaderText='History'/>
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
          <Image
            source={require('../../assets/icons/img.png')}
            style={{
              width: 60,
              height: 60,
              backgroundColor: '#f2f2f2',
              borderRadius: 3
            }}
          />
          <View style={{marginLeft: 10, width: '60%'}}/>
          <View style={{alignItems: 'center', alignSelf: 'center'}}/>

        </View>
        <View>
          <View style={{height: 40, width: '100%', borderColor: '#ddd'}}>
            <Text style={{marginLeft: 20}}>History</Text>

          </View>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text>hdfahd</Text>
              <Text>4343</Text>
            </View>
          </View>
        </View>


      </View>
    );
  }
}

export default AbsenceHistory;
