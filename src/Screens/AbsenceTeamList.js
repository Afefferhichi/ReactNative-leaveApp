import React, { Component } from "react";
import { View, Text, Image, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../common/Header";
import ProfileCard from "../common/ProfileCard";
import { ScrollView } from "react-native-gesture-handler";
//import {withEmployees} from '../hocs'

class AbsenceTeamList extends Component {
  render() {
    console.log('This is props ===>>>',this.props)
    return (
      <View>
        <View
          style={{
            height: 58,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#f3f3f3",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <Icon
            name="md-menu"
            size={30}
            style={{ paddingLeft: 10, paddingRight: 20 }}
            onPress={() => this.props.navigation.openDrawer()}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000000"  }}>
                           Team List
          </Text>
        </View>
        <TextInput
          style={{
            backgroundColor: "white",
            width: "90%",
            alignSelf: "center",
            borderColor: "#f3f3f3",
            borderWidth: 1,
            marginTop: 5,
            marginBottom: 5,
            borderRadius: 20,
            height: 40,
            justifyContent: "center"
          }}
          placeholder="Search here"
        />
        <ScrollView>
          <ProfileCard
            name="Nour Al Jinen"
            status="Trainee"
            source={{
              uri:
                "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
            }}
          />
          <ProfileCard
            name="Awais Ahmed"
            status="Leave for nothingss"
            source={{
              uri:
                "https://s7img.ftdi.com/is/image/ProvideCommerce/PF_19_R299_LAY_SHP_V2?$proflowers-tile-wide-mv-new$"
            }}
          />
          <ProfileCard
            name="Nour Al Jenin"
            status="Leave for brother weddigns"
            source={{
              uri:
                "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
            }}
          />
          <ProfileCard
            name="Iheb ayadi"
            status="Employee"
            source={{
              uri:
                "http://www.himalayanbuzz.com/wp-content/uploads/2016/10/Shubh-Chandra-Cover.jpg"
            }}
          />
          <ProfileCard
            name="Muhammad Ali "
            status="Leave for unKnown reason"
            source={{
              uri:
                "http://www.himalayanbuzz.com/wp-content/uploads/2016/10/Shubh-Chandra-Cover.jpg"
            }}
          />
          <ProfileCard
            name="Awais Ahmed"
            status="Leave for nothingss"
            source={{
              uri:
                "http://www.himalayanbuzz.com/wp-content/uploads/2016/10/Shubh-Chandra-Cover.jpg"
            }}
          />
        </ScrollView>
      </View>
    );
  }
}
  export default AbsenceTeamList;
//export default withEmployees(AbsenceTeamList);
