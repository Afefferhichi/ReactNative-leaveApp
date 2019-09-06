import React, {Component} from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "./colors";

class Header extends Component {
  render() {
    return (
      <View
        style={{
          height: 40,
          width: "100%",
          backgroundColor: colors.waterblue,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 15,
          flexDirection: "row"
        }}
      >
        <Icon
          style={{ alignSelf: "flex-start", paddingLeft: 10 }}
          name={this.props.Icon}
          size={29}
          onPress={this.props.onPress}
        />
        <Text style={{ fontSize: 22, color: colors.white }}>
          {this.props.HeaderText}
        </Text>
      </View>
    );
  }
}

export default Header;
