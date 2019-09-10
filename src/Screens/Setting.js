import React, { Component } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Container, Content, Card, CardItem } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { Actions } from "react-native-router-flux";

import { SessionStore } from "../Stores";
import {colors, MyInfoCard} from '../common';

const woman_image_url =
  "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
class Setting extends Component {
  state = {
    loading: false
  };

  logout = async () => {
    SessionStore.logout(() => {
      this.setState({ loading: true });
      setTimeout(() => {
        Actions.reset("LandingPage");
      }, 1000);
    });
  };

  render() {
    const { loading } = this.state;
    return (
      <Container>

        <Content padder>
          <Card noShadow>
            <CardItem>
              <MyInfoCard />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 15,
                  bottom: 10
                }}
                onPress={() => this.logout()}
              >
                {loading && <ActivityIndicator size="small" />}
                {!loading && (
                  <Icon
                    name="md-log-out"
                    size={25}
                    style={{ alignSelf: "flex-end" }}
                  />
                )}
              </TouchableOpacity>
            </CardItem>
          </Card>
        </Content>

      </Container>
    );
  }
}

export { Setting };
