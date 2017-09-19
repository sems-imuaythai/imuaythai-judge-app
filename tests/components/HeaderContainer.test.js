import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createStore } from "redux";
import { Provider } from "react-redux";
import FightHeaderView from "../../components/Fight/FightHeader";
import FightHeader from "../../containers/Fight/FightHeaderContainer";
Enzyme.configure({ adapter: new Adapter() });

const reducer = state => state;
const dispatch = jest.fn();
const callback = () => {};
const initialState = {
  user: {
    firstName: "test",
    surname: "test"
  },
  timer: {
    active: false,
    fightTimerStart: false,
    pauseTimerStart: false,
    fightTimerReset: false,
    pauseTimerReset: false,
    fightTimerCallback: callback,
    pauseTimerCallback: callback
  },
  fight: {
    structure: {
      weightAgeCategory: {
        name: "test"
      },
      round: {
        roundsCount: 3,
        duration: 300,
        breakDuration: 100
      }
    },
    referee: {
      fistName: "test",
      surname: "test"
    }
  },
  fightStarted: false,
  fighPaused: false,
  showTimer: false
};

const store = { ...createStore(reducer, initialState), dispatch };
const wrapper = shallow(
  <Provider store={store}>
    <FightHeader />
  </Provider>
);
const component = wrapper.find(FightHeaderView);

describe("<FightHeader/>", () => {
  it("should render", () => {
    expect(wrapper).toBeTruthy();
  });
});
