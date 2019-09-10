import React, { Component } from "react";
import { Platform, UIManager, RefreshControl } from "react-native";
import { Container, Content, Text } from "native-base";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

import client from "../config/createApolloClient";
import { HelperStore, SessionStore } from "../Stores";
import {
  colors,
  constants,
  ExitRequestCard,
  LeaveRequestCard
} from "../common";

const GET_EMPLOYEES = gql`
  query employees {
    employees {
      id
      firstName
      lastName
      conges {
        congeState
        end_Date
        start_Date
        half_Day
        id
        motif
        reason
      }
      sorties {
        employeeId
        sortieState
        id
        motif
        recovery_Date
        sortie_Date
        sortieTime
      }
      remainingCongeSolde
      login
      password
      teamEmployee {
        teamId
        id
        employeeId
      }
      initialCongeSolde
    }
  }
`;

const GET_EMPLOYEE = gql`
  query employee($id: Int!) {
    employee(empId: $id) {
      id
      firstName
      lastName
      conges {
        congeState
        end_Date
        start_Date
        half_Day
        id
        motif
        reason
      }
      sorties {
        employeeId
        sortieState
        id
        motif
        recovery_Date
        sortie_Date
        sortieTime
      }
    }
  }
`;

class ActivityFeed extends Component {
  constructor() {
    super();
    this.state = {
      refreshing: false
    };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount(): void {
  }

  onRefresh = () => {
    this.setState({refreshing: false})
  };

  // ============== Confirmation:End ===============
  _onRefresh = () => {
    this.setState({ refreshing: true });
  };
  render() {
    return (
      <ApolloProvider client={client}>
        <Container>
          <Query
            query={SessionStore.isAdmin() ? GET_EMPLOYEES : GET_EMPLOYEE}
            variables={
              SessionStore.isAdmin() ? {} : { id: SessionStore.userId() }
            }
          >
            {({ loading, error, data, refetch  }) => {
              if (loading) {
                return <Text>Loading...</Text>;
              }

              if (error) {
                return (
                  <Text style={styles.login.error}>An error occurred</Text>
                );
              }

              const employees = data.employees || [data.employee];

              if (employees.length > 0) {
                const { sorties, conges } = HelperStore.getSortiesAndConges(
                  employees
                );
                let nCount = 0;
                return (
                  <Content
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={refetch}
                      />
                    }
                    padder
                    style={{ height: "90%" }}
                  >
                    <>
                      {conges &&
                        conges.map(conge => {
                          if (nCount++ > 0) {
                            nCount = 0;
                            return;
                          }
                          if (
                            conge.congeState === constants.CongeState.PENDING
                          ) {
                            return <LeaveRequestCard conge={conge} />;
                          }
                        })}

                      {sorties &&
                        sorties.map(sortie => {
                          if (nCount++ > 0) return;
                          if (
                            sortie.sortieState === constants.SortieState.PENDING
                          ) {
                            return <ExitRequestCard sortie={sortie} />;
                          }
                        })}
                    </>
                  </Content>
                );
              } else {
                return <Text>Opps, you don't have any Exit Requests.</Text>;
              }
            }}
          </Query>
        </Container>
      </ApolloProvider>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 10,
    // justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0
  },
  container1: {
    fontSize: 25,
    color: colors.red,
    padding: 10
  },

  text: {
    fontSize: 17,
    color: colors.black,
    padding: 10
  },

  btnText: {
    textAlign: "center",
    color: colors.white,
    fontSize: 20
  },

  btnTextHolder: {
    borderWidth: 0,
    backgroundColor: colors.white
  },

  Btn: {
    color: colors.darkblue
  },
  login: {
    info: {
      color: colors.yellow
    },
    error: {
      color: colors.red
    },
    success: {
      color: colors.green
    }
  }
};

export { ActivityFeed };
