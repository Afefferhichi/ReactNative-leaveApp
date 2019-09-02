import AsyncStorage from '@react-native-community/async-storage';

class SessionStore {
    constructor() {
        this.value = {};
    }

    async login(loginInformation, afterLoginCallback) {
        try {
            await AsyncStorage.setItem('@login', JSON.stringify(loginInformation));
            afterLoginCallback && afterLoginCallback();
        } catch (e) {
            // saving error
        }
    };



    async isLoggedIn(afterGettingCallback) {
        try {
            const loginInformation = await AsyncStorage.getItem('@login');
            afterGettingCallback && afterGettingCallback(loginInformation !== null);
        } catch (e) {
            // saving error
        }
    };


    async getLoginInformation(afterGettingCallback) {
        try {
            const loginInformation = await AsyncStorage.getItem('@login');
            afterGettingCallback && afterGettingCallback(JSON.parse(loginInformation));
        } catch (e) {
            // saving error
        }
    };

    
    async logout(afterLogoutCallback) {
        try {
            await AsyncStorage.removeItem('@login');
            afterLogoutCallback && afterLogoutCallback();
        } catch (e) {
            // saving error
        }
    };



};

export default new SessionStore();