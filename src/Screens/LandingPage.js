/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { SessionStore } from "../Stores/SessionStore";

class LandingPage extends Component {
  componentDidMount(): void {
    SessionStore.isLoggedIn().then(async loggedIn => {
      if (!loggedIn) {
        Actions.reset("Login");
      }
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignSelf: "center"
        }}
      >
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }
}

export {LandingPage};
