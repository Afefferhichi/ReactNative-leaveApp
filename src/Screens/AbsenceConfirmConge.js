import React, { Component } from "react";
import { Alert, Image, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors, constants } from "../common";
import { Actions } from "react-native-router-flux";
import { Button, Card, CardItem, Container, Content, Text } from "native-base";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import moment from "moment";

const APPROVE_REQUEST_CONGE = gql`
  mutation upd($input: congeInput!, $id: Int!) {
    updateConge(conge: $input, congeId: $id) {
      congeState
    }
  }
`;

const image_url =
  "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";

class AbsenceConfirmConge extends Component {
  constructor() {
    super();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title:
        navigation.getParam("mode") === constants.CongeState.APPROVED
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
    const { conge } = this.props;
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
                  {`${conge.employee.firstName} ${
                    conge.employee.lastName
                  }`}
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
                    {conge.congeState.humanize()}
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
                    {this.props.mode === constants.CongeState.APPROVED
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
                  Start Date
                </Text>
                <Text style={{ width: "60%" }}>
                  {moment(conge.start_Date).format(constants.DATE_FORMAT)}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ width: "40%", fontWeight: "bold" }}>
                  End Date
                </Text>
                <Text style={{ width: "60%" }}>
                  {moment(conge.end_Date).format(constants.DATE_FORMAT)}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ width: "40%", fontWeight: "bold" }}>Reason</Text>
                <Text style={{ width: "60%" }}>
                  {conge.reason.humanize()}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ width: "40%", fontWeight: "bold" }}>Status</Text>
                <Text style={{ width: "60%" }}>
                  {conge.congeState.humanize()}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ width: "40%", fontWeight: "bold" }}>Note</Text>
                <Text style={{ width: "60%" }}>{conge.motif}</Text>
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

                <Mutation mutation={APPROVE_REQUEST_CONGE}>
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
                                ...(this.props.mode ===
                                constants.CongeState.APPROVED
                                  ? {
                                      congeState: constants.CongeState.APPROVED
                                    }
                                  : {
                                      congeState: constants.CongeState.REFUSED
                                    })
                              },
                              id: conge.id
                            };

                            approveMutation({ variables })
                              .then(res => {
                                const result = res
                                  ? res.data
                                    ? res.data.updateConge
                                      ? !0
                                      : false
                                    : false
                                  : false;
                                if (result) {
                                  Alert.alert(
                                    "",
                                    this.props.mode ===
                                      constants.CongeState.APPROVED
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
          </Card>
        </Content>
      </Container>
    );
  }
}

export { AbsenceConfirmConge };
