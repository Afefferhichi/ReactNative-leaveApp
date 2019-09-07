import AsyncStorage from "@react-native-community/async-storage";

class ExitRequestStoreClass {
  constructor() {}

  async set(data, afterSetCallback) {
    try {
      await AsyncStorage.setItem("@exit_request", JSON.stringify(data));
      afterSetCallback && afterSetCallback();
    } catch (e) {
      // saving error
    }
  }

  async get(afterGotCallback) {
    try {
      let data = await AsyncStorage.getItem("@exit_request");
      data = JSON.parse(data);
      afterGotCallback && afterGotCallback(data);
    } catch (e) {
      // saving error
    }
  }
}

const ExitRequestStore = new ExitRequestStoreClass();
export { ExitRequestStore };
