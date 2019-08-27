import React, {Component} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import DayDetail from '../common/DayDetail';


class Holiday extends Component {
  render() {
    return (
      <View>
        <ScrollView>
          <View
            style={{
              backgroundColor: 'tomato',
              padding: 10,
              margin: 10,
              flexDirection: 'row'
            }}
          >
            <Image
              source={{
                uri:
                  'https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
              }}
              style={{
                width: 90,
                height: 100,
                backgroundColor: '#f2f2f2',
                borderRadius: 15
              }}
            />
            <View style={{marginLeft: 10}}>
              <Text style={{color: 'white'}}>Nour Al jinen</Text>
              <Text style={{color: 'white'}}>Nour Al jinen</Text>
            </View>
          </View>

          {/*  */}
          <DayDetail
            DayHeader='Friday 30/12/2019'
            Time1='5.00 Hours'
            Time2='8.00Hours'
          />
          <DayDetail
            DayHeader='Friday 30/12/2019'
            Time1='5.00 Hours'
            Time2='8.00Hours'
          />
          <DayDetail
            DayHeader='Friday 30/12/2019'
            Time1='5.00 Hours'
            Time2='8.00Hours'
          />
          <DayDetail
            DayHeader='Friday 30/12/2019'
            Time1='5.00 Hours'
            Time2='8.00Hours'
          />
          <DayDetail
            DayHeader='Friday 30/12/2019'
            Time1='5.00 Hours'
            Time2='8.00Hours'
          />
          <DayDetail
            DayHeader='Friday 30/12/2019'
            Time1='5.00 Hours'
            Time2='8.00Hours'
          />
          <DayDetail
            DayHeader='Friday 30/12/2019'
            Time1='5.00 Hours'
            Time2='8.00Hours'
          />
          <DayDetail
            DayHeader='Friday 30/12/2019'
            Time1='5.00 Hours'
            Time2='8.00Hours'
          />
          {/*  */}
          <TouchableOpacity
            style={{
              width: '90%',
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'tomato',
              marginTop: 5,
              alignSelf: 'center'
            }}
            onPress={() => this.props.navigation.navigate('AbsenceDetail')}
          >
            <Text style={{color: 'white'}}>Go Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default Holiday;
