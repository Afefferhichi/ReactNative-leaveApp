import React from "react";
import { Image, View } from "react-native";

import Landingimage from "../../assets/icons/logo";

const LogoComponent = () => (
  <View>
    <Image
      source={Landingimage}
      resizeMode={"center"}
      style={{
        width: 200,
        height: 90
      }}
    />
  </View>
);

export default LogoComponent;
