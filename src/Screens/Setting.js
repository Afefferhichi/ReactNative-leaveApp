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

const woman_image_url =
  "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
class Setting extends Component {
  state = {
    loading: false
  };

  logout = async () => {
    SessionStore.logout(() => {
      this.setState({ loading: true });
      setTimeout(() => {
        this.props.navigation.replace("Login");
      }, 1000);
    });
  };

  render() {
    const { loading } = this.state;
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
              uri: woman_image_url
            }}
            style={{
              width: 90,
              height: 100,
              backgroundColor: colors.whitegray,
              borderRadius: 15
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: colors.black }}>
              {SessionStore.isLoggedIn() && SessionStore.userName()}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 15,
              bottom: 10
            }}
            onPress={() => this.logout()}
          >
            {loading && <ActivityIndicator size="small" />}
            {!loading && (
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
