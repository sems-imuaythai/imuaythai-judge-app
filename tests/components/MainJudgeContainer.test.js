import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createStore } from "redux";
import { Provider } from "react-redux";
import FightMainJudgeView from "../../components/Fight/FightMainJudgeView";
import MainJudgeContainer from "../../containers/Fight/MainJudgeContainer";
import configureStore from "redux-mock-store";
Enzyme.configure({ adapter: new Adapter() });

const initialState = {
  Fight: {
    fight: {}
  },
  Account: {
    user: {}
  },
  Websocket: {
    juryConnected: false
  },
  Ui: {
    disabled: false,
    showPrematureEndPanels: false
  }
};
const mockStore = configureStore();

const store = mockStore(initialState);
const wrapper = shallow(<MainJudgeContainer store={store} />);

describe("<MainJudgeContainer/>", () => {
  it("should render", () => {
    expect(wrapper).toBeTruthy();
  });
});
