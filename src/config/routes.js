/**
 * Router Configuration file
 * Using react-native-router-flux
 *

 */
import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Drawer, Router, Scene, Stack } from "react-native-router-flux";
import {
  LandingPage,
  AbsenceTeamList,
  ActivityFeed,
  ExitRequest,
  LeaveRequest,
  Login,
  Setting,
  ShowHistory,
  Welcome
} from "../../src/Screens";

import { SideBar } from "../../src/common";

import { SessionStore } from "../../src/Stores";

class Routes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: undefined,
      userData: null
    };
  }

  componentDidMount(): void {
    SessionStore.isLoggedIn().then(async loggedIn => {
      await this.setState({ isLoggedIn: loggedIn });
    });
  }

  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="LandingPage"
                 component={LandingPage}
                 hideNavBar={true} type='reset'/>
          <Scene
            key="Login"
            initial={this.state && this.state.isLoggedIn === false}
            hideNavBar={true}
            type="reset"
            component={Login}
            title="Leave App Login"
          />
          <Drawer
            key="MainView"
            type="reset"
            initial={this.state && this.state.isLoggedIn === true}
            contentComponent={SideBar}
            drawerIcon={<Icon style={{ color: "white" }} name="md-menu" />}
            hideNavBar
            drawerPosition="Left"
          >
            <Router hideNavBar>
              <Stack key="drawerRoot">
                <Scene key="Welcome" component={Welcome} />
                <Scene key="ActivityFeed" component={ActivityFeed} />
                <Scene key="ExitRequest" component={ExitRequest} />
                <Scene key="LeaveRequest" component={LeaveRequest} />
                <Scene key="ShowHistory" component={ShowHistory} />
                <Scene key="AbsenceTeamList" component={AbsenceTeamList} />
                <Scene key="Setting" component={Setting} />
              </Stack>
            </Router>
          </Drawer>
        </Stack>
      </Router>
    );
  }
}

export default Routes;
