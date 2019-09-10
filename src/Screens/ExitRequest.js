import React, { Component } from "react";
import {
  Alert,
  DatePickerAndroid,
  Picker,
  Platform,
  Text,
  TextInput,
  TimePickerAndroid,
  View
} from "react-native";

import { Button, Container, Content, ListItem } from "native-base";

import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/Ionicons";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { colors, constants, MyInfoCard } from "../common";
import { ExitRequestStore, SessionStore } from "../Stores";
import { Actions } from "react-native-router-flux";

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
      sortieTime: constants.SortieTime.HALF_HOUR, // Exit Time
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
      <Container>
        <Content padder>
          <ListItem>
            <MyInfoCard />
          </ListItem>

          <ListItem>
            <Text
              style={{
                width: "30%",
                height: "100%",
                fontWeight: "bold"
              }}
            >
              From{" "}
            </Text>
            <View
              style={{
                width: "70%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Icon
                  onPress={() => this.showTimePicker()}
                  size={30}
                  name="md-time"
                />
                <Text>Time</Text>
              </View>
              <Text style={{ color: colors.lightblue }}>{fromTime}</Text>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
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
          </ListItem>
          {/*  */}
          <ListItem>
            <Text style={{ height: "100%", width: "30%", fontWeight: "bold" }}>
              {"Recovery\nDate"}
            </Text>
            <View
              style={{
                height: "100%",
                width: "70%",
                flexDirection: "row",
                alignItems: "flex-start"
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Icon
                  onPress={() => this.showDatePicker(2)}
                  size={30}
                  name="md-calendar"
                />
                <Text>Date</Text>
              </View>
              <Text
                style={{ lineHeight: 50, marginLeft: 30, color: colors.red }}
              >
                {recoveryDate}
              </Text>
            </View>
          </ListItem>
          {/*  */}
          <ListItem>
            <Text style={{ height: "100%", width: "30%", fontWeight: "bold" }}>
              Exit Time
            </Text>
            <View style={{ height: 23, width: "65%", alignItems: "center" }}>
              <Picker
                style={{ width: "100%", borderWidth: 1, left: -8, top: -15 }}
                onValueChange={value => this.setState({ sortieTime: value })}
                selectedValue={sortieTime}
              >
                <Picker.Item
                  label="30min"
                  value={constants.SortieTime.HALF_HOUR}
                />
                <Picker.Item label="1h" value={constants.SortieTime.ONE_HOUR} />
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
          </ListItem>
          {/*  */}
          <ListItem>
            <Text style={{ width: "30%", height: "100%", fontWeight: "bold" }}>
              Note:
            </Text>
            <TextInput
              multiline={true}
              value={note}
              onChangeText={text => this.setState({ note: text })}
              style={{
                width: "70%",
                height: 80,
                textAlignVertical: "top",
                marginTop: 5,
                borderRadius: 2,
                borderWidth: 1,
                borderColor: colors.whitegray,
                alignSelf: "center",
                marginBottom: 5
              }}
            />
          </ListItem>

          <Mutation mutation={ADD_EXIT_DETAIL}>
            {(createsortMutation, { data }) => (
              <Button
                style={{
                  marginHorizontal: 15,
                  backgroundColor: colors.waterblue
                }}
                block
                primary
                onPress={async () => {
                  if (!recoveryDate || !fromDate || !sortieTime || !note) {
                    Alert.alert("", "Please enter the valid values");
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
                          Alert.alert("", "Saved successfully!", [
                            { text: "OK", onPress: () => Actions.pop() }
                          ]);
                        });
                      } else {
                        Alert.alert("", "An error occurred while saving");
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
                      Alert.alert("", result);
                    });
                }}
              >
                <Text style={{ color: colors.white, fontSize: 15 }}>
                  Send Request
                </Text>
              </Button>
            )}
          </Mutation>
        </Content>
      </Container>
    );
  }
}

export { ExitRequest };
