
    
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
import client from './src/config/createApolloClient';
// import CustomDatePickerAndroid from './src/Screens/CustomDatePickerAndroid'
import TimePicker from './src/Screens/TimePicker'




console.disableYellowBox = true;


const AppStackNavigator = createStackNavigator({

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
  },
  TimePicker:{
    screen:TimePicker
  }
},{
  headerMode:'none'
});
const appDrawerNavigator = createDrawerNavigator(
  
  {
    
    Absence: {
      
      screen: AppStackNavigator,
      navigationOptions: {
        darwerLable: "Telnet",
        drawerIcon: <Icon name="md-home" size={30} style={{ color: "white" }} />
      }
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        darwerLable: "Telnet",
        drawerIcon: <Icon name="md-cog" size={30} style={{ color: "white" }} />
      }
    },
    AbsenceTeamList: {
      screen: AbsenceTeamList,
      navigationOptions: {
        darwerLable: "Telnet",
        drawerIcon: <Icon name="md-list" size={30} style={{ color: "white" }} />
      }
    }
  },

  {
    initialRouteName: 'Absence',
    // hideStatusBar: true,
    drawerBackgroundColor: "#5F8CA3",
    overlayColor: "#8CC6D7",
    contentOptions: {
      activeTintColor: "#fff",
      activeBackgroundColor: "#91BACF"
    }
  }
);

const RootStack =createStackNavigator({
  Login: {
    screen: Login
  },
  appDrawerNavigator:{
    screen: appDrawerNavigator
  }
},{
  headerMode:'none'
})
const AppContainer = createAppContainer(RootStack);



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

