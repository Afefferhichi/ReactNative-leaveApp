import React, { Component } from "react";
import { Alert, Picker, Text, TextInput, View } from "react-native";
import { Button, Container, Content, ListItem } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { colors, constants, HalfdayCalendar, MyInfoCard } from "../common";
import { SessionStore } from "../Stores";
import moment from "moment";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Actions } from "react-native-router-flux";

const UPDATE_CONGE = gql`
  mutation createcong($input: congeInput!) {
    createConge(conge: $input) {
      congeState
      start_Date
      end_Date
      employeeId
      half_Day
      id
      motif
      reason
    }
  }
`;

class LeaveRequest extends Component {
  static navigationOptions = {
    title: "Leave Request"
  };

  constructor(props) {
    super(props);
    this.state = {
      date: "",
      date1: "",
      reason: "",
      rangeStarted: false,
      startDate: null,
      endDate: null,
      startDateIsHalf: null,
      endDateIsHalf: null,
      markedDates: {},
      showCalendar: false,
      note: ""
    };
  }

  render() {
    const {
      showCalendar,
      startDate,
      endDate,
      startDateIsHalf,
      endDateIsHalf,
      reason,
      note
    } = this.state;
    return (
      <Container>
        {showCalendar && (
          <HalfdayCalendar
            onConfirm={async (
              startDate,
              endDate,
              startDateIsHalf,
              endDateIsHalf
            ) => {
              await this.setState({
                showCalendar: false,
                startDate,
                endDate: endDate || startDate,
                startDateIsHalf,
                endDateIsHalf
              });
            }}
            startDate={startDate}
            endDate={endDate}
            startDateIsHalf={startDateIsHalf}
            endDateIsHalf={endDateIsHalf}
            onCancel={() => this.setState({ showCalendar: false })}
          />
        )}
        <Content padder>
          <ListItem>
            <MyInfoCard />
          </ListItem>

          <ListItem
            button
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start"
            }}
            onPress={() => this.setState({ showCalendar: true })}
          >
            <Text style={{ width: "25%", fontWeight: "bold" }}>From - To</Text>
            <View
              style={{ width: "70%", marginLeft: 10, flexDirection: "row" }}
            >
              <Icon name="md-calendar" size={25} />
              {startDate && (
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{ fontSize: 13, lineHeight: 15, marginLeft: 10 }}
                  >
                    {moment(startDate).format(constants.DATE_FORMAT)}{" "}
                    {startDateIsHalf === 1 ? "AM" : "PM"}
                    {" ~ "}
                  </Text>
                  <Text
                    style={{ fontSize: 13, lineHeight: 15, marginLeft: 10 }}
                  >
                    {moment(endDate).format(constants.DATE_FORMAT)}{" "}
                    {endDateIsHalf === 1 ? "AM" : "PM"}
                  </Text>
                </View>
              )}
            </View>
          </ListItem>

          {/*  */}
          <ListItem>
            <View
              style={{
                width: "100%",
                height: 30,
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text
                style={{ lineHeight: 30, width: "25%", fontWeight: "bold" }}
              >
                Reason
              </Text>
              <Picker
                style={{ width: "75%", borderWidth: 1, top: -10 }}
                onValueChange={value => this.setState({ reason: value })}
                selectedValue={reason}
              >
                <Picker.Item
                  label={constants.LeaveReson.PERSONNEL}
                  value="PERSONNEL"
                />
                <Picker.Item
                  label={constants.LeaveReson.EXCEPTIONNEL}
                  value="EXCEPTIONNEL"
                />
                <Picker.Item
                  label={constants.LeaveReson.MATERNITE}
                  value="MATERNITE"
                />
                <Picker.Item
                  label={constants.LeaveReson.HALF_DAY}
                  value="HALF_DAY"
                />
              </Picker>
            </View>
          </ListItem>
          {/*  */}
          <ListItem style={{ flexDirection: "row" }}>
            <Text style={{ width: "25%", fontWeight: "bold" }}>Remaining:</Text>
            <Text style={{ width: "70%", marginLeft: 5 }}>
              {SessionStore.getRemainingCongeSolde()} Days
            </Text>
          </ListItem>
          <ListItem last noBorder style={{ flexDirection: "row" }}>
            <Text
              style={{
                verticalAlign: "top",
                height: "100%",
                width: "25%",
                fontWeight: "bold"
              }}
            >
              Note:
            </Text>
            <TextInput
              multiline={true}
              asdfs
              onChangeText={text => this.setState({ note: text })}
              value={note}
              style={{
                textAlignVertical: "top",
                width: "70%",
                marginLeft: 5,
                marginTop: 5,
                height: 80,
                borderRadius: 2,
                borderWidth: 1,
                borderColor: colors.whitegray,
                alignSelf: "center",
                marginBottom: 5
              }}
            />
          </ListItem>

          <Mutation mutation={UPDATE_CONGE}>
            {(createcongeMutation, { loading, error, data }) => {
              return (
                <Button
                  style={{ marginHorizontal: 15 }}
                  block
                  primary
                  onPress={() => {
                    const input = {
                      congeState: constants.CongeState.PENDING,
                      start_Date: startDate,
                      end_Date: endDate,
                      employeeId: SessionStore.userId(),
                      half_Day:
                        startDate === endDate
                          ? startDateIsHalf === 1
                            ? startDateIsHalf === 2
                              ? constants.HALF_DAY.AFTER_NOON
                              : constants.HALF_DAY.BEFORE_NOON
                            : constants.HALF_DAY.BEFORE_NOON
                          : constants.HALF_DAY.BEFORE_NOON,
                      motif: note,
                      reason: reason
                    };
                    createcongeMutation({
                      variables: {
                        input
                      }
                    })
                      .then(res => {
                        const result = res
                          ? res.data
                            ? res.data.createConge
                              ? !0
                              : false
                            : false
                          : false;
                        if (result) {
                          Alert.alert("", "Saved successfully!");
                          Actions.pop();
                        } else {
                          alert("An error occurred while saving");
                        }
                      })
                      .catch(err => {
                        Alert.alert("" + reason, JSON.stringify(err));
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
                  <Text style={{ color: colors.white }}>Send Request</Text>
                </Button>
              );
            }}
          </Mutation>
        </Content>
      </Container>
    );
  }
}

export { LeaveRequest };
