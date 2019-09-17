import React, { Component } from "react";
import { Card, CardItem, Text, View } from "native-base";
import { colors, constants } from "./";
import Icon from "react-native-vector-icons/Ionicons";
import { ActionSheet } from "teaset";
import { Actions } from "react-native-router-flux";
import {
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager
} from "react-native";
import { SessionStore } from "../Stores";
import moment from "moment";

class ExitRequestCard extends Component {
  constructor() {
    super();

    this.state = {
      expanded: false
    };

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  setAnimation = () =>
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  // ============== Confirmation ===============
  showConfirmationButtons = sortie => {
    ActionSheet.hide();
    let items = [
      {
        title: "Approve",
        onPress: () => {
          const approveData = { sortie, mode: constants.SortieState.APPROVED };
          setTimeout(() => {
            Actions.AbsenceConfirmSortie(approveData);
          }, 100);
        }
      },
      {
        title: "Reject",
        onPress: () => {
          const rejectData = { sortie, mode: constants.SortieState.REFUSED };
          setTimeout(() => {
            Actions.AbsenceConfirmSortie(rejectData);
          }, 100);
        }
      }
    ];
    let cancelItem = { title: "Cancel" };
    ActionSheet.show(items, cancelItem);
  };

  // ============== Confirmation:End ===============

  render() {
    const { expanded } = this.state;
    const { sortie } = this.props;
    return (
      <Card>
        <CardItem
          header
          style={{
            height: 40,
            borderRadius: 2,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: colors.waterblue
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: 18,
              fontWeight: "400"
            }}
          >
            Exit Request
          </Text>
        </CardItem>
        <CardItem
          style={{
            borderRadius: 2,
            flexDirection: "column"
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                width: "20%",
                borderRightWidth: 1,
                borderRightColor: colors.lightgray
              }}
            >
              <Icon name="md-exit" size={29} style={{ marginLeft: 10 }} />
            </View>

            {
              <View
                style={{
                  borderWidth: 0,
                  width: "80%",
                  borderColor: colors.whitegray,
                  borderLeftColor: colors.blue,
                  borderLeftWidth: 0,
                  marginLeft: 5,
                  marginTop: 5
                }}
              >
                <View style={{ top: -5 }}>
                  {/*<View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <Text style={[styles.common, { fontWeight: "bold" }]}>
                      Duration:{" "}
                    </Text>
                    <Text style={[styles.common, { color: colors.blue }]}>
                      {moment
                        .duration(
                          new Date(sortie.sortie_Date) -
                            new Date(sortie.recovery_Date)
                        )
                        .humanize()}
                        </Text>
                        </View>*/}
                  <View style={[styles.common, { flexDirection: "row" }]}>
                    <Text style={[styles.common, { fontWeight: "bold" }]}>
                      Employee:{" "}
                    </Text>
                    <Text style={styles.common}>
                      {sortie.employee.firstName}, {sortie.employee.lastName}
                    </Text>
                  </View>
                  <View style={[styles.common, { flexDirection: "row" }]}>
                    <Text style={[styles.common, { fontWeight: "bold" }]}>
                      Status:{" "}
                    </Text>
                    <Text style={styles.common}>{sortie.sortieState.humanize()}</Text>
                  </View>
                </View>
                <View
                  style={{
                    position: "absolute",
                    zIndex: 2,
                    top: 28,
                    right: 0
                  }}
                >
                  <View style={styles.circleIcon}>
                    <Icon
                      activeOpacity={0.8}
                      onPress={() => {
                        this.setAnimation();
                        this.setState({ expanded: !expanded });
                      }}
                      style={styles.Btn}
                      name={expanded ? "md-arrow-up" : "md-arrow-down"}
                      size={22}
                    />
                  </View>
                </View>

                {/* /// */}

                <View style={styles.btnTextHolder}>
                  <View
                    style={{
                      height: expanded ? null : 0,
                      overflow: "hidden",
                      marginTop: 10,
                      left: -5
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
                      <Text>
                        {moment(sortie.sortie_Date).format(
                          constants.DATE_FORMAT
                        )}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: 5,
                        marginBottom: 5
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>Time: </Text>
                      <Text>{sortie.sortieTime.humanize()}</Text>
                    </View>
              
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: 5,
                        marginBottom: 5
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>Reason: </Text>
                      <Text>{sortie.motif}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: 5,
                        marginBottom: 5
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>
                        Date of recovery:{" "}
                      </Text>
                      <Text>
                        {moment(sortie.recovery_Date).format(
                          constants.DATE_FORMAT
                        )}
                      </Text>
                    </View>

                    {/*  */}
                  </View>
                </View>
                {/*  */}
              </View>
            }
          </View>
        </CardItem>
        <CardItem
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-end",
            height: expanded ? null : 0,
            overflow: "hidden",
            backgroundColor: colors.lighergray
          }}
          footer
          bordered
          cardBody
        >
          <View
            style={{
              height: 50,
              flexDirection: "row",
              alignItems: "center",
              marginRight: 15
            }}
          >
            <TouchableOpacity
              style={{
                height: 30,
                width: 90,
                backgroundColor: colors.waterblue,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 3,
                marginRight: 10
              }}
              onPress={() => {}}
            >
              <Text style={{ color: colors.white }}>Open</Text>
            </TouchableOpacity>
            {SessionStore.isAdmin() && (
              <TouchableOpacity
                style={{
                  height: 30,
                  width: 50,
                  backgroundColor: colors.waterblue,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 5,
                  borderRadius: 3
                }}
                onPress={() => this.showConfirmationButtons(sortie)}
              >
                <Icon
                  name="md-menu"
                  size={30}
                  style={{ color: colors.white }}
                />
              </TouchableOpacity>
            )}
          </View>
        </CardItem>
      </Card>
    );
  }
}

const styles = {
  circleIcon: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    color: colors.blue
  },
  common: {
    lineHeight: 25
  }
};

export { ExitRequestCard };
