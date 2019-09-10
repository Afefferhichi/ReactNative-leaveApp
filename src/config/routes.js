/**
 * Router Configuration file
 * Using react-native-router-flux
 *

 */
import React, { Component } from "react";
import { Icon } from "native-base";
import {
  Actions,
  Drawer,
  Router,
  Scene,
  Stack
} from "react-native-router-flux";
import {
  AbsenceConfirm,
  AbsenceTeamList,
  ActivityFeed,
  ExitDetail,
  ExitRequest,
  LandingPage,
  LeaveRequest,
  Login,
  Setting,
  ShowHistory,
  Welcome
} from "../../src/Screens";

import { SideBar } from "../../src/common";

import { SessionStore } from "../../src/Stores";
import { colors } from "../common";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: null,
      userData: null
    };
  }

  componentDidMount(): void {
    SessionStore.isLoggedIn(loggedIn => {
      loggedIn && Actions.MainView();
    });
  }

  render() {
    return (
      <Router>
        <Stack key="root" cardStyle={{backgroundColor: 'white'}}>
          <Scene
            key="LandingPage"
            component={LandingPage}
            hideNavBar={true}
            type="reset"
          />
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
            initial={this.state && this.state.isLoggedIn === true}
            contentComponent={SideBar}
            drawerIcon={
              <Icon style={{ color: colors.waterblue }} name="menu" />
            }
            hideNavBar
            style={{ left: 0 }}
            drawerPosition="Left"
            type="reset"
          >
            <Router hideNavBar>
              <Stack key="drawerRoot">
                <Scene key="Welcome" component={Welcome} />
                <Scene
                  key="ActivityFeed"
                  title="Activity Feed"
                  component={ActivityFeed}
                />
                <Scene
                  key="AbsenceConfirm"
                  title="Activity Feed"
                  component={AbsenceConfirm}
                />
                <Scene
                  key="ExitRequest"
                  title="Exit Request"
                  component={ExitRequest}
                />
                <Scene
                  key="LeaveRequest"
                  title="Leave Request"
                  component={LeaveRequest}
                />
                <Scene
                  key="ShowHistory"
                  title="Show History"
                  component={ShowHistory}
                />
                <Scene
                  key="AbsenceTeamList"
                  title="Absence Team List"
                  component={AbsenceTeamList}
                />
                <Scene key="Setting" title="Setting" component={Setting} />
                <Scene key="LandingPage" hideNavbar component={LandingPage} />
                <Scene key="AbsenceConfirm" component={AbsenceConfirm} />
                <Scene key="ExitDetail" component={ExitDetail} />
              </Stack>
            </Router>
          </Drawer>
        </Stack>
      </Router>
    );
  }
}

export default Routes;
