import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"
class Header extends React.Component {
  render() {
    return (
      <View
        style={{
          height: 40,
          width: "100%",
          backgroundColor: "#00bfff",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
            flexDirection:'row'
        }}
      >
        <Icon style={{alignSelf:'flex-start', paddingLeft:10}} name={this.props.Icon} size={29} onPress={this.props.onPress}/>
        <Text style={{fontSize:22, color:'white'}}>{this.props.HeaderText}</Text>
      </View>
    );
  }
}
export default Header;
