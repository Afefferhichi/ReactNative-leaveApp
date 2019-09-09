import React, { Component } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../common";
import { Actions } from "react-native-router-flux";
const image_url =
  "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
class AbsenceConfirm extends Component {
  constructor() {
    super();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("mode")
    };
  };

  onConfirm = () => {
    Actions.pop();
  };
  onCancel = () => {
    Actions.pop();
  };

  render2() {
    return (<Text>Here...</Text>);
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: colors.white,
          margin: 10
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderWidth: 1,
            borderColor: colors.whitegray,
            padding: 10
          }}
        >
          <Image
            source={{
              uri: image_url
            }}
            style={{
              width: 50,
              height: 50,
              backgroundColor: colors.lightyellow,
              borderRadius: 50
            }}
          />

          <View
            style={{
              flexDirection: "column"
            }}
          >
            <Text
              style={{
                marginLeft: 5,
                fontWeight: "600"
              }}
            >
              Heart, Jennifer
            </Text>
            <View
              style={{
                flexDirection: "row"
              }}
            >
              <Text
                style={{
                  backgroundColor: colors.gray,
                  color: colors.white,
                  paddingVertical: 1,
                  paddingHorizontal: 5,
                  marginHorizontal: 5,
                  borderRadius: 3
                }}
              >
                Pending
              </Text>
              <Text>-></Text>
              <Text
                style={{
                  backgroundColor: colors.cyanblue,
                  color: colors.white,
                  paddingVertical: 1,
                  paddingHorizontal: 5,
                  marginHorizontal: 5,
                  borderRadius: 3
                }}
              >
                Approve
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Icon name="md-clock" size={14} />
            <Text style={{ fontSize: 11, marginLeft: 5 }}>199 days ago</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderWidth: 1,
            borderColor: colors.whitegray,
            borderTopWidth: 0,
            padding: 10
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Image
              source={{
                uri:
                  "https://s7img.ftdi.com/is/image/ProvideCommerce/PF_19_R299_LAY_SHP_V2?$proflowers-tile-wide-mv-new$"
              }}
              style={{
                width: 50,
                height: 50,
                backgroundColor: colors.whitegray,
                borderRadius: 50
              }}
            />

            <View
              style={{
                width: "100%",
                paddingRight: 110
              }}
            >
              <TextInput
                multiline={true}
                style={{
                  width: "100%",
                  height: 100,
                  marginLeft: 10,
                  borderWidth: 1,
                  borderColor: colors.whitegray,
                  textAlignVertical: "top"
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderWidth: 1,
            borderColor: colors.whitegray,
            borderTopWidth: 0,
            padding: 3
          }}
        >
          <TouchableOpacity
            onPress={() => this.onConfirm()}
            style={{
              width: "50%",
              height: 33,
              backgroundColor: colors.white,
              alignItems: "center",
              borderColor: colors.red,
              borderWidth: 1,
              borderRadius: 1
            }}
          >
            <Text style={{ height: 33, color: colors.red, lineHeight: 28 }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onCancel()}
            style={{
              width: "50%",
              height: 33,
              backgroundColor: colors.red,
              alignItems: "center",
              borderColor: colors.red,
              borderWidth: 1,
              borderRadius: 1
            }}
          >
            <Text
              style={{ height: 33, color: colors.whitegray, lineHeight: 28 }}
            >
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export { AbsenceConfirm };
