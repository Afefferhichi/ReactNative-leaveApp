import React, { Component } from "react";
import {
  Image,
  Picker,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { HalfdayCalendar } from "react-native-halfday-calendar";

import { colors, constants } from "../common";
import { SessionStore } from "../Stores";

const woman_image_url =
  "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
class LeaveRequest extends Component {
  static navigationOptions = {
    title: "Leave Request"
  };

  constructor(props) {
    super(props);
    this.state = {
      date: "",
      date1: "",
      selectedSpecialDay: "",
      rangeStarted: false,
      startDate: null,
      endDate: null,
      startDateIsHalf: null,
      endDateIsHalf: null,
      markedDates: {},
      showCalendar: false
    };
  }

  render() {
    const {
      showCalendar,
      startDate,
      endDate,
      startDateIsHalf,
      endDateIsHalf
    } = this.state;
    return (
      <View style={{ flex: 1, height: "100%", backgroundColor: colors.white }}>
        {showCalendar && (
          <HalfdayCalendar
            onConfirm={async (
              _startDate,
              _endDate,
              _startDateIsHalf,
              _endDateIsHalf
            ) => {
              await this.setState({
                showCalendar: false,
                startDate: _startDate,
                endDate: _endDate,
                startDateIsHalf: _startDateIsHalf,
                endDateIsHal: _endDateIsHalf
              });
            }}
            startDate={startDate}
            endDate={endDate}
            startDateIsHalf={startDateIsHalf}
            endDateIsHalf={endDateIsHalf}
            onCancel={() => this.setState({ showCalendar: false })}
          />
        )}

        <ScrollView style={{ height: "90%" }}>
          <View
            style={{
              backgroundColor: colors.white,
              padding: 10,
              margin: 10,
              flexDirection: "row"
            }}
          >
            <Image
              source={{
                uri: woman_image_url
              }}
              style={{
                width: 70,
                height: 80,
                backgroundColor: colors.whitegray,
                borderRadius: 18
              }}
            />
            <View style={{ marginLeft: 20, alignSelf: "center" }}>
              <Text style={{ color: colors.black }}>
                Welcome {SessionStore.userName()}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: colors.dimsky,
              padding: 10,
              margin: 10,
              borderRadius: 10,
              flexDirection: "row"
            }}
          >
            <Icon name="md-cog" size={30} />
            <Text style={{ color: colors.black, marginLeft: 10 }}>
              This absence is currently approved. Tap here to request for a
              change.
            </Text>
          </View>
          <View
            style={{ borderTopWidth: 1, borderBottomWidth: 1, padding: 10 }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start"
              }}
            >
              <Text style={{ fontWeight: "bold" }}>From - To</Text>
              <TouchableOpacity
                style={{ marginLeft: 15, flexDirection: "row" }}
                onPress={() => this.setState({ showCalendar: true })}
              >
                <Icon name="md-calendar" size={25} />
                {this.state.startDate && (
                  <Text style={{ lineHeight: 25, marginLeft: 10 }}>
                    {this.state.startDate} - {this.state.endDate}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/*  */}
          <View
            style={{ borderTopWidth: 0, borderBottomWidth: 1, paddingLeft: 10 }}
          >
            <Text style={{ fontWeight: "bold" }}>Reason</Text>
            <View style={{ alignItems: "center" }}>
              <Picker
                style={{ width: "80%", borderWidth: 1 }}
                onValueChange={value =>
                  this.setState({ selectedSpecialDay: value })
                }
                selectedValue={this.state.selectedSpecialDay}
              >
                <Picker.Item
                  label="Maternity"
                  value={constants.LeaveReson.MATERNITY}
                />
                <Picker.Item
                  label="Holiday"
                  value={constants.LeaveReson.HOLIDAY}
                />
                <Picker.Item
                  label="Permits"
                  value={constants.LeaveReson.SPECIAL_PERMITS}
                />
                <Picker.Item
                  label="Sickness"
                  value={constants.LeaveReson.SICKNESS}
                />
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
            <TextInput
              multiline={true}
              style={{
                marginTop: 5,
                width: "90%",
                height: 80,
                borderRadius: 10,
                backgroundColor: colors.lightsky,
                alignSelf: "center",
                marginBottom: 5
              }}
            />
          </View>

          <TouchableOpacity
            style={{
              width: "70%",
              height: 39,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.lightblue,
              marginVertical: 50,
              alignSelf: "center"
            }}
          >
            <Text style={{ color: colors.white }}>Send Request</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export { LeaveRequest };
