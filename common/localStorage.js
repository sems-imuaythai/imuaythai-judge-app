import { AsyncStorage } from "react-native";

export const saveState = state => {
  let stateToSave = {
    host: state.host,
    websocket: state.websocket
  };
  let parsedState = JSON.stringify(state);
  try {
    AsyncStorage.setItem("Settings", parsedState);
  } catch (error) {}
};

export const loadState = async () => {
  try {
    AsyncStorage.getItem("Settings").then(settingsStr => {
      const parsedState = JSON.parse(settingsStr);
      console.log("====================================");
      console.log(parsedState);
      console.log("====================================");
      return parsedState;
    });
  } catch (error) {
    return "Error occured";
  }
};
