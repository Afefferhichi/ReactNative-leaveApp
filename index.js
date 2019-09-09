/**
 * @format
 */

import { AppRegistry } from "react-native";
import App2 from "./App2";
// import {ActivityFeed as App2} from "./src/Screens/ActivityFeed";
import "./src/common/CommonHelpers";
import { name as appName } from "./app.json";
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App2);
