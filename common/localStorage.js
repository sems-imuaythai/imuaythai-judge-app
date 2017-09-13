import { AsyncStorage } from "react-native";

export const saveState = state => {
  let parsedState = JSON.stringify(state);
  try {
    AsyncStorage.setItem("Account", parsedState);
  } catch (error) {}
};

export const loadState = async () => {
  try {
    let parsedState = null;
    await AsyncStorage.getAllKeys().then(response => {
      parsedState = response.data;
    });
    /**
     *  AsyncStorage.getItem("Account")
      .then(response => {
        parsedState = response;
      })
      .done();
     */

    return parsedState;
  } catch (error) {
    return "Error occured";
  }
};
