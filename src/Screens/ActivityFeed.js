import React, { Component } from "react";
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from "react-native";
import { ActionSheet } from "teaset";
import Icon from "react-native-vector-icons/Ionicons";

import { Header, AbsenceCard, colors } from "../common";
import { SessionStore, ExitRequestStore } from "../Stores";

class ActivityFeed extends Component {
  constructor() {
    super();

    this.state = {
      expanded: false,
      expanded2: false,
      exitRequestData: {},
      exitRequests: []
    };

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  setAnimation = () =>
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  async componentDidMount() {
    ExitRequestStore.get(exitRequestData => {
      this.setState({ exitRequests: [exitRequestData] });
    });
  }

  // ============== Confirmation ===============
  showConfirmationButtons = () => {
    ActionSheet.hide();
    let items = [
      {
        title: "Approve",
        onPress: () =>
          this.props.navigation.navigate("AbsenceConfirm", { mode: "APPROVE" })
      },
      {
        title: "Reject",
        onPress: () =>
          this.props.navigation.navigate("AbsenceConfirm", { mode: "REJECT" })
      }
    ];
    let cancelItem = { title: "Cancel" };
    ActionSheet.show(items, cancelItem);
  };
  // ============== Confirmation:End ===============

  render() {
    const { expanded, expanded2, exitRequests } = this.state;
    return (
      <View>
        <View
          style={{
            height: 58,
            backgroundColor: colors.white,
            borderWidth: 1,
            borderColor: colors.white,
            alignItems: "center",
            flexDirection: "row",
            borderBottomWidth: 1,
            padding: 10
          }}
        >
          <Icon
            name="md-menu"
            size={30}
            style={{ paddingLeft: 10, paddingRight: 20 }}
            onPress={() => this.props.navigation.openDrawer()}
          />

          <Text
            style={{ fontSize: 20, fontWeight: "normal", color: colors.gray }}
          >
            Activity Feed
          </Text>
        </View>
        <ScrollView style={{ height: "90%" }}>
          <View style={styles.container}>
            <View style={styles.container}>
              <Header HeaderText="Leave Request" />
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: "30%" }}>
                  <Icon
                    name="md-calendar"
                    size={29}
                    style={{ marginLeft: 30 }}
                  />
                </View>
                <View
                  style={{
                    borderWidth: 0,
                    width: " 70%",
                    borderColor: colors.whitegray,
                    borderLeftColor: colors.red,
                    borderLeftWidth: 0,
                    marginLeft: 5,
                    marginTop: 5
                  }}
                >
                  <AbsenceCard />
                  <View style={{ marginLeft: 150 }}>
                    <View style={styles.circleIcon}>
                      <Icon
                        activeOpacity={0.8}
                        onPress={() => {
                          this.setAnimation();
                          this.setState({ expanded: !expanded });
                        }}
                        style={styles.Btn}
                        name={!expanded ? "md-arrow-down" : "md-arrow-up"}
                        size={22}
                      />
                    </View>
                  </View>

                  <View style={styles.btnTextHolder}>
                    <View
                      style={{
                        height: expanded ? null : 0,
                        overflow: "hidden"
                      }}
                    >
                      {/*  */}
                      <View
                        style={{
                          flexDirection: "row",
                          marginLeft: 5,
                          marginBottom: 5
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>From: </Text>
                        <Text>12/01/2018</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          marginLeft: 5,
                          marginBottom: 5
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>To: </Text>
                        <Text>12/01/2018</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          marginLeft: 5,
                          marginBottom: 5
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          Absence Type:{" "}
                        </Text>
                        <Text>Holliday</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          marginLeft: 5,
                          marginBottom: 5
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>Reason: </Text>
                        <Text>20.0 days</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          marginLeft: 5,
                          marginBottom: 5
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>Token: </Text>
                        <Text>2.00 Days</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          marginLeft: 5,
                          marginBottom: 5
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>Remaning: </Text>
                        <Text>18.00 Days</Text>
                      </View>
                      {/*  */}
                    </View>
                  </View>
                  {/*  */}
                </View>
              </View>
              <View style={styles.btnTextHolder}>
                <View
                  style={{
                    height: expanded ? null : 0,
                    overflow: "hidden"
                  }}
                >
                  {/*  */}
                  <View
                    style={{
                      height: 40,
                      backgroundColor: colors.white,
                      flexDirection: "row",
                      alignItems: "center",
                      alignSelf: "center",
                      paddingLeft: 55
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        height: 30,
                        width: 90,
                        backgroundColor: colors.lightgray,
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 5,
                        borderRadius: 3,
                        marginRight: 20
                      }}
                      onPress={() =>
                        this.props.navigation.navigate("LeaveRequest")
                      }
                    >
                      <Text style={{ color: colors.white }}>OPEN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: 30,
                        width: 50,
                        backgroundColor: colors.lightgray,
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 5,
                        borderRadius: 3
                      }}
                      onPress={() => this.showConfirmationButtons()}
                    >
                      <Icon
                        name="md-menu"
                        size={30}
                        style={{ color: colors.white }}
                      />
                    </TouchableOpacity>
                  </View>
                  {/*  */}
                </View>
              </View>
              {/* second card  */}
              <View style={{ marginTop: 10 }}>
                <Header HeaderText="Exit Request" />
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "30%" }}>
                    <Icon name="md-time" size={29} style={{ marginLeft: 30 }} />
                  </View>

                  {exitRequests.length === 0 && (
                    <Text>Oops, you don't have any Exit Requeyet.</Text>
                  )}
                  {exitRequests.length > 0 && (
                    <View
                      style={{
                        borderWidth: 0,
                        width: " 70%",
                        borderColor: colors.whitegray,
                        borderLeftColor: colors.blue,
                        borderLeftWidth: 0,
                        marginLeft: 5,
                        marginTop: 5
                      }}
                    >
                      <AbsenceCard />
                      <View style={{ marginLeft: 150 }}>
                        <View style={styles.circleIcon}>
                          <Icon
                            activeOpacity={0.8}
                            onPress={() => {
                              this.setAnimation();
                              this.setState({ expanded2: !expanded2 });
                            }}
                            style={styles.Btn}
                            name={expanded2 ? "md-arrow-up" : "md-arrow-down"}
                            size={22}
                          />
                        </View>
                      </View>

                      {/* /// */}

                      <View style={styles.btnTextHolder}>
                        <View
                          style={{
                            height: expanded2 ? null : 0,
                            overflow: "hidden"
                          }}
                        >
                          {/*  */}
                          <View
                            style={{
                              flexDirection: "row",
                              marginLeft: 5,
                              marginBottom: 5
                            }}
                          >
                            <Text style={{ fontWeight: "bold" }}>From: </Text>
                            <Text>12/01/2018</Text>
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              marginLeft: 5,
                              marginBottom: 5
                            }}
                          >
                            <Text style={{ fontWeight: "bold" }}>Time: </Text>
                            <Text>Holliday</Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              marginLeft: 5,
                              marginBottom: 5
                            }}
                          >
                            <Text style={{ fontWeight: "bold" }}>
                              Absence Type:{" "}
                            </Text>
                            <Text>20.0 days</Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              marginLeft: 5,
                              marginBottom: 5
                            }}
                          >
                            <Text style={{ fontWeight: "bold" }}>Reason: </Text>
                            <Text>2.00 Days</Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              marginLeft: 5,
                              marginBottom: 5
                            }}
                          >
                            <Text style={{ fontWeight: "bold" }}>
                              date of recovery:{" "}
                            </Text>
                            <Text>18.00 Days</Text>
                          </View>

                          <View
                            style={{
                              height: 40,
                              backgroundColor: colors.white,
                              flexDirection: "row",
                              alignItems: "center"
                            }}
                          >
                            <TouchableOpacity
                              style={{
                                height: 30,
                                width: 90,
                                backgroundColor: colors.lightgray,
                                justifyContent: "center",
                                alignItems: "center",
                                marginLeft: 5,
                                borderRadius: 3,
                                marginRight: 20
                              }}
                              onPress={() =>
                                this.props.navigation.navigate("ExitDetail")
                              }
                            >
                              <Text style={{ color: colors.white }}>OPEN</Text>
                            </TouchableOpacity>
                            {SessionStore.isAdmin() && (
                              <TouchableOpacity
                                style={{
                                  height: 30,
                                  width: 50,
                                  backgroundColor: colors.lightgray,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginLeft: 5,
                                  borderRadius: 3
                                }}
                                onPress={() => this.showConfirmationButtons()}
                              >
                                <Icon
                                  name="md-menu"
                                  size={30}
                                  style={{ color: colors.white }}
                                />
                              </TouchableOpacity>
                            )}
                          </View>
                          {/*  */}
                        </View>
                      </View>
                      {/*  */}
                    </View>
                  )}
                </View>
              </View>
              {/*  */}
            </View>
          </View>
        </ScrollView>
      </View>
      //</SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
  circleIcon: {
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 50,
    color: colors.blue,
    marginBottom: 10
  }
});

export { ActivityFeed };
