import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../common/Header";

class Setting extends Component {
  render() {
    return (
      <View>
      <View
        style={{
          height: 58,
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "white",
          alignItems: "center",
          flexDirection: "row",
          borderBottomWidth:1,
          padding:10,

        }}
      >
        <Icon
          name="md-menu"
          size={30}
          style={{ paddingLeft: 10, paddingRight: 20 }}
          onPress={() => this.props.navigation.openDrawer()}
        />
        <Text style={{ fontSize: 20, fontWeight: "normal", color: "#696969" }}>
          Settings
        </Text>
      </View>
        
        <View
          style={{
            backgroundColor: "#C4D7ED",
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
              backgroundColor: "#f2f2f2",
              borderRadius: 15
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: "white" }}>Nour Al jenin</Text>
            <Text style={{ color: "white" }}>Tranee</Text>
          </View>
          {/* <TouchableOpacity
            style={{
              width: "0%",
              height: 45,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              marginTop: 5,
              alignSelf: "center",
              marginLeft: 10,
              marginTop: 40
            }}
            onPress={() => this.props.navigation.navigate("Holiday")}
          >
            <Text style={{ color: "tomato" }}>Daily Detail</Text>
          </TouchableOpacity> */}
          <View
            style={{
              alignSelf: "flex-end",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 90
            }}
          >
            <Icon
              name="md-log-out"
              size={30}
              style={{ alignSelf: "flex-end" }}
              onPress={() =>
                this.props.navigation.navigate("Login")}
            />
            {/* <Text style={{ fontSize: 12 }}>LOG OUT</Text> */}
          </View>
        </View>
      
      </View>
    );
  }
}

export default Setting;
