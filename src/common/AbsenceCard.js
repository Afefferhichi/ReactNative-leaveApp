import React, { Component } from "react";
import { Text, View } from "react-native";
import { colors } from "./colors";

class AbsenceCard extends Component {
  render() {
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Duration: </Text>
          <Text style={{ color: colors.blue }}>12/01/2018</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>EMPLOYEE: </Text>
          <Text>HEART, JENNIFER</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>STATUS: </Text>
          <Text>PENDING</Text>
        </View>
      </View>
    );
  }
}

export { AbsenceCard };
