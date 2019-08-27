import React, {Component} from 'react';
import {
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
      iosDefaultDate: new Date()
    };
  }


  showDatePicker = async (dateNum) => {
    if (Platform.OS === 'ios') {
      this.setState({
        dateNum: dateNum,
        isPickerVisible: true,
        iosDatetimePickerMode: 'date'
      });
    } else {

      let original_date = new Date();

      if (this.state.date1 != null) {
        original_date = new Date(this.state.date1);
      }

      if (this.state.date2 != null) {
        original_date = new Date(this.state.date2);
      }


      try {
        const {action, year, month, day} = await DatePickerAndroid.open({
          date: original_date
        });
        if (action !== DatePickerAndroid.dismissedAction) {


          if (dateNum === 1) {
            await this.setState({date1: `${year}/${month + 1}/${day}`});
          }

          if (dateNum === 2) {
            await this.setState({date2: `${year}/${month + 1}/${day}`});
          }

        }
      } catch ({code, message}) {
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

      const original_time = this.state.time;
      let original_hour, original_minute;

      if (original_time) {
        original_hour = original_time.split(/\:/gi)[0];
        original_minute = original_time.split(/\:/gi)[1];
      } else {
        const current_date = new Date();
        original_hour = current_date.getHours();
        original_minute = current_date.getMinutes();
      }
      try {

        const {action, hour, minute} = await TimePickerAndroid.open({
          hour: parseInt(original_hour),
          minute: parseInt(original_minute),
          is24Hour: false, // Will display '2 PM'
        });
        if (action !== TimePickerAndroid.dismissedAction) {
          await this.setState({time: `${hour}:${minute}`});
        }
      } catch ({code, message}) {

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
      ...(this.state.dateNum === 1 ? {date1: date1} : {}),
      ...(this.state.dateNum === 2 ? {date2: date2} : {}),
      iosDefaultDate: date,
      isPickerVisible: false
    });
  };

  onCancelIOS = () => {
    this.setState({isPickerVisible: false});
  };


  //


  render() {
    return (
      <View style={{backgroundColor: 'white'}}>

        <ScrollView style={{height: '90%'}}>
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
            <View style={{marginLeft: 10, alignSelf: 'center'}}>
              <Text style={{color: 'black',}}>Welcome Nour Al jinen </Text>
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
            <Icon name='md-cog' size={30}/>
            <Text style={{color: '#000000', marginLeft: 10}}>
              This absence is currently approved. Tap here to request for a change.
            </Text>
          </View>
          <View
            style={{borderTopWidth: 1, borderBottomWidth: 1, padding: 10}}
          >
            <Text style={{fontWeight: 'bold'}}>From </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around'
              }}
            >
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon
                  onPress={() => this.showTimePicker()}
                  size={30}
                  name='md-time'
                />
                <Text>Time</Text>
              </View>
              <Text style={{color: '#183152'}}>{this.state.time}</Text>
              {/*
    <TimePicker
    ref={ref => {
      this.TimePicker = ref;
    }}
    onCancel={() => this.onCancel()}
    onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
    />
    */}

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon
                  onPress={() => this.showDatePicker(1)} size={30}
                  name='md-calendar'
                />
                <Text>Date</Text>
              </View>
              <Text style={{color: '#183152'}}>{this.state.date1}</Text>

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
            style={{borderTopWidth: 0, borderBottomWidth: 1, padding: 10}}
          >
            <Text style={{fontWeight: 'bold'}}>Recovery Date </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around'
              }}
            >
              <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: '-15%'}}>
                <Icon
                  onPress={() => this.showDatePicker(2)} size={30}
                  name='md-calendar'
                />
                <Text>Date</Text>
              </View>
              <Text style={{color: 'red'}}>{this.state.date2}</Text>
            </View>
          </View>
          {/*  */}
          <View
            style={{borderTopWidth: 0, borderBottomWidth: 1, paddingLeft: 10}}
          >
            <Text style={{fontWeight: 'bold'}}>Pattern</Text>
            <View style={{alignItems: 'center'}}>
              <Picker style={{width: '80%', borderWidth: 1}}
                      onValueChange={value => this.setState({selectedSpecialDay: value})}
                      selectedValue={this.state.selectedSpecialDay}>

                <Picker.Item label='30min' value='30min'/>
                <Picker.Item label='1h' value='1hr'/>
                <Picker.Item label='1h:30min' value='1h:30min'/>
                <Picker.Item label='2hrs' value='2hrs'/>
              </Picker>
            </View>
          </View>
          {/*  */}
          <View
            style={{borderTopWidth: 0, borderBottomWidth: 1, paddingLeft: 10}}
          >


            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold'}}>Note:</Text>
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
            onPress={this._onPressButton}
            onShowUnderlay={() => {
              alert('onShowUnderlay button !');
            }}
            style={{
              width: '70%',
              height: 39,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#183152',
              marginVertical: 30,
              alignSelf: 'center',

            }}
          >
            <Text style={{color: 'white'}}>Send Request</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default ExitDetail;
