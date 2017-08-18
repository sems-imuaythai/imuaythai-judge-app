import { AsyncStorage } from 'react-native';

export const saveState = async (state) => {
  let parsedState = JSON.stringify(state);
  try {
    await AsyncStorage.setItem("Account", parsedState);
  } catch (error) {}
}

export const loadState = async () => {
  try {
    const parsedState = await AsyncStorage.getItem("Account");
    if (parsedState !== null) {
      let state = JSON.parse(parsedState);
      return state;
    }
  } catch (error) {
    return undefined;
  }

  return undefined;
}