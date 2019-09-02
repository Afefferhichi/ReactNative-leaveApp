import React, {Component} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import DayDetail from '../common/DayDetail';
import Icon from 'react-native-vector-icons/Ionicons';


class ShowHistory extends Component {
  static navigationOptions = ({navigation}) => ({
    header: null
  });

  render() {
    return (
      <View>
        <ScrollView>
        <View
          style={{
            height: 58,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'white',
            alignItems: 'center',
            flexDirection: 'row',
            borderBottomWidth: 1,
            padding: 10,

          }}
        >
          <Icon
            name='md-menu'
            size={30}
            style={{paddingLeft: 10, paddingRight: 20}}
            onPress={() => this.props.navigation.openDrawer()}
          />
          <Text style={{fontSize: 20, fontWeight: 'normal', color: '#696969'}}>
            History Leave
          </Text>
        </View>
          <View
            style={{
              backgroundColor: '#C4D7ED',
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
                backgroundColor: '#C4D7ED',
                borderRadius: 15
              }}
            />
            <View style={{marginLeft: 10}}>
              <Text style={{color: 'white'}}>Welcome @username</Text>
              
            </View>
          </View>

          {/*  */}
          <DayDetail
            DayHeader='Sikness'
            Time1='12-21-2018'
            Time2='12-23-2018'
            Time3='PANDING'
          />
          <DayDetail
            DayHeader='Special Permit'
            Time1='12-21-2018'
            Time2='08-21-2018'
            Time3='ACCEPTED'
          />
          <DayDetail
            DayHeader='Holiday'
            Time1='12-21-2018'
            Time2='07-14-2018'
            Time3='REFUSED'
          />
         
        </ScrollView>
      </View>
    );
  }
}

export default ShowHistory;
