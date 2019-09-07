import React, { Component } from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "./colors";

class DayDetail extends Component {
  render() {
    return (
      <View>
        <View
          style={{
            height: 30,
            width: "100%",
            backgroundColor: colors.lightgray,
            justifyContent: "center"
          }}
        >
          <Text style={{ alignSelf: "center" }}>{this.props.DayHeader}</Text>
        </View>
        <View
          style={{
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: colors.lightgray,
            padding: 15,
            flexDirection: "row"
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row" }}>
              <Text>Start Date:</Text>
              <Text>{this.props.Time1}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>End Date:</Text>
              <Text>{this.props.Time2}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>State:</Text>
              <Text>{this.props.Time3}</Text>
            </View>
          </View>
          <View
            style={{
              height: 35,
              width: 35,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 50,
              marginLeft: 130
            }}
          >
            <Icon
              activeOpacity={0.8}
              name="md-arrow-down"
              style={{ color: colors.blue }}
              size={22}
            />
          </View>
        </View>
      </View>
    );
  }
}

export { DayDetail };
