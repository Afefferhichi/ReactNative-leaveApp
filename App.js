/***
 * Entry point of the whole project.
 * Detail:
 * We use 2 navigator createStackNavigator and createDrawerNavigator
 * Here is a main structure of this application.
 *
 * AppContainer (
 *  RootStack:createStackNavigator (
 *    Login:Component,
 *    appDrawerNavigator:createDrawerNavigator (
 *      AppStackNavigator:createStackNavigator (
 *        ActivityFeed  : Component,
 *        AbsenceHistory  : Component,
 *        AbsenceConfirmConge  : Component,
 *        ShowHistory : Component,
 *        ExitDetail  : Component,
 *        ExitRequest : Component,
 *        LeaveRequest  : Component,
 *      ),
 *      ShowHistory   : Component,
 *      AbsenceTeamList   : Component,
 *      ExitRequest   : Component,
 *      LeaveRequest    : Component,
 *      Setting   : Component
 *    )
 *  )
 *
 */

import React, { Component } from "react";
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator
} from "react-navigation";

import { AbsenceConfirmConge } from "./src/Screens/AbsenceConfirmConge";

import {
  AbsenceHistory,
  AbsenceTeamList,
  ActivityFeed,
  ExitDetail,
  ExitRequest,
  LeaveRequest,
  Login,
  Setting,
  ShowHistory
} from "./src/Screens";

import Icon from "react-native-vector-icons/Ionicons";
import { ApolloProvider } from "react-apollo";
import client from "./src/config/createApolloClient";
import { colors } from "./src/common";
console.disableYellowBox = true;

const AppStackNavigator = createStackNavigator(
  {
    ActivityFeed,
    AbsenceHistory,
    AbsenceConfirm: AbsenceConfirmConge,
    ShowHistory,
    ExitDetail,
    ExitRequest,
    LeaveRequest
  },
  {
    initialRouteName: "ActivityFeed"
  }
);

const appDrawerNavigator = createDrawerNavigator(
  {
    ActivityFeed: {
      screen: AppStackNavigator,
      navigationOptions: {
        drawerLabel: "ActivityFeed",
        drawerIcon: (
          <Icon name="md-home" size={28} style={{ color: colors.white }} />
        )
      }
    },
    LeaveRequest: {
      screen: LeaveRequest,
      navigationOptions: {
        drawerLabel: "LeaveRequest",
        drawerIcon: (
          <Icon name="md-list" size={28} style={{ color: colors.white }} />
        )
      }
    },
    ExitRequest: {
      screen: ExitRequest,
      navigationOptions: {
        drawerLabel: "ExitRequest",
        drawerIcon: (
          <Icon name="md-list" size={28} style={{ color: colors.white }} />
        )
      }
    },
    ShowHistory: {
      screen: ShowHistory,
      navigationOptions: {
        drawerLabel: "ShowHistory",
        drawerIcon: (
          <Icon
            name="md-speedometer"
            size={28}
            style={{ color: colors.white }}
          />
        )
      }
    },
    AbsenceTeamList: {
      screen: AbsenceTeamList,
      navigationOptions: {
        drawerLabel: "AbsenceTeamList",
        drawerIcon: (
          <Icon name="md-list" size={28} style={{ color: colors.white }} />
        )
      }
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        drawerLabel: "Setting",
        drawerIcon: (
          <Icon name="md-cog" size={28} style={{ color: colors.white }} />
        )
      }
    }
  },

  {
    initialRouteName: "ActivityFeed",
    // hideStatusBar: true,
    drawerBackgroundColor: "#5F8CA3",
    overlayColor: "#8CC6D7",
    contentOptions: {
      activeTintColor: "#fff",
      activeBackgroundColor: "#91BACF"
    }
  }
);

const RootStack = createStackNavigator(
  {
    Login,
    appDrawerNavigator
  },
  {
    headerMode: "none"
  }
);
const AppContainer = createAppContainer(RootStack);

class LeaveApp extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer />
      </ApolloProvider>
    );
  }
}

export default LeaveApp;
