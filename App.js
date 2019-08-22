import React, { Component } from "react";
import { View, Text } from "react-native";
import Absence from "./src/Screens/Absence";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";
import Profile from "./src/Screens/Profile";
import AbsenceDetail from "./src/Screens/AbsenceDetail";
import AbsenceConfirm from "./src/Screens/AbsenceConfirm";
import Holiday from "./src/Screens/Holiday";
import Setting from "./src/Screens/Setting";
import AbsenceTeamList from "./src/Screens/AbsenceTeamList";
import Login from './src/Screens/Login';
import ExitDetail from "./src/Screens/ExitDetail";
import Icon from "react-native-vector-icons/Ionicons";
import { ApolloProvider } from '@apollo/react-hooks';
import client from './src/config/createApolloClient'




console.disableYellowBox = true;

const AppStackNavigator = createStackNavigator({
  Login: {
    screen: Login
  },

  Absence: {
    screen: Absence
  },
  AbsenceDetail: {
    screen: AbsenceDetail
  },
  AbsenceConfirm: {
    screen: AbsenceConfirm
  },
  Holiday: {
    screen: Holiday
  },
  ExitDetail: {
    screen: ExitDetail
  }
}, {
    initialRouteName: 'Login'
  });
const appDrawerNavigator = createDrawerNavigator(
  {
    Absence: {
      screen: AppStackNavigator,
      navigationOptions: {
        darwerLable: "Telnet",
        drawerIcon: <Icon name="md-home" size={30} style={{ color: "black" }} />
      }
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        darwerLable: "Telnet",
        drawerIcon: <Icon name="md-cog" size={30} style={{ color: "black" }} />
      }
    },
    AbsenceTeamList: {
      screen: AbsenceTeamList,
      navigationOptions: {
        darwerLable: "Telnet",
        drawerIcon: <Icon name="md-list" size={30} style={{ color: "black" }} />
      }
    }
  },

  {
    initialRouteName: 'Absence',
    // hideStatusBar: true,
    drawerBackgroundColor: "#ddd",
    overlayColor: "#6b52ae",
    contentOptions: {
      activeTintColor: "#fff",
      activeBackgroundColor: "blue"
    }
  }
);

const AppContainer = createAppContainer(appDrawerNavigator);


class App extends Component {

  render() {
    return (
      <ApolloProvider client={client} >
        <AppContainer />
      </ApolloProvider>
    )
  }
}
export default App;
