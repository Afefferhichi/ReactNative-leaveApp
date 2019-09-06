import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileCard from "../common/ProfileCard";

import { Query } from "react-apollo";
import gql from "graphql-tag";

const FETCH_EMPLOYEES = gql`
  {
    employees {
      firstName
      lastName
    }
  }
`;

const AbsenceTeamItem = ({ item }) => {
  return (
    <ProfileCard
      onPress={() => this.props.navigation.navigate("AbsenceHistory")}
      name={`${item.firstName} ${item.lastName}`}
      status="Employee"
      source={require("../../assets/icons/Capture.png")}
    />
  );
};

class AbsenceTeamList extends Component {
  _keyExtractor = (item, index) => item.firstName;

  _renderItem = ({ item }) => <AbsenceTeamItem item={item} />;

  render() {
    return (
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
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000000" }}>
          Team List
        </Text>
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
        <Query query={FETCH_EMPLOYEES} variables={{}}>
          {(loading, error, data) => {
            <View>
              {loading && <ActivityIndicator size="large" />}
              {error && <Text>An error occurred while retriving data</Text>}
              {!error && !loading && (
                <FlatList
                  data={data.employees}
                  extraData={data}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}
                />
              )}
            </View>;
          }}
        </Query>
      </View>
    );
  }
}

export { AbsenceTeamList };
