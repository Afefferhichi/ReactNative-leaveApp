import AsyncStorage from "@react-native-community/async-storage";

class SessionStoreClass {
  constructor() {
    this.value = {};
  }

  precheck = value => {
    const ret = value;
    ret.isAdmin = ret.id === 1 || ret.id === 2;
    return ret;
  };
  async login(loginInformation, afterLoginCallback) {
    try {
      const _loginInformation = this.precheck(loginInformation);
      await AsyncStorage.setItem("@login", JSON.stringify(_loginInformation));
      this.value = _loginInformation;
      afterLoginCallback && afterLoginCallback();
    } catch (e) {
      // saving error
    }
  }

  async isLoggedIn(afterGettingCallback) {
    try {
      let loginInformation = await AsyncStorage.getItem("@login");
      loginInformation = this.precheck(JSON.parse(loginInformation));
      this.value = loginInformation;
      afterGettingCallback &&
        afterGettingCallback(loginInformation !== null, loginInformation);
    } catch (e) {
      // saving error
    }
  }

  getLoginInformation() {
    return this.value;
  }

  isAdmin() {
    return this.value.isAdmin;
  }

  userName() {
    return `${this.value.firstName} ${this.value.lastName}`;
  }

  async logout(afterLogoutCallback) {
    try {
      await AsyncStorage.removeItem("@login");
      this.value = {};
      afterLogoutCallback && afterLogoutCallback();
    } catch (e) {
      // saving error
    }
  }
}
const SessionStore = new SessionStoreClass();
export { SessionStore };
