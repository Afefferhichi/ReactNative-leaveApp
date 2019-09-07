import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../common";

class AbsenceHistory extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  render() {
    return (
      <View>
        <View
          style={{
            marginTop: 5,
            borderBottomColor: colors.white,
            borderWidth: 1,
            borderColor: colors.whitegray,
            backgroundColor: colors.whitegray,
            height: "25%",
            width: "100%",
            justifyContent: "center"
          }}
        >
          <Text
            style={{ color: colors.black, fontWeight: "bold", marginLeft: 20 }}
          >
            {this.props.topText}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: colors.whitegray,
            padding: 10,
            //   margin: 10,
            flexDirection: "row",
            borderColor: colors.whitegray,
            borderWidth: 1
          }}
        >
          <View style={{ marginLeft: 10, width: "60%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: colors.black }}>{this.props.shift} :</Text>
              <Text style={{ color: colors.black }}>
                Time: {this.props.time}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: colors.black }}>Morning :</Text>
              <Text style={{ color: colors.black }}>Time: 6: 00, pm</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: colors.black }}>Morning :</Text>
              <Text style={{ color: colors.black }}>Time: 6: 00, pm</Text>
            </View>
          </View>
          <View style={{ alignItems: "center", alignSelf: "center" }}>
            <Icon
              name="md-arrow-dropright"
              size={30}
              style={{
                paddingLeft: 10,
                paddingRight: 20,
                alignSelf: "flex-end",
                marginLeft: 75
              }}
              onPress={this.props.onPress}
            />
          </View>
        </View>
      </View>
    );
  }
}

export { AbsenceHistory };
