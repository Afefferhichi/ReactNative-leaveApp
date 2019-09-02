import React, { Component } from 'react';
import { ActivityIndicator, Button, ImageBackground, Text, View } from 'react-native';
import Input from '../common/Input';
import validationRules from '../common/validationRules';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import SessionStore from '../common/SessionStore';


const LOGIN = gql(`
  query employee($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      id,
      firstName,
      lastName
    }
  }
`);

//import console = require('console');

class Login extends Component {
  state = {
    type: 'Login',
    action: 'Login',
    hasErrors: false,
    requesting: false,
    // Manager
    // login: 'Sameh.Ouederni',
    // password: '123aze',

    // Normal User
    login: 'Mahdi.Turki',
    password: '123',
    loginError: '',
    isCheckedLogin: false,
    loggedIn: false
  };

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('@login')
      await this.setState({ isCheckedLogin: true });
      if (value !== null) {
        await this.setState({ loggedIn: true });
        setTimeout(async () => {
          await this.setState({
            loggedIn: false
          });
          this.props.navigation.navigate('ActivityFeed');
        }, 500);
      }
    } catch (e) {
      // error reading value
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { login, password } = this.state;
    return (
      <View style={{
        flex: 1, justifyContent: 'center', alignItems: 'center'
      }}>
        {!this.state.isCheckedLogin &&
          <Text>Loading...</Text>
        }
        {this.state.isCheckedLogin && this.state.loggedIn &&
          <ActivityIndicator size="large" />
          //<Text>You are already loggedin in. Moving to Activity Feed...</Text>
        }
        {this.state.isCheckedLogin && !this.state.loggedIn &&
          <ImageBackground style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}
            source={require('../../assets/icons/img.png')}>
            <View>
              <Text style={{ color: '#183152', fontWeight: 'bold', }}>Welcome TELNETTeam</Text>
            </View>
            <Input
              placeholder='Entrer your username'
              placeholderTextColor='#F6E8B1'
              type='textinput'
              value={this.state.login}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
              onChangeText={value => this.setState({ 'login': value })}
            />
            <Input
              placeholder='Entrer your password'
              placeholderTextColor='#F6E8B1'
              type='textinput'
              value={this.state.password}
              onChangeText={value => this.setState({ 'password': value })}
              secureTextEntry
            />

            <Text
              style={[styles.login.error, { marginTop: 20 }]}
            >{this.state.loginError}</Text>

            {this.state.requesting &&
              <Query query={LOGIN} variables={{ login, password }}>
                {({ loading, error, data }) => {

                  if (loading) return <Text style={styles.login.info}>Loading...</Text>


                  if (error) {
                    return <Text style={styles.login.error}>An error occurred</Text>
                  }
                  if (data.login === null) {
                    setTimeout(() => {
                      this.setState({ requesting: false })
                    }, 2000);
                    return (
                      <Text style={styles.login.error}>Invalid login or password</Text>
                    );
                  } else {
                    setTimeout(async () => {

                      try {
                        SessionStore.login(data.login, async () => {
                          await this.setState({
                            requesting: false,
                            login: null,
                            password: null
                          })
                          this.props.navigation.navigate('ActivityFeed');
                        })
                      } catch (e) {
                        // saving error
                      }
                    }, 1000);
                    return (
                      <Text style={styles.login.success}>Welcome {data.login.firstName} {data.login.lastName}</Text>
                    );
                  }
                }}
              </Query>
            }

            <View style={{ marginTop: 20 }}>

              <View style={styles.button}>

                <Button
                  disabled={this.state.requesting}
                  title='Login'
                  color='#183152'
                  onPress={() => {
                    if (this.state.login && this.state.password) {
                      this.setState({ loginError: '' });
                      this.setState({ requesting: true })
                    } else {
                      this.setState({ loginError: 'Please enter the valid login/password' });
                    }
                  }}
                />

                {this.state.requesting &&
                  <ActivityIndicator style={{ marginTop: 15 }} size="small" />
                }

              </View>
            </View>

          </ImageBackground>
        }
      </View>
    );
  }
}


const styles = ({
  errorContainer: {
    marginBottom: 10,
    marginTop: 30,
    padding: 10,
    backgroundColor: 'white'
  },
  errorLabel: {
    color: '#fff',
    textAlignVertical: 'center',
    textAlign: 'center'

  },
  button: {
    marginBottom: 0
  },
  login: {
    info: {
      color: '#ff0'
    },
    error: {
      color: '#f00'
    },
    success: {
      color: '#0f0'
    }
  }


});



export default Login;




