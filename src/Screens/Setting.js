import React, { Component } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SessionStore } from "../Stores";
import { colors } from "../common";

class Setting extends Component {
  state = {
    loading: false
  };

  logout = async () => {
    SessionStore.logout(() => {
      this.setState({ loading: true });
      setTimeout(() => {
        this.props.navigation.navigate("Login");
      }, 1000);
    });
  };

  render() {
    return (
      <View>
        <View
          style={{
            height: 58,
            backgroundColor: colors.white,
            borderWidth: 1,
            borderColor: colors.white,
            alignItems: "center",
            flexDirection: "row",
            borderBottomWidth: 1,
            padding: 10
          }}
        >
          <Icon
            name="md-menu"
            size={30}
            style={{ paddingLeft: 10, paddingRight: 20 }}
            onPress={() => this.props.navigation.openDrawer()}
          />
          <Text
            style={{ fontSize: 20, fontWeight: "normal", color: colors.gray }}
          >
            Settings
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.dimsky,
            borderRadius: 15,
            padding: 10,
            margin: 10,
            flexDirection: "row"
          }}
        >
          <Image
            source={{
              uri:
                "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
            }}
            style={{
              width: 90,
              height: 100,
              backgroundColor: colors.whitegray,
              borderRadius: 15
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: colors.white }}>@username</Text>
          </View>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 90
            }}
            onPress={() => this.logout()}
          >
            {this.state.loading && <ActivityIndicator size="small" />}
            {!this.state.loading && (
              <Icon
                name="md-log-out"
                size={30}
                style={{ alignSelf: "flex-end" }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export { Setting };
