import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createStore } from "redux";
import { Provider } from "react-redux";
import FightPointsContainer from "../../containers/Fight/FightPointsContainer";
import configureStore from "redux-mock-store";
Enzyme.configure({ adapter: new Adapter() });

const initialState = {
  Fight: {},
  Ui: {}
};
const mockStore = configureStore();

const store = mockStore(initialState);
const wrapper = shallow(<FightPointsContainer store={store} />);

describe("<FightPointsContainer />", () => {
  it("should render", () => {
    expect(wrapper).toBeTruthy();
  });
});
