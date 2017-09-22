import * as actions from "../../actions/FightActions";
import * as types from "../../actions/types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from "nock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fightResponse = [
  {
    id: 1,
    redAthlete: {
      id: 1,
      firstName: "test1",
      surname: "test2"
    },
    blueAthlete: {
      id: 2,
      firstName: "test3",
      surname: "test3"
    }
  }
];

describe("fight actions", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it("should get fights", () => {
    nock("http://imuaythai.herokuapp.com/")
      .get("/api/fight/get/abc/A")
      .reply(200, fightResponse);
    const initialState = {};

    const store = mockStore(initialState);
    const expectedActions = [
      {
        type: types.GET_FIGHTS_REQUEST
      },
      { type: types.GET_FIGHTS_SUCCESS, payload: fightResponse }
    ];

    return store.dispatch(actions.getFights("A")).then(() => {
      expect(store.getActions()).toEqual();
    });
  });
});
