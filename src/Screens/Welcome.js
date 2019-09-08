import React, { Component } from "react";
import { Text, View } from "react-native";

class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.welcomeContainer}>
        <Text>Welcome</Text>
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
