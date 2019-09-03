import AsyncStorage from '@react-native-community/async-storage';

class ExitRequestStore {
    constructor() {
        this.value = {};
    }

    async set(data, afterSetCallback) {
        try {
            await AsyncStorage.setItem('@exit_request', JSON.stringify(data));
            this.value = data;
            afterSetCallback && afterSetCallback();
        } catch (e) {
            // saving error
        }
    };

    async get(afterGotCallback) {
        try {
            let data = await AsyncStorage.getItem('@exit_request');
            data = JSON.parse(data);
            this.value = data;
            afterGotCallback && afterGotCallback(data);
        } catch (e) {
            // saving error
        }
    };



};

export default new ExitRequestStore();