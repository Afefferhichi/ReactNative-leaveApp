import React, { Component } from 'react';
import {
  Button,
  DatePickerAndroid,
  Image,
  Picker,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TimePickerAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import AsyncStorage from '@react-native-community/async-storage';


const ADD_EXIT_DETAIL = gql`
mutation createsort($input : sortieInput!) {
  createSortie(sortie: $input) {
  	employeeId,
    recovery_Date,
    sortie_Date,
    sortieTime,
    sortieState,
    motif
  }
}
`;

const sortieQuery = gql`
  query{
    sorties {
      employeeId,
      recovery_Date,
      sortie_Date,
      sortieTime,
      sortieState,
      motif
    }
  }
`;

// import console = require("console");

class ExitDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPickerVisible: false,
      iosDatetimePickerMode: null,
      time: null,
      date1: null,
      date2: null,
      dateNum: null,
      iosDefaultDate: new Date(),
      mutationCalled: false,
      login: null
    };
  }



  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('@login')
      if(value !== null) {
        this.setState({login: JSON.parse(value)});
      }
    } catch(e) {
      // error reading value
    }
  }

  showDatePicker = async (dateNum) => {
    if (Platform.OS === 'ios') {
      this.setState({
        dateNum: dateNum,
        isPickerVisible: true,
        iosDatetimePickerMode: 'date'
      });
    } else {

      let selected_date = new Date((dateNum === 1 ? this.state.date1 : this.state.date2) || (+new Date));

      try {
        const { action, year, month, day } = await DatePickerAndroid.open({
          date: selected_date
        });
        if (action !== DatePickerAndroid.dismissedAction) {


          if (dateNum === 1) {
            await this.setState({ date1: `${year}/${month + 1}/${day}` });
          }

          if (dateNum === 2) {
            await this.setState({ date2: `${year}/${month + 1}/${day}` });
          }

        }
      } catch ({ code, message }) {
        // alert(message)
      }


    }
  };


  showTimePicker = async () => {

    if (Platform.OS === 'ios') {

      this.setState({
        isPickerVisible: true,
        iosDatetimePickerMode: 'time'
      });

    } else {

      const selected_time = this.state.time;
      let selected_hour, selected_minute;

      if (selected_time) {
        selected_hour = selected_time.split(/\:/gi)[0];
        selected_minute = selected_time.split(/\:/gi)[1];
      } else {
        const current_date = new Date();
        selected_hour = current_date.getHours();
        selected_minute = current_date.getMinutes();
      }
      try {

        const { action, hour, minute } = await TimePickerAndroid.open({
          hour: parseInt(selected_hour),
          minute: parseInt(selected_minute),
          is24Hour: false, // Will display '2 PM'
        });
        if (action !== TimePickerAndroid.dismissedAction) {
          await this.setState({ time: `${hour}:${minute}` });
        }
      } catch ({ code, message }) {

      }

    }

  };

  onConfirm(hour, minute) {
    this.setState({
      isPickerVisible: false,
    });
  }

  onCancel(hour, minute) {
    this.setState({
      isPickerVisible: false,
    });
  }

  onConfirmTimeIOS = date => {
    const time = `${date.getHours()}:${date.getMinutes()}`;
    this.setState({
      time,
      iosDefaultDate: date,
      isPickerVisible: false
    });
  };

  onConfirmDateIOS = date => {
    let date1, date2;
    if (this.state.dateNum === 1) {
      date1 = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    } else if (this.state.dateNum === 2) {
      date2 = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    this.setState({
      ...(this.state.dateNum === 1 ? { date1: date1 } : {}),
      ...(this.state.dateNum === 2 ? { date2: date2 } : {}),
      iosDefaultDate: date,
      isPickerVisible: false
    });
  };

  onCancelIOS = () => {
    this.setState({ isPickerVisible: false });
  };


  render() {
    return (
      <Mutation mutation={ADD_EXIT_DETAIL} _refetchQueries={[{ query: sortieQuery }]} >
        {(createsortMutation, { data }) => (
          <View style={{ backgroundColor: 'white' }}>

            <ScrollView style={{ height: '95%' }}>
              <View
                style={{
                  backgroundColor: 'white',
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
                    width: 70,
                    height: 80,
                    backgroundColor: '#f2f2f2',
                    borderRadius: 18
                  }}
                />
                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                  <Text style={{ color: 'black', }}>Welcome @username </Text>
                  {/*<Text style={{ color: "white" }}>Student</Text>*/}
                </View>

              </View>
              <View
                style={{
                  backgroundColor: '#C4D7ED',
                  padding: 10,
                  margin: 10,
                  flexDirection: 'row',
                  borderRadius: 10,
                }}
              >
                <Icon name='md-cog' size={30} />
                <Text style={{ color: '#000000', marginLeft: 10 }}>
                  This absence is currently approved. Tap here to request for a change.
                  </Text>
              </View>
              <View
                style={{ borderTopWidth: 1, borderBottomWidth: 1, padding: 10 }}
              >
                <Text style={{ fontWeight: 'bold' }}>From </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around'
                  }}
                >
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Icon
                      onPress={() => this.showTimePicker()}
                      size={30}
                      name='md-time'
                    />
                    <Text>Time</Text>
                  </View>
                  <Text style={{ color: '#183152' }}>{this.state.time}</Text>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Icon
                      onPress={() => this.showDatePicker(1)} size={30}
                      name='md-calendar'
                    />
                    <Text>Date</Text>
                  </View>
                  <Text style={{ color: '#183152' }}>{this.state.date1}</Text>

                  {Platform.OS === 'ios' &&
                    <DateTimePicker
                      date={this.state.iosDefaultDate}
                      mode={this.state.iosDatetimePickerMode}
                      isVisible={this.state.isPickerVisible}
                      onConfirm={
                        this.state.iosDatetimePickerMode === 'time' ?
                          this.onConfirmTimeIOS
                          :
                          this.onConfirmDateIOS
                      }
                      onCancel={this.onCancelIOS}
                    />
                  }
                </View>
              </View>
              {/*  */}
              <View
                style={{ borderTopWidth: 0, borderBottomWidth: 1, padding: 10 }}
              >
                <Text style={{ fontWeight: 'bold' }}>Recovery Date </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around'
                  }}
                >
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: '-15%' }}>
                    <Icon
                      onPress={() => this.showDatePicker(2)} size={30}
                      name='md-calendar'
                    />
                    <Text>Date</Text>
                  </View>
                  <Text style={{ color: 'red' }}>{this.state.date2}</Text>
                </View>
              </View>
              {/*  */}
              <View
                style={{ borderTopWidth: 0, borderBottomWidth: 1, paddingLeft: 10 }}
              >
                <Text style={{ fontWeight: 'bold' }}>Exit Time</Text>
                <View style={{ alignItems: 'center' }}>
                  <Picker style={{ width: '80%', borderWidth: 1 }}
                    onValueChange={value => this.setState({ selectedSpecialDay: value })}
                    selectedValue={this.state.selectedSpecialDay}>

                    <Picker.Item label='30min' value='30min' />
                    <Picker.Item label='1h' value='1hr' />
                    <Picker.Item label='1h:30min' value='1h:30min' />
                    <Picker.Item label='2hrs' value='2hrs' />
                  </Picker>
                </View>
              </View>
              {/*  */}
              <View
                style={{ borderTopWidth: 0, borderBottomWidth: 1, paddingLeft: 10 }}
              >


                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontWeight: 'bold' }}>Note:</Text>
                  {/* <Text>0.00 Days</Text> */}
                </View>
                <TextInput multiline={true}
                  style={{
                    marginTop: 5,
                    width: '90%',
                    height: 80,
                    borderRadius: 10,
                    backgroundColor: '#C4D7ED',
                    alignSelf: 'center',
                    marginBottom: 5
                  }}

                />
              </View>

              <TouchableOpacity
                title="Send Request"
                onPress={async () => {
                  //alert('here 3'+typeof(createsortMutation)); 
                  //alert(JSON.stringify(this.state.login));
                  createsortMutation({
                    variables: {
                      input: {
                        "employeeId": this.state.login.id,
                        "recovery_Date": "2019-08-29",
                        "sortie_Date": "2019-08-29",
                        "sortieState": "PENDING",
                        "sortieTime": "HALF_HOUR",
                        "motif": "sething special 444"
                      }
                    }
                  })
                    .then(res => { res })
                    .catch(err => { err })

                }}

                onShowUnderlay={() => {
                  alert('onShowUnderlay button !');
                }}
                style={{
                  width: '70%',
                  height: 39,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#183152',
                  marginVertical: 50,
                  alignSelf: 'center',

                }}
              >
                <Text style={{ color: 'white' }}>Send Request</Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
        )}
      </Mutation>
    );
  }
}

export default ExitDetail;
