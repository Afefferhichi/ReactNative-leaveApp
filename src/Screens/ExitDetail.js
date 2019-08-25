import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Picker,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import TimePicker from "react-native-24h-timepicker";
import { Overlay } from 'teaset';
import RangeDatepicker from 'react-native-range-datepicker';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Header from "../common/Header";
import Icon from "react-native-vector-icons/Ionicons";
import DatePicker from "react-native-datepicker";
import { thisTypeAnnotation } from "@babel/types";
// import console = require("console");

class ExitDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      time:''
      // date: "", date1: "", 
      // selectedSpecialDay: '', 
      // rangeStarted: false, startDate: null, endDate: null,
      // markedDates: {
      //   '2019-08-23': { selected: true, startingDay: true, color: 'green', textColor: 'white' },
      //   '2019-08-24': { selected: true, endingDay: true, color: 'green', textColor: 'white' }
      // }
    };
  }

    // =-========== Related Range Calendar

  //   selectDate = async (date) => {
  //     alert(JSON.stringify(date));
  //     if (!this.state.rangeStarted) {
  //       // This means you clicked the start date
  //       await this.setState({ startDate: date })
  //     } else {
  //       // This means that you clicked the end date
  //       await this.setState({ endDate: date });
  //     }
  //     await this.setState({ rangeStarted: !this.state.rangeStarted });

  //     let markedDates = {};
  //     markedDates[this.state.startDate] = { selected: true, startingDay: true, color: 'green', textColor: 'white' };
  //     markedDates[this.state.endDate] = { selected: true, endingDay: true, color: 'green', textColor: 'white' };
  //     await this.setState({markedDates: markedDates})
  //   };
  //   // =-========== Related Range Calendar : end

  // modal = (options = {}) => {

  //   const overlayView2 = (
  //     <Overlay.View
  //       modal={true}
  //       ref={v => this.overlayView2 = v}
  //     >
  //       <View style={{
  //         width: '100%', height: '100%', backgroundColor: 'white',
  //         flexDirection: 'column'
  //       }}>
  //         <View style={{ width: '100%', height: '100%', paddingBottom: 52 }}>
  //           {/* <RangeDatepicker /> */}

  //           <Calendar
  //             // Collection of dates that have to be colored in a special way. Default = {}
  //             markedDates={this.state.markedDates}
  //             // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
  //             markingType={'period'}
  //             onDayPress={(day) => this.selectDate(day)}
  //           />

  //           <Button title="Close" onPress={() => this.overlayView2 && this.overlayView2.close()} />
  //         </View>
  //       </View>
  //     </Overlay.View>
  //   );

  //   Overlay.show(overlayView2);




// 

onCancel() {
  this.TimePicker.close();
}
onConfirm(hour, minute) {
  this.setState({ time: `${hour}:${minute}` });
  this.TimePicker.close();
}

// 

showDateTimePicker = () => {
  this.setState({ isDateTimePickerVisible: true });
};

hideDateTimePicker = () => {
  this.setState({ isDateTimePickerVisible: false });
};

handleDatePicked = date => {
  console.log("A date has been picked: ", date);
  this.hideDateTimePicker();
};


// 


  render() {
    return (
      <View>
       <View>
       <Header HeaderText="Absence Detail"/>
       </View>

        <ScrollView style={{ height: "90%" }}>
          <View
            style={{
              backgroundColor: "#87cefa",
              padding: 10,
              margin: 10,
              flexDirection: "row"
            }}
          >
            <Image
              source={{
                uri:
                  "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
              }}
              style={{
                width: 90,
                height: 100,
                backgroundColor: "#f2f2f2",
                borderRadius: 15
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ color: "white" }}>Nour </Text>
              <Text style={{ color: "white" }}>Student</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#ffe4c4",
              padding: 10,
              margin: 10,
              flexDirection: "row"
            }}
          >
            <Icon name="md-cog" size={30} />
            <Text style={{ color: "#000000", marginLeft: 10 }}>
              This absence is currently approved. Tap here to request for a change.
            </Text>
          </View>
          <View
            style={{ borderTopWidth: 1, borderBottomWidth: 1, padding: 10 }}
          >
            <Text style={{ fontWeight: "bold" }}>From - To</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around"
              }}
            >
              {/* <Icon name="md-calendar" style={{ width: "10%" }} size={30} />
              <Button title="Calender" onPress={() => this.modal()} /> */}
             <View style={{justifyContent:'center', alignItems:'center'}}>
             <Icon
               onPress={() => this.TimePicker.open()}
               size={30}
               name="md-time"
              />
              <Text>Time</Text>
             </View>
                {/* <TouchableOpacity
          onPress={() => this.TimePicker.open()}
          style={{padding:5, borderBottomWidth:1, borderBottomColor:"#000000"}}
        >
          <Text style={{color:'black'}}>Time</Text>
        </TouchableOpacity > */}
        <Text style={{color:'red'}}>{this.state.time}</Text>
        <TimePicker
          ref={ref => {
            this.TimePicker = ref;
          }}
          onCancel={() => this.onCancel()}
          onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
        />



              
               {/* <TouchableOpacity 
                style={{padding:5, borderBottomWidth:1, borderBottomColor:"#000000"}}
                onPress={this.showDateTimePicker}>
                 <Text>Date</Text>
               </TouchableOpacity> */}

               <View style={{justifyContent:'center', alignItems:'center'}}>
             <Icon
onPress={this.showDateTimePicker}               size={30}
               name="md-calendar"
              />
              <Text>Date</Text>
             </View>
                  <Text style={{color:'red'}}>{this.state.isDateTimePickerVisible} </Text>

               <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
            </View>
          </View>

          {/*  */}
          <View
            style={{ borderTopWidth: 0, borderBottomWidth: 1, paddingLeft: 10 }}
          >
            <Text style={{ fontWeight: "bold" }}>Reason</Text>
            <View style={{ alignItems: "center" }}>
              <Picker style={{ width: "80%", borderWidth: 1 }}
                onValueChange={value => this.setState({ selectedSpecialDay: value })}
                selectedValue={this.state.selectedSpecialDay}>

                <Picker.Item label="Motifs" value="Motif" />
                <Picker.Item label="30min" value="30min" />
                <Picker.Item label="1h" value="1hr" />
                <Picker.Item label="1h:30min" value="1h:30min" />
                <Picker.Item label="2hrs" value="2hrs" />
              </Picker>
            </View>
          </View>
          {/*  */}
          <View
            style={{ borderTopWidth: 0, borderBottomWidth: 1, paddingLeft: 10 }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Token:</Text>
              <Text>0.00 Days</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Remaning:</Text>
              <Text>44.00 Days</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Note:</Text>
              {/* <Text>0.00 Days</Text> */}
            </View>
            <TextInput multiline={true}
              style={{
                marginTop: 5,
                width: "90%",
                height: 80,
                borderRadius: 10,
                backgroundColor: "#f3f3f3",
                alignSelf: "center",
                marginBottom: 5
              }}

            />
          </View>
          <TouchableOpacity
            onPress={this._onPressButton}
            onShowUnderlay={() => {
              alert("onShowUnderlay button !");
            }}
            style={{
              width: "90%",
              height: 45,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "tomato",
              marginTop: 5,
              alignSelf: "center"
            }}
          >
            <Text style={{ color: "white" }}>Send Request</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default ExitDetail;
