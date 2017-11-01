import * as actions from "../../actions/MessageActions";
import * as types from "../../actions/types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from "nock";
import { WebSocket } from "mock-socket";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
  Settings: {
    host: "http://imuaythai.herokuapp.com/",
    ring: "A",
    contest: {
      id: "abc"
    }
  },
  Websocket: {
    socket: new WebSocket("test")
  }
};

describe("message actions", () => {
  it("should send message show premature end panels", () => {
    const store = mockStore(initialState);

    const expectedActions = [
      {
        type: types.WEBSOCKET_SEND_MESSAGE,
        payload: '{"type":8,"data":"null"}'
      }
    ];
    store.dispatch(actions.showPrematuredPanels());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
