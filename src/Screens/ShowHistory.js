import React, { Component } from "react";
import { Text } from "react-native";
import { Container, Content } from "native-base";
import { constants, DayDetail, MyInfoCard } from "../common";
import { HelperStore, SessionStore } from "../Stores";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import moment from "moment";

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

class ShowHistory extends Component {
  constructor(props) {
    super(props);

  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "History of All Requests"
    };
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Query
            query={GET_EMPLOYEE}
            variables={{
              id: this.props.employee_id || SessionStore.userId()
            }}
          >
            {({ loading, error, data }) => {
              if (loading) {
                return <Text>Loading...</Text>;
              }
              if (error) {
                return <Text>An error occurred</Text>;
              }
              if (!data) {
                return <Text>An error occurred</Text>;
              }

              const employees = data.employees || [data.employee];

              const { sorties, conges } = HelperStore.getSortiesAndConges(
                employees
              );

              return (
                <>
                  <MyInfoCard userName={`${employees[0].firstName} ${employees[0].lastName}`} />
                  {conges.length === 0 && sorties.length ===0 &&
                    <Text>There is no data to display</Text>
                  }
                  {conges &&
                    conges.map(conge => {
                      return (
                        <DayDetail
                          DayHeader={"Leave: " + conge.motif}
                          Caption1={
                            " " +
                            moment(conge.start_Date).format(
                              constants.DATE_FORMAT
                            )
                          }
                          Caption2={
                            " " +
                            moment(conge.end_Date).format(constants.DATE_FORMAT)
                          }
                          Caption3={" " + conge.congeState}
                        />
                      );
                    })}

                  {sorties &&
                    sorties.map(sortie => {
                      return (
                        <DayDetail
                          DayHeader={"Exit: " + sortie.motif}
                          Caption1={
                            " " +
                            moment(sortie.sortie_Date).format(
                              constants.DATE_FORMAT
                            )
                          }
                          Caption2={
                            " " +
                            moment(sortie.recovery_Date).format(
                              constants.DATE_FORMAT
                            )
                          }
                          Caption3={" " + sortie.sortieState}
                        />
                      );
                    })}
                </>
              );
            }}
          </Query>
        </Content>
      </Container>
    );
  }
}

export { ShowHistory };
