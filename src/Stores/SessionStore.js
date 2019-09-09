import AsyncStorage from "@react-native-community/async-storage";

class SessionStoreClass {
  constructor() {
    this.value = {};
  }

  preCheck = value => {
    const ret = value;
    if (ret) {
      ret.isAdmin = ret.id == 1 || ret.id == 2;
    }
    return ret;
  };
  async login(loginInformation, afterLoginCallback) {
    try {
      const _loginInformation = this.preCheck(loginInformation);
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
      loginInformation = this.preCheck(JSON.parse(loginInformation));
      this.value = loginInformation;
      afterGettingCallback &&
        afterGettingCallback(loginInformation !== null, loginInformation);
    } catch (e) {
      // saving error
    }
  }

  getRemainingCongeSolde() {
    return this.value ? this.value.remainingCongeSolde : 0;
  }

  isAdmin() {
    return this.value.isAdmin;
  }

  userName() {
    if (!this.value || !this.value.firstName) return "";
    return `${this.value.firstName} ${this.value.lastName}`;
  }
  userId() {
    return this.value ? this.value.id : "";
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
