import React from "react";
import { Font, AppLoading, Asset } from "expo";
import { Provider } from "react-redux";
import store from "./store/store";
import MainContainer from "./containers/Main/MainContainer";
import { AppState } from "react-native";
import { unsubscribe, subscribe } from "./actions/WebsocketActions";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      appState: AppState.currentState
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });

    await Asset.fromModule(
      require("./assets/images/mainLogo.png")
    ).downloadAsync();
    await Asset.fromModule(
      require("./assets/sounds/boxing_bell.mp3")
    ).downloadAsync(require("./assets/images/mainLogo.png"));
    await Asset.fromModule(
      require("./assets/sounds/small_bell.mp3")
    ).downloadAsync(require("./assets/images/mainLogo.png"));
    AppState.addEventListener("change", this.handleAppStateChange);

    this.setState({
      ready: true
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    const { fight } = store.getState().Fight;
    if (nextAppState === "inactive") store.dispatch(unsubscribe());
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active" &&
      fight
    ) {
      store.dispatch(subscribe());
    }
    this.setState({ appState: nextAppState });
  };

  render() {
    if (!this.state.ready) return <AppLoading />;

    return (
      <Provider store={store}>
        <MainContainer />
      </Provider>
    );
  }
}
