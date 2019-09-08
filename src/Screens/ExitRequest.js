import React, { Component } from "react";
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
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/Ionicons";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { constants, colors } from "../common";
import { ExitRequestStore, SessionStore } from "../Stores";

const woman_image_url =
  "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
const ADD_EXIT_DETAIL = gql`
  mutation createsort($input: sortieInput!) {
    createSortie(sortie: $input) {
      employeeId
      recovery_Date
      sortie_Date
      sortieTime
      sortieState
      motif
    }
  }
`;

class ExitRequest extends Component {
  static navigationOptions = {
    title: "Exit Request"
  };

  constructor(props) {
    super(props);
    this.state = {
      isPickerVisible: false,
      iosDatetimePickerMode: null,
      fromTime: null, // From Time
      fromDate: null, // From Date
      recoveryDate: null, // Recovery Date
      dateNum: null,
      sortieTime: null, // Exit Time
      note: null, // Note
      iosDefaultDate: new Date(),
      mutationCalled: false,
      login: null
    };
  }

  async componentDidMount() {
    SessionStore.isLoggedIn((loggedIn, loginInformation) => {
      loggedIn && this.setState({ login: loginInformation });
    });
  }

  showDatePicker = async dateNum => {
    const { fromDate, recoveryDate } = this.state;
    if (Platform.OS === "ios") {
      this.setState({
        dateNum: dateNum,
        isPickerVisible: true,
        iosDatetimePickerMode: "date"
      });
    } else {
      let selected_date = new Date(
        (dateNum === 1 ? fromDate : recoveryDate) || +new Date()
      );

      try {
        const { action, year, month, day } = await DatePickerAndroid.open({
          date: selected_date
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          if (dateNum === 1) {
            await this.setState({ fromDate: `${year}/${month + 1}/${day}` });
          }

          if (dateNum === 2) {
            await this.setState({
              recoveryDate: `${year}/${month + 1}/${day}`
            });
          }
        }
      } catch ({ code, message }) {
        // alert(message)
      }
    }
  };

  showTimePicker = async () => {
    const { fromTime } = this.state;
    if (Platform.OS === "ios") {
      this.setState({
        isPickerVisible: true,
        iosDatetimePickerMode: "time"
      });
    } else {
      const selected_time = fromTime;
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
          is24Hour: false // Will display '2 PM'
        });
        if (action !== TimePickerAndroid.dismissedAction) {
          await this.setState({ fromTime: `${hour}:${minute}` });
        }
      } catch ({ code, message }) {}
    }
  };

  onConfirm(hour, minute) {
    this.setState({
      isPickerVisible: false
    });
  }

  onCancel(hour, minute) {
    this.setState({
      isPickerVisible: false
    });
  }

  onConfirmTimeIOS = date => {
    const fromTime = `${date.getHours()}:${date.getMinutes()}`;
    this.setState({
      fromTime,
      iosDefaultDate: date,
      isPickerVisible: false
    });
  };

  onConfirmDateIOS = date => {
    const { dateNum } = this.state;
    let fromDate, recoveryDate;
    if (dateNum === 1) {
      fromDate = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`;
    } else if (dateNum === 2) {
      recoveryDate = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`;
    }

    this.setState({
      ...(dateNum === 1 ? { fromDate: fromDate } : {}),
      ...(dateNum === 2 ? { recoveryDate: recoveryDate } : {}),
      iosDefaultDate: date,
      isPickerVisible: false
    });
  };

  onCancelIOS = () => {
    this.setState({ isPickerVisible: false });
  };

  render() {
    const {
      fromTime,
      fromDate,
      recoveryDate,
      sortieTime,
      login,
      note,
      iosDefaultDate,
      iosDatetimePickerMode,
      isPickerVisible
    } = this.state;

    return (
      <Mutation mutation={ADD_EXIT_DETAIL}>
        {(createsortMutation, { data }) => (
          <View style={{ backgroundColor: colors.white }}>
            <ScrollView style={{ height: "95%" }}>
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
                <View style={{ marginLeft: 10, alignSelf: "center" }}>
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
                  flexDirection: "row",
                  borderRadius: 10
                }}
              >
                <Icon name="md-cog" size={30} />
                <Text style={{ color: colors.black, marginLeft: 10 }}>
                  This absence is currently approved. Tap here to request for a
                  change.
                </Text>
              </View>
              <View
                style={{
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  padding: 10
                }}
              >
                <Text style={{ fontWeight: "bold" }}>From </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around"
                  }}
                >
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Icon
                      onPress={() => this.showTimePicker()}
                      size={30}
                      name="md-time"
                    />
                    <Text>Time</Text>
                  </View>
                  <Text style={{ color: colors.lightblue }}>{fromTime}</Text>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Icon
                      onPress={() => this.showDatePicker(1)}
                      size={30}
                      name="md-calendar"
                    />
                    <Text>Date</Text>
                  </View>
                  <Text style={{ color: colors.lightblue }}>{fromDate}</Text>

                  {Platform.OS === "ios" && (
                    <DateTimePicker
                      date={iosDefaultDate}
                      mode={iosDatetimePickerMode}
                      isVisible={isPickerVisible}
                      onConfirm={
                        iosDatetimePickerMode === "time"
                          ? this.onConfirmTimeIOS
                          : this.onConfirmDateIOS
                      }
                      onCancel={this.onCancelIOS}
                    />
                  )}
                </View>
              </View>
              {/*  */}
              <View
                style={{
                  borderTopWidth: 0,
                  borderBottomWidth: 1,
                  padding: 10
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Recovery Date </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around"
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: "-15%"
                    }}
                  >
                    <Icon
                      onPress={() => this.showDatePicker(2)}
                      size={30}
                      name="md-calendar"
                    />
                    <Text>Date</Text>
                  </View>
                  <Text style={{ color: colors.red }}>{recoveryDate}</Text>
                </View>
              </View>
              {/*  */}
              <View
                style={{
                  borderTopWidth: 0,
                  borderBottomWidth: 1,
                  paddingLeft: 10
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Exit Time</Text>
                <View style={{ alignItems: "center" }}>
                  <Picker
                    style={{ width: "80%", borderWidth: 1 }}
                    onValueChange={value =>
                      this.setState({ sortieTime: value })
                    }
                    selectedValue={sortieTime}
                  >
                    <Picker.Item label="" value={""} />
                    <Picker.Item
                      label="30min"
                      value={constants.SortieTime.HALF_HOUR}
                    />
                    <Picker.Item
                      label="1h"
                      value={constants.SortieTime.ONE_HOUR}
                    />
                    <Picker.Item
                      label="1h:30min"
                      value={constants.SortieTime.ONE_AND_HALF_HOUR}
                    />
                    <Picker.Item
                      label="2hrs"
                      value={constants.SortieTime.TWO_HOURS}
                    />
                  </Picker>
                </View>
              </View>
              {/*  */}
              <View
                style={{
                  borderTopWidth: 0,
                  borderBottomWidth: 1,
                  paddingLeft: 10
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold" }}>Note:</Text>
                  {/* <Text>0.00 Days</Text> */}
                </View>
                <TextInput
                  multiline={true}
                  value={note}
                  onChangeText={text => this.setState({ note: text })}
                  style={{
                    marginTop: 5,
                    width: "90%",
                    height: 80,
                    borderRadius: 5,
                    backgroundColor: colors.dimsky,
                    alignSelf: "center",
                    marginBottom: 5,
                    textAlignVertical: "top",
                    padding: 5
                  }}
                />
              </View>

              <TouchableOpacity
                title="Send Request"
                onPress={async () => {
                  if (!recoveryDate || !fromDate || !sortieTime || !note) {
                    alert("Please enter the valid values");
                    return;
                  }
                  const input = {
                    employeeId: login.id,
                    recovery_Date: recoveryDate,
                    sortie_Date: fromDate,
                    sortieState: constants.SortieState.PENDING,
                    sortieTime: sortieTime,
                    motif: note
                  };
                  createsortMutation({
                    variables: {
                      input
                    }
                  })
                    .then(res => {
                      const result = res
                        ? res.data
                          ? res.data.createSortie
                            ? !0
                            : false
                          : false
                        : false;
                      if (result) {
                        ExitRequestStore.set(input, () => {
                          alert("Saved successfully!");
                          this.props.navigation.goBack();
                        });
                      } else {
                        alert("An error occurred while saving");
                      }
                    })
                    .catch(err => {
                      const result = err
                        ? err.graphQLErrors.length !== 0
                          ? "There was an error on Server"
                          : err.networkError
                          ? "There was a network problem"
                          : "Unknown error occurred"
                        : "Unknown error occurred";
                      alert(result);
                    });
                }}
                onShowUnderlay={() => {
                  alert("onShowUnderlay button !");
                }}
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
        )}
      </Mutation>
    );
  }
}

export { ExitRequest };
