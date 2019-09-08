/**
 * Leave App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from "react";
import Routes from "./src/config/routes";
import { TopView } from "teaset";
import { ApolloProvider } from "react-apollo";
import client from "./src/config/createApolloClient";
console.disableYellowBox = true;

export default class App2 extends Component {
  render() {
    return (
      <TopView>
        <ApolloProvider client={client}>
          <Routes />
        </ApolloProvider>
      </TopView>
    );
  }
}
