import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Body, Left, ListItem, Right, Text, Thumbnail } from "native-base";

import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "./colors";
import { Actions } from "react-native-router-flux";

class ProfileCard extends Component {
  showHistoryScreen = (employee_id) => {
    Actions.ShowHistory({employee_id: employee_id});
  };

  render() {
    return (
      <ListItem
        avatar button
        onPress={() => this.showHistoryScreen(this.props.employee_id)}
       >
        <Left>
          <Thumbnail source={this.props.source} small />
        </Left>
        <Body>
          <Text style={{ color: colors.black }}>{this.props.name}</Text>
          <Text style={{ color: colors.black }}>{this.props.status}</Text>
        </Body>

        <Right style={{flexDirection: "column", justifyContent: "center"}}>
          <Icon
            name="ios-arrow-forward"
            size={20}
          />
        </Right>
      </ListItem>
    );
  }
}

export { ProfileCard };
