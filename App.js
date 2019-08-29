import React, { Component } from "react";
import { View, Text } from "react-native";
import ActivityFeed from "./src/Screens/ActivityFeed";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";
import Profile from "./src/Screens/Profile";
import AbsenceDetail from "./src/Screens/AbsenceDetail";
import AbsenceConfirm from "./src/Screens/AbsenceConfirm";
import ShowHistory from "./src/Screens/ShowHistory";
import Setting from "./src/Screens/Setting";
import AbsenceTeamList from "./src/Screens/AbsenceTeamList";
import Login from './src/Screens/Login';
import ExitDetail from "./src/Screens/ExitDetail";
import Icon from "react-native-vector-icons/Ionicons";
import { ApolloProvider } from '@apollo/react-hooks';
import client from './src/config/createApolloClient';
// import CustomDatePickerAndroid from './src/Screens/CustomDatePickerAndroid'
import TimePicker from './src/Screens/TimePicker'
import AbsenceHistory from '././src/Screens/AbsenceHistory'




console.disableYellowBox = true;


const AppStackNavigator = createStackNavigator({

  ActivityFeed: {
    screen: ActivityFeed
  },
  AbsenceHistory: {
    screen: AbsenceHistory
  },
  AbsenceDetail: {
    screen: AbsenceDetail
  },
  AbsenceConfirm: {
    screen: AbsenceConfirm
  },
  ShowHistory: {
    screen: ShowHistory
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
    
    ActivityFeed: {
      
      screen: ActivityFeed,
      navigationOptions: {
        darwerLable: "Telnet",
        drawerIcon: <Icon name="md-home" size={28} style={{ color: "white" }} />
      }
          },
    ShowHistory: {
      
      screen:  ShowHistory,
      navigationOptions: {
      darwerLable: "Telnet",
      drawerIcon: <Icon name="md-speedometer" size={28} style={{ color: "white" }} />
      }
          },
    AbsenceTeamList: {
      screen: AbsenceTeamList,
      navigationOptions: {
        darwerLable: "Telnet",
        drawerIcon: <Icon name="md-list" size={28} style={{ color: "white" }} />
      }
    },
    
    Setting: {
      screen: Setting,
      navigationOptions: {
        darwerLable: "Telnet",
        drawerIcon: <Icon name="md-cog" size={28} style={{ color: "white" }} />
      }
    }
  },

  {
    initialRouteName: 'ActivityFeed',
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

