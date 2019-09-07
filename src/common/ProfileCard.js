import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "./colors";

class ProfileCard extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: colors.white,
          padding: 10,
          //   margin: 10,
          flexDirection: "row",
          borderColor: colors.lightgray,
          borderWidth: 1
        }}
      >
        <Image
          source={this.props.source}
          style={{
            width: 90,
            height: 90,
            backgroundColor: colors.white,
            borderRadius: 50
          }}
        />
        <View style={{ marginLeft: 10, width: "60%" }}>
          <Text style={{ color: colors.black }}>{this.props.name}</Text>
          <Text style={{ color: colors.black }}>{this.props.status}</Text>
        </View>
        <View style={{ alignItems: "center", alignSelf: "center" }}>
          <Icon
            name="md-arrow-dropright"
            size={30}
            style={{ paddingLeft: 10, paddingRight: 20, alignSelf: "flex-end" }}
            onPress={this.props.onPress}
          />
        </View>
      </View>
    );
  }
}

export { ProfileCard };
