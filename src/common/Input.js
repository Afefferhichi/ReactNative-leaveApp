import React from "react";
import { StyleSheet, TextInput } from "react-native";
import colors from "./colors";

const input = props => {
  let template = null;

  switch (props.type) {
    case "textinput":
      template = (
        <TextInput {...props} style={[styles.input, props.overrideStyle]} />
      );
      break;
    default:
      return template;
  }
  return template;
};
const styles = StyleSheet.create({
  input: {
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightyellow,
    fontSize: 16,
    padding: 5,
    marginTop: 10,
    alignSelf: "auto"
  }
});
export default input;
