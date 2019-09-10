import React, { Component } from "react";
import {
  ActivityIndicator,
  Button,
  ImageBackground,
  Text,
  View
} from "react-native";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Actions } from "react-native-router-flux";

import { Input, constants, colors } from "../common";
import { SessionStore } from "../Stores";

const LOGIN = gql(`
  query employee($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      id,
      firstName,
      lastName,
      remainingCongeSolde
    }
  }
`);

class Login extends Component {
  state = {
    type: "Login",
    action: "Login",
    hasErrors: false,
    requesting: false,
    ...(constants.DEMO_MODE
      // ? { login: constants.USER.login, password: constants.USER.password }
      ? { login: constants.MANAGER.login, password: constants.MANAGER.password }
      : { login: "", password: "" }),
    loginError: "",
    isCheckedLogin: false,
    loggedIn: false
  };

  async componentDidMount() {
    try {
      SessionStore.isLoggedIn(async _loggedIn => {
        await this.setState({ isCheckedLogin: true });
        // if (_loggedIn) {
        //   setTimeout(async () => {
        //     await this.setState({ loggedIn: false });
        //     this.resetRoute("appDrawerNavigator");
        //   }, 500);
        //
        // }
      });
    } catch (e) {
      // error reading value
    }
  }

  render() {
    const {
      login,
      loggedIn,
      password,
      requesting,
      isCheckedLogin,
      loginError
    } = this.state;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {!isCheckedLogin && <Text>Loading...</Text>}
        {isCheckedLogin && loggedIn && <ActivityIndicator size="large" />}
        {isCheckedLogin && !loggedIn && (
          <ImageBackground
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
            source={require("../../assets/icons/img.png")}
          >
            <View>
              <Text style={{ color: colors.lightblue, fontWeight: "bold" }}>
                Welcome TELNETTeam
              </Text>
            </View>
            <Input
              placeholder="Entrer your username"
              placeholderTextColor={colors.lightyellow}
              type="textinput"
              value={login}
              autoCapitalize={"none"}
              keyboardType={"email-address"}
              onChangeText={value => this.setState({ login: value })}
            />
            <Input
              placeholder="Entrer your password"
              placeholderTextColor={colors.lightyellow}
              type="textinput"
              value={password}
              onChangeText={value => this.setState({ password: value })}
              secureTextEntry
            />

            <Text style={[styles.login.error, { marginTop: 20 }]}>
              {loginError}
            </Text>

            {requesting && (
              <Query query={LOGIN} variables={{ login, password }}>
                {({ loading, error, data }) => {
                  if (loading) {
                    return <Text style={styles.login.info}>Loading...</Text>;
                  }

                  if (error) {
                    return (
                      <Text style={styles.login.error}>An error occurred</Text>
                    );
                  }
                  if (data.login === null) {
                    setTimeout(() => {
                      this.setState({ requesting: false });
                    }, 2000);
                    return (
                      <Text style={styles.login.error}>
                        Invalid login or password
                      </Text>
                    );
                  } else {
                    setTimeout(async () => {
                      try {
                        SessionStore.login(data.login, async () => {
                          await this.setState({
                            requesting: false,
                            login: null,
                            password: null
                          });
                          Actions.reset("MainView");
                        });
                      } catch (e) {
                        // saving error
                      }
                    }, 1000);
                    return (
                      <Text style={styles.login.success}>
                        Welcome {data.login.firstName} {data.login.lastName}
                      </Text>
                    );
                  }
                }}
              </Query>
            )}

            <View style={{ marginTop: 20 }}>
              <View style={styles.button}>
                <Button
                  disabled={requesting}
                  title="Login"
                  color={colors.lightblue}
                  onPress={() => {
                    if (login && password) {
                      this.setState({ loginError: "" });
                      this.setState({ requesting: true });
                    } else {
                      this.setState({
                        loginError: "Please enter the valid login/password"
                      });
                    }
                  }}
                />

                {requesting && (
                  <ActivityIndicator style={{ marginTop: 15 }} size="small" />
                )}
              </View>
            </View>
          </ImageBackground>
        )}
      </View>
    );
  }
}

const styles = {
  errorContainer: {
    marginBottom: 10,
    marginTop: 30,
    padding: 10,
    backgroundColor: colors.white
  },
  errorLabel: {
    color: colors.white,
    textAlignVertical: "center",
    textAlign: "center"
  },
  button: {
    marginBottom: 0
  },
  login: {
    info: {
      color: colors.yellow
    },
    error: {
      color: colors.red
    },
    success: {
      color: colors.green
    }
  }
};

export { Login };
