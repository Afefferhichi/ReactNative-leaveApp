import React, { Component } from "react";
import { ActivityIndicator, FlatList, Platform, Text } from "react-native";
import {
  Button,
  Container,
  Content,
  Header,
  Icon,
  Input,
  Item
} from "native-base";

import { colors, ProfileCard } from "../common";
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
    this.state = {
      keyword: ""
    };
  }

  _keyExtractor = (item, index) => item.firstName;

  _renderItem = ({ item }) => (
    <AbsenceTeamItem onPress={() => Actions.AbsenceHistory()} item={item} />
  );

  searchFilterFunction = text => {
    this.setState({ keyword: text });
  };

  render() {
    return (
      <Query query={FETCH_EMPLOYEES} variables={{}}>
        {({ loading, error, data }) => {
          if (loading) {
            return <ActivityIndicator style={{ marginTop: 20 }} size="large" />;
          }
          if (error) {
            return <Text>An error occurred while retrieving data</Text>;
          }

          const employees = (data.employees.map(emp => ({
            ...emp,
            searchString: JSON.stringify(emp).toLowerCase()
          })));
          return (
            <Container>
              <Header
                androidStatusBarColor={colors.waterblue}
                iosBarStyle="light-content"
                style={styles.header}
                searchBar
                rounded
              >
                <Item>
                  <Icon active name="search" />
                  <Input
                    placeholder="Search by any keyword"
                    autoCorrect={false}
                    style={
                      Platform.OS === "android"
                        ? {
                            borderWidth: 1,
                            borderColor: colors.whitegray,
                            borderRadius: 50,
                            height: 35,
                            padding: 0,
                            paddingLeft: 15
                          }
                        : {}
                    }
                    onChangeText={text => this.searchFilterFunction(text)}
                  />
                  <Icon active name="people" />
                </Item>
                <Button transparent>
                  <Text>Search</Text>
                </Button>
              </Header>
              <Content>
                <FlatList
                  data={employees.filter(
                    emp =>
                      emp.id > 2 &&
                      (this.state.keyword
                        ? emp.searchString.indexOf(this.state.keyword) > -1
                        : true)
                  )}
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

const styles = {
  container: {
    backgroundColor: "#FFF"
  },
  header: {
    backgroundColor: "#FFF"
  },
  item: {
    flexDirection: "row"
  },
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  mb: {
    marginBottom: 15
  }
};

export { AbsenceTeamList };
