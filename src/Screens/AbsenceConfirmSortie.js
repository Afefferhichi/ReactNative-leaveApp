import React, { Component } from "react";
import { Alert, Image, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors, constants } from "../common";
import { Actions } from "react-native-router-flux";
import { Button, Card, CardItem, Container, Content, Text } from "native-base";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import moment from "moment";

const APPROVE_REQUEST_SORTIE = gql`
  mutation upds($input: sortieInput!, $id: Int!) {
    updateSortie(sortie: $input, sortieId: $id) {
      sortieState
    }
  }
`;

const image_url =
  "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";

class AbsenceConfirmSortie extends Component {
  constructor() {
    super();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title:
        navigation.getParam("mode") === constants.SortieState.APPROVED
          ? "Approve"
          : "Reject"
    };
  };

  onConfirm = () => {
    Actions.pop();
  };
  onCancel = () => {
    Actions.pop();
  };

  render() {
    const { sortie, mode } = this.props;
    return (
      <Container>
        <Content padder>
          <Card noShadow>
            <CardItem
              style={{ flexDirection: "row", justifyContent: "space-around" }}
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
                  {`${sortie.employee.firstName} ${sortie.employee.lastName}`}
                </Text>
                <View
                  style={{
                    flexDirection: "row"
                  }}
                >
                  <Text
                    style={{
                      backgroundColor: colors.lightgray,
                      color: colors.white,
                      fontSize: 12,
                      paddingVertical: 1,
                      paddingHorizontal: 5,
                      marginHorizontal: 5,
                      borderRadius: 3
                    }}
                  >
                    {sortie.sortieState.humanize()}
                  </Text>
                  <Text>-></Text>
                  <Text
                    style={{
                      backgroundColor: colors.cyanblue,
                      color: colors.white,
                      fontSize: 12,
                      paddingVertical: 1,
                      paddingHorizontal: 5,
                      marginHorizontal: 5,
                      borderRadius: 3
                    }}
                  >
                    {mode === constants.SortieState.APPROVED
                      ? "Approve"
                      : "Reject"}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", top: -20, right: -5 }}>
                <Icon name="md-clock" size={14} />
                <Text style={{ fontSize: 13, top: -2, left: 5 }}>
                  Created at
                </Text>
              </View>
            </CardItem>
            <CardItem bordered style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ width: "40%", fontWeight: "bold" }}>
                  Exit Date
                </Text>
                <Text style={{ width: "60%" }}>
                  {moment(sortie.sortie_Date).format(constants.DATE_FORMAT)}
                </Text>
              </View>
              <View style={{ marginTop: 5, flexDirection: "row" }}>
                <Text style={{ width: "40%", fontWeight: "bold" }}>
                  Recovery Date
                </Text>
                <Text style={{ width: "60%" }}>
                  {moment(sortie.recovery_Date).format(constants.DATE_FORMAT)}
                </Text>
              </View>
              <View style={{ marginTop: 5, flexDirection: "row" }}>
                <Text style={{ width: "40%", fontWeight: "bold" }}>
                  Exit Time
                </Text>
                <Text style={{ width: "60%" }}>
                  {sortie.sortieTime.humanize()}
                </Text>
              </View>
              <View style={{ marginTop: 5, flexDirection: "row" }}>
                <Text style={{ width: "40%", fontWeight: "bold" }}>
                  Exit Status
                </Text>
                <Text style={{ width: "60%" }}>
                  {sortie.sortieState.humanize()}
                </Text>
              </View>
              <View style={{ marginTop: 5, flexDirection: "row" }}>
                <Text style={{ width: "40%", fontWeight: "bold" }}>Note</Text>
                <Text style={{ width: "60%" }}>{sortie.motif}</Text>
              </View>
            </CardItem>
            <CardItem cardBody>
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
                <Button
                  primary
                  block
                  onPress={() => Actions.pop()}
                  style={{
                    width: "50%",
                    height: 33,
                    backgroundColor: colors.white,
                    alignItems: "center",
                    borderColor: colors.waterblue,
                    borderWidth: 1,
                    borderRadius: 1
                  }}
                >
                  <Text
                    style={{
                      color: colors.waterblue
                    }}
                    uppercase={false}
                  >
                    Cancel
                  </Text>
                </Button>

                <Mutation mutation={APPROVE_REQUEST_SORTIE}>
                  {(approveMutation, { loading, error, data }) => {
                    return (
                      <Button
                        primary
                        block
                        onPress={() => this.onCancel()}
                        style={{
                          width: "50%",
                          height: 33,
                          backgroundColor: colors.waterblue,
                          alignItems: "center",
                          borderColor: colors.waterblue,
                          borderWidth: 1,
                          borderRadius: 1
                        }}
                      >
                        <Text
                          uppercase={false}
                          onPress={() => {
                            const variables = {
                              input: {
                                ...(mode === constants.SortieState.APPROVED
                                  ? {
                                      sortieState:
                                        constants.SortieState.APPROVED
                                    }
                                  : {
                                      sortieState: constants.SortieState.REFUSED
                                    })
                              },
                              id: sortie.id
                            };

                            // alert(JSON.stringify(variables)); return;

                            approveMutation({ variables })
                              .then(res => {
                                const result = res
                                  ? res.data
                                    ? res.data.updateSortie
                                      ? !0
                                      : false
                                    : false
                                  : false;
                                if (result) {
                                  Alert.alert(
                                    "",
                                    mode === constants.SortieState.APPROVED
                                      ? "Approved successfully!"
                                      : "Rejected successfully!",
                                    [
                                      {
                                        text: "OK",
                                        onPress: () => Actions.pop()
                                      }
                                    ]
                                  );
                                } else {
                                  alert("An error occurred while approving");
                                }
                              })
                              .catch(err => {
                                const result = err
                                  ? err.graphQLErrors.length !== 0
                                    ? "There was an error on Server"
                                    : err.networkError
                                    ? "There was a network problem"
                                    : "Unknown error occurred"
                                  : "Unknown error occurred";
                                Alert.alert("", result);
                              });
                          }}
                        >
                          OK
                        </Text>
                      </Button>
                    );
                  }}
                </Mutation>
              </View>
            </CardItem>

            {/*
             */}
          </Card>
        </Content>
      </Container>
    );
  }
}

export { AbsenceConfirmSortie };
