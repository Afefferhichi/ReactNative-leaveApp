import React, { Component } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { Container, Content } from "native-base";

import { ProfileCard } from "../common";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Actions } from "react-native-router-flux";

const manIcon = require("../../assets/icons/Capture.png");

const FETCH_EMPLOYEES = gql`
  query {
    employees {
      id
      firstName
      lastName
    }
  }
`;

const AbsenceTeamItem = ({ item, onPress }) => {
  return (
    <ProfileCard
      employee_id={item.id}
      name={`${item.firstName} ${item.lastName}`}
      status="Employee"
      onPress={onPress}
      source={manIcon}
    />
  );
};

class AbsenceTeamList extends Component {
  constructor(props) {
    super(props);
  }

  _keyExtractor = (item, index) => item.firstName;

  _renderItem = ({ item }) => (
    <AbsenceTeamItem onPress={() => Actions.AbsenceHistory()} item={item} />
  );

  render() {
    return (
      <Query query={FETCH_EMPLOYEES} variables={{}}>
        {({ loading, error, data }) => {
          if (loading) {
            return <ActivityIndicator style={{marginTop: 20}} size="large" />;
          }
          if (error) {
            return <Text>An error occurred while retrieving data</Text>;
          }
          return (
            <Container>
              <Content>
                <FlatList
                  data={data.employees.filter(emp=>emp.id > 2)}
                  extraData={data}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}
                />
              </Content>
            </Container>
          );
        }}
      </Query>
    );
  }
}

export { AbsenceTeamList };
