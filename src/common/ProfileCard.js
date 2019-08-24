import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"

class ProfileCard extends Component {
  
  render() {
    // const {navigate} = this.props.navigation;
    return (
      <View
        style={{
          backgroundColor: "#f2f2f2",
          padding: 10,
          //   margin: 10,
          flexDirection: "row",
          borderColor: "#ddd",
          borderWidth: 1
        }}
      >
        <Image
          source={this.props.source}
          style={{
            width: 90,
            height: 90,
            backgroundColor: "#f2f2f2",
            borderRadius: 50
          }}
        />
        <View style={{ marginLeft: 10, width:"60%" }}>
          <Text style={{ color: "black" }}>{this.props.name}</Text>
          <Text style={{ color: "black" }}>{this.props.status}</Text>
        </View>
        <View style={{alignItems:"center", alignSelf:'center'}}>
        <Icon
            name="md-arrow-dropright"
            size={30}
            style={{ paddingLeft: 10, paddingRight: 20, alignSelf:'flex-end' }}
            onPress={this.props.onPress}
          />
        </View>
      </View>
    );
  }
}

export default ProfileCard;
