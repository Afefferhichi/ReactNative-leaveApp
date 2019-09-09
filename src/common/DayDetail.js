import React, { Component } from "react";
import { Text, View } from "react-native";
import { Card, CardItem } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "./colors";

class DayDetail extends Component {

  render() {
    const {Caption1, Caption2, Caption3 } = this.props;
    return (
      <Card>
        <CardItem style={{ backgroundColor: colors.lighergray }} header cardBody>
          <Text
            style={{
              alignSelf: "center",
              color: colors.black,
              fontSize: 16,
              height: 30,
              lineHeight: 30,
              paddingHorizontal: 10
            }}
          >
            {this.props.DayHeader}
          </Text>
        </CardItem>
        <CardItem
          style={{
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: colors.lightgray,
            padding: 15,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row" }}>
              <Text>Start Date:</Text>
              <Text>{Caption1}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>End Date:</Text>
              <Text>{Caption2}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>State:</Text>
              <Text>{Caption3}</Text>
            </View>
          </View>
          <View
            style={{
              height: 35,
              width: 35,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 50
            }}
          >
            <Icon
              activeOpacity={0.8}
              name="md-arrow-down"
              style={{ color: colors.blue }}
              size={22}
            />
          </View>
        </CardItem>
      </Card>
    );
  }
}

export { DayDetail };
