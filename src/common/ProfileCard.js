import React, { Component } from "react";
import { View, Image, Text } from "react-native";

class ProfileCard extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: "#f2f2f2",
          padding: 10,
          //   margin: 10,
          flexDirection: "row",
          borderColor: "#ddd",
          borderWidth: 1
        }}
      >
        <Image
          source={this.props.source}
          style={{
            width: 90,
            height: 90,
            backgroundColor: "#f2f2f2",
            borderRadius: 50
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: "black" }}>{this.props.name}</Text>
          <Text style={{ color: "black" }}>{this.props.status}</Text>
        </View>
      </View>
    );
  }
}

export default ProfileCard;
