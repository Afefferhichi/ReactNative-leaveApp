import React from "react";
import { View, Text } from "react-native";
class Header extends React.Component {
  render() {
    return (
      <View
        style={{
          height: 40,
          width: "100%",
          backgroundColor: "#add8e6",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10
        }}
      >
        <Text>{this.props.HeaderText}</Text>
      </View>
    );
  }
}
export default Header;
