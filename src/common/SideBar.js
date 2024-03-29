import React, { Component } from "react";
import { Dimensions, FlatList, Image, Platform } from "react-native";
import {
  Badge,
  Button,
  Container,
  Content,
  Icon,
  Left,
  ListItem,
  Right,
  Text
} from "native-base";
import { Actions } from "react-native-router-flux";
import { SessionStore } from "../Stores";

const deviceHeight = Dimensions.get("window").height;

const datas = [
  {
    name: "Activity Feed",
    item_key: "ActivityFeed",
    icon: "md-home",
    bg: "#4DCAE0"
  },
  {
    name: "Leave Request",
    item_key: "LeaveRequest",
    icon: "ios-walk",
    bg: "#4DCAE0"
  },
  {
    name: "Exit Request",
    item_key: "ExitRequest",
    icon: "md-exit",
    bg: "#4DCAE0"
  },
  {
    name: "Show History",
    item_key: "ShowHistory",
    icon: "clock",
    bg: "#0A2C6B"
  },
  {
    name: "Team List",
    item_key: "AbsenceTeamList",
    icon: "md-people",
    bg: "#48525D"
  },
  {
    name: "Setting",
    item_key: "Setting",
    icon: "md-settings",
    bg: "#48525D"
  }
];

const drawerCover = require("../../assets/icons/logo2.jpg");

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  _onPress = async item_key => {
    Actions.drawerClose();
    Actions.currentScene !== item_key && Actions[item_key].call();
  };

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Button
            style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
            transparent
            color="black"
            onPress={this._onPress}
          >
            <Icon
              style={{
                color: "black",
                fontWeight: "bold",
                marginLeft: 18
              }}
              color="black"
              name="menu"
            />
          </Button>
          <Image style={styles.drawerCover} source={drawerCover} />
          <FlatList
            data={datas}
            extraData={this.state}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => {
              if (
                item.item_key === "AbsenceTeamList" &&
                !SessionStore.isAdmin()
              ) {
                return <></>;
              }
              return (
                <>
                  {item.item_key === "collapse-icon" && (
                    <Button
                      style={{ alignSelf: "flex-end" }}
                      transparent
                      color="black"
                      onPress={this._onPress}
                    >
                      <Icon
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          marginLeft: 18
                        }}
                        color="black"
                        name="menu"
                      />
                    </Button>
                  )}

                  {item.item_key !== "collapse-icon" && (
                    <ListItem
                      button
                      noBorder
                      onPress={this._onPress.bind(this, item.item_key)}
                    >
                      <Left>
                        <Icon
                          active
                          name={item.icon}
                          style={{ color: "#777", fontSize: 26, width: 30 }}
                        />
                        <Text style={styles.text}>{item.name}</Text>
                      </Left>
                      {item.types && (
                        <Right style={{ flex: 1 }}>
                          <Badge
                            style={{
                              borderRadius: 3,
                              height: 25,
                              width: 72,
                              backgroundColor: item.bg
                            }}
                          >
                            <Text style={styles.badgeText}>{`${
                              item.types
                            } Types`}</Text>
                          </Badge>
                        </Right>
                      )}
                    </ListItem>
                  )}
                </>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

const styles = {
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  },
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 15
  }
};

export { SideBar };