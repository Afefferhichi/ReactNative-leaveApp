import React, { Component } from "react";
import { View } from "react-native";

import { AuthLogo } from "../common";

class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.welcomeContainer}>
        <AuthLogo />
      </View>
    );
  }
}

const styles = {
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};

export { Welcome };
