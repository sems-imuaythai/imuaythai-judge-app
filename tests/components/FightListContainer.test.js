import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createStore } from "redux";
import { Provider } from "react-redux";
import FightListView from "../../components/Fight/FightListView";
import FightListContainer from "../../containers/Fight/FightListContainer";
import configureStore from "redux-mock-store";
Enzyme.configure({ adapter: new Adapter() });

const initialState = {
  Fight: {
    fightList: [],
    fetching: false
  }
};
const mockStore = configureStore();

const store = mockStore(initialState);
const wrapper = shallow(<FightListContainer store={store} isSidebar={true} />);
const component = wrapper.find(FightListView);

describe("<FightListContainer/>", () => {
  it("should render", () => {
    expect(wrapper).toBeTruthy();
  });

  it("should pass fight list", () => {
    expect(wrapper.props().fights).toEqual([]);
  });

  it("should pass fetching", () => {
    expect(wrapper.props().fetching).toBeFalsy();
  });

  it("should be sidebar", () => {
    expect(wrapper.props().isSidebar).toBeTruthy();
  });
});
