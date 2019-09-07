import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ProfileCard } from "../common";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { colors } from "../common";

const manIcon = require("../../assets/icons/Capture.png");

const FETCH_EMPLOYEES = gql`
  query {
    employees {
      firstName
      lastName
    }
  }
`;

const AbsenceTeamItem = ({ item, onPress }) => {
  return (
    <ProfileCard
      name={`${item.firstName} ${item.lastName}`}
      status="Employee"
      onPress={onPress}
      source={manIcon}
    />
  );
};

class AbsenceTeamList extends Component {
  _keyExtractor = (item, index) => item.firstName;
  _renderItem = ({ item }) => (
    <AbsenceTeamItem
      onPress={() => this.props.navigation.navigate("AbsenceHistory")}
      item={item}
    />
  );

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View
          style={{
            height: 58,
            backgroundColor: colors.white,
            borderWidth: 1,
            borderColor: colors.lightgray,
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
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: colors.black }}
          >
            Team List
          </Text>
          <TextInput style={styles.searchInput} placeholder="Search here" />
        </View>
        <View>
          <Query query={FETCH_EMPLOYEES} variables={{}}>
            {({ loading, error, data }) => {
              if (loading) return <ActivityIndicator size="large" />;
              if (error)
                return <Text>An error occurred while retrieving data</Text>;
              return (
                <View>
                  <FlatList
                    data={data.employees}
                    extraData={data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                  />
                </View>
              );
            }}
          </Query>
        </View>
      </View>
    );
  }
}

const styles = {
  searchInput: {
    backgroundColor: colors.white,
    width: "90%",
    alignSelf: "center",
    borderColor: colors.lightgray,
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 20,
    height: 40,
    justifyContent: "center"
  }
};

export { AbsenceTeamList };
