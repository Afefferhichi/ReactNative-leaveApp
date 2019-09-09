import React, { Component } from "react";
import { Picker, Text, TextInput, View } from "react-native";
import { Button, Container, Content, ListItem } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { colors, constants, HalfdayCalendar, MyInfoCard } from "../common";
import { SessionStore } from "../Stores";

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
      <Container>
        {showCalendar && (
          <HalfdayCalendar
            onConfirm={async (
              _startDate,
              _endDate,
              _startDateIsHalf,
              _endDateIsHalf
            ) => {
              setTimeout(async () => {
                await this.setState({
                  showCalendar: false,
                  startDate: _startDate,
                  endDate: _endDate,
                  startDateIsHalf: _startDateIsHalf,
                  endDateIsHal: _endDateIsHalf
                });
              }, 100);
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
              {this.state.startDate && (
                <Text style={{ lineHeight: 25, marginLeft: 10 }}>
                  {this.state.startDate} - {this.state.endDate}
                </Text>
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

          <Button
            style={{ marginHorizontal: 15 }}
            block
            primary
            onPress={() => alert("here")}
          >
            <Text style={{ color: colors.white }}>Send Request</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export { LeaveRequest };
