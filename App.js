import React from "react";
import { Font, AppLoading, Asset } from "expo";
import { Provider } from "react-redux";
import store from "./store/store";
import MainContainer from "./containers/Main/MainContainer";
import { AppState } from "react-native";
import { unsubscribe, subscribe } from "./actions/WebsocketActions";

function cacheAsstes(assets) {
  return assets.map(asset => Asset.fromModule(asset).downloadAsync());
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      appState: AppState.currentState
    };
  }

  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);

    this.setState({
      ready: true
    });
  }

  async loadAssetsAsync() {
    const imageAssets = cacheAsstes([require("./assets/images/mainLogo.png")]);
    const fontAssets = cacheImages([
      require("native-base/Fonts/Roboto.ttf"),
      require("native-base/Fonts/Roboto_medium.ttf"),
      require("native-base/Fonts/Ionicons.ttf")
    ]);
    const soundAssets = cacheAsstes([
      require("./assets/sounds/boxing_bell.mp3"),
      require("./assets/sounds/small_bell.mp3")
    ]);

    Promise.all([...imageAssets, ...fontAssets, ...soundAssets]);
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
    if (!this.state.ready)
      return (
        <AppLoading
          startAsync={this.loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );

    return (
      <Provider store={store}>
        <MainContainer />
      </Provider>
    );
  }
}
