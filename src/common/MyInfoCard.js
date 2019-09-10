import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { colors } from "./colors";
import { SessionStore } from "../Stores";

const woman_image_url =
  "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";

class MyInfoCard extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "row"
        }}
      >
        <Image
          source={{
            uri: woman_image_url
          }}
          style={{
            width: 50, height: 50,
            borderRadius: 50,
            backgroundColor: colors.dimsky,
            marginLeft: 10
          }}
        />
        <View style={{ marginLeft: 20, marginTop: 5, marginBottom: 20 }}>
          <Text
            style={{
              color: colors.black,
              fontSize: 16
            }}
          >
            {this.props.userName || SessionStore.userName()}
          </Text>
          <Text style={{ color: colors.gray }}>Some information</Text>
        </View>
      </View>
    );
  }
}

export { MyInfoCard };
