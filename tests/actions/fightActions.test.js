import * as actions from "../../actions/FightActions";
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
  Account: {
    user: {
      id: 5,
      firstName: "test",
      surname: "test"
    }
  },
  Websocket: {
    socket: new WebSocket("test")
  },
  Fight: {
    fightId: 2,
    fight: {
      id: 1,
      redAtheleteId: 1,
      blueAtheleteId: 2,
      timeKeeperId: 3,
      redAthlete: {
        id: 1,
        firtName: "test",
        surname: "test2"
      },
      blueAthlete: {
        id: 2,
        firtName: "test2",
        surname: "test3"
      },
      ring: "A",
      fightStructure: {
        id: 1,
        weightAgeCategory: {
          id: 1,
          name: "testCat"
        },
        round: {
          id: 1,
          duration: 300,
          roundsCount: 3
        }
      },
      fightJudgesMappings: [
        {
          fightId: 1,
          judgeId: 5,
          main: 0
        }
      ]
    }
  }
};

describe("fight actions", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it("should get fights", () => {
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

    nock("http://imuaythai.herokuapp.com")
      .get("/api/fight/get/abc/A")
      .reply(200, fightResponse);

    const store = mockStore(initialState);
    const expectedActions = [
      {
        type: types.GET_FIGHTS_REQUEST
      },
      { type: types.GET_FIGHTS_SUCCESS, payload: fightResponse }
    ];

    return store.dispatch(actions.getFights()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should get fight details", () => {
    const response = {
      id: 1,
      redAtheleteId: 1,
      blueAtheleteId: 2,
      timeKeeperId: 3,
      redAthlete: {
        id: 1,
        firtName: "test",
        surname: "test2"
      },
      blueAthlete: {
        id: 2,
        firtName: "test2",
        surname: "test3"
      },
      ring: "A",
      fightStructure: {
        id: 1,
        weightAgeCategory: {
          id: 1,
          name: "testCat"
        },
        round: {
          id: 1,
          duration: 300,
          roundsCount: 3
        }
      },
      fightJudgesMappings: {
        fightId: 1,
        judgeId: 5,
        main: 0
      }
    };
    nock("http://imuaythai.herokuapp.com")
      .get("/api/fight/1")
      .reply(200, response);

    const store = mockStore(initialState);
    const expectedActions = [
      {
        type: types.GET_FIGHT_DETAILS_REQUEST
      },
      { type: types.GET_FIGHT_DETAILS_SUCCESS, payload: response },
      { type: types.SET_ROLE_IN_FIGHT, payload: "points" }
    ];

    return store.dispatch(actions.getFightDetails(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should set fight id and download it", () => {
    const store = mockStore(initialState);
    const expectedActions = [
      { type: types.GET_FIGHT_DETAILS_REQUEST },
      {
        type: types.SET_FIGHT_ID,
        payload: 1
      }
    ];

    store.dispatch(actions.setFightId(1));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should exit fight", () => {
    const store = mockStore(initialState);
    const expectedActions = [
      {
        type: types.WEBSOCKET_DISCONNECT
      },
      { type: types.EXIT_FIGHT }
    ];

    store.dispatch(actions.exitFight());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should start round as points", () => {
    const state = {
      Fight: {
        role: "points"
      }
    };
    const store = mockStore(state);
    const expectedActions = [
      {
        type: types.UNBLOCK_UI
      },
      { type: types.START_ROUND }
    ];

    store.dispatch(actions.startRound(1));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should start round as main", () => {
    const state = {
      Fight: {
        role: "main"
      }
    };
    const store = mockStore(state);
    const expectedActions = [
      {
        type: types.CREATE_ROUND,
        payload: 1
      },
      {
        type: types.START_FIGHT_TIMER
      },
      { type: types.START_ROUND }
    ];

    store.dispatch(actions.startRound(1));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should start round as timekeeper", () => {
    const state = {
      Fight: {
        role: "timekeeper"
      }
    };
    const store = mockStore(state);
    const expectedActions = [
      { type: types.START_FIGHT_TIMER },
      { type: types.START_ROUND }
    ];

    store.dispatch(actions.startRound(1));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should end round as timekeeper", () => {
    const state = {
      Fight: {
        role: "timekeeper"
      }
    };
    const store = mockStore(state);
    const expectedActions = [
      { type: types.SET_ACTIVE_TIMER, payload: "pause" },
      { type: types.START_PAUSE_TIMER },
      { type: types.END_ROUND }
    ];

    store.dispatch(actions.endRound());

    expect(store.getActions()).toEqual(expectedActions);
  });
  it("should end round as main", () => {
    const state = {
      Fight: {
        role: "main"
      }
    };
    const store = mockStore(state);
    const expectedActions = [
      { type: types.SET_ACTIVE_TIMER, payload: "pause" },
      { type: types.START_PAUSE_TIMER },
      { type: types.END_ROUND }
    ];

    store.dispatch(actions.endRound());

    expect(store.getActions()).toEqual(expectedActions);
  });
  it("should end round as points", () => {
    const state = {
      Fight: {
        role: "points"
      }
    };
    const store = mockStore(state);
    const expectedActions = [
      { type: types.START_BLINK },
      { type: types.END_ROUND }
    ];

    store.dispatch(actions.endRound());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should set role in fight", () => {
    const store = mockStore(initialState);
    const expectedActions = [
      { type: types.SET_ROLE_IN_FIGHT, payload: "points" }
    ];

    store.dispatch(actions.setRoleInFight());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should pause round as timekeeper", () => {
    const state = {
      Fight: {
        role: "timekeeper"
      }
    };
    const store = mockStore(state);
    const expectedActions = [
      { type: types.STOP_FIGHT_TIMER },
      { type: types.PAUSE_ROUND }
    ];

    store.dispatch(actions.pauseRound());

    expect(store.getActions()).toEqual(expectedActions);
  });
  it("should pause round as main", () => {
    const state = {
      Fight: {
        role: "main"
      }
    };
    const store = mockStore(state);
    const expectedActions = [
      { type: types.STOP_FIGHT_TIMER },
      { type: types.PAUSE_ROUND }
    ];

    store.dispatch(actions.pauseRound());

    expect(store.getActions()).toEqual(expectedActions);
  });
  it("should pause round as points", () => {
    const state = {
      Fight: {
        role: "points"
      }
    };
    const store = mockStore(state);
    const expectedActions = [{ type: types.PAUSE_ROUND }];

    store.dispatch(actions.pauseRound());

    expect(store.getActions()).toEqual(expectedActions);
  });
  it("should pause round as timekeeper", () => {
    const state = {
      Fight: {
        role: "timekeeper"
      }
    };
    const store = mockStore(state);
    const expectedActions = [
      { type: types.START_FIGHT_TIMER },
      { type: types.RESUME_ROUND }
    ];

    store.dispatch(actions.resumeRound());

    expect(store.getActions()).toEqual(expectedActions);
  });
  it("should pause round as main", () => {
    const state = {
      Fight: {
        role: "main"
      }
    };
    const store = mockStore(state);
    const expectedActions = [
      { type: types.START_FIGHT_TIMER },
      { type: types.RESUME_ROUND }
    ];

    store.dispatch(actions.resumeRound());

    expect(store.getActions()).toEqual(expectedActions);
  });
  it("should pause round as points", () => {
    const state = {
      Fight: {
        role: "points"
      }
    };
    const store = mockStore(state);
    const expectedActions = [{ type: types.RESUME_ROUND }];

    store.dispatch(actions.resumeRound());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should end fight as timekeeper", () => {
    const state = {
      Fight: {
        role: "timekeeper"
      }
    };

    const store = mockStore(state);
    const expectedActions = [
      { type: types.END_FIGHT },
      { type: types.ACCOUNT_LOGOUT }
    ];
    store.dispatch(actions.endFight());

    expect(store.getActions()).toEqual(expectedActions);
  });
  it("should end fight as main", () => {
    const state = {
      Fight: {
        role: "main"
      }
    };

    const store = mockStore(state);
    const expectedActions = [
      { type: types.END_FIGHT },
      { type: types.EXIT_FIGHT }
    ];
    store.dispatch(actions.endFight());

    expect(store.getActions()).toEqual(expectedActions);
  });
  it("should end fight as points", () => {
    const state = {
      Fight: {
        role: "points"
      }
    };

    const store = mockStore(state);
    const expectedActions = [
      { type: types.END_FIGHT },
      { type: types.ACCOUNT_LOGOUT }
    ];
    store.dispatch(actions.endFight());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should unblock ui on jury connect for timekeeper", () => {
    const state = {
      Fight: {
        role: "timekeeper"
      }
    };

    const store = mockStore(state);
    const expectedActions = [{ type: types.UNBLOCK_UI }];
    store.dispatch(actions.juryConnected());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should show accepted points message for point jury", () => {
    const state = {
      Fight: {
        role: "points"
      }
    };

    const store = mockStore(state);
    const expectedActions = [
      { type: types.POINTS_ACCEPTED },
      { type: types.SHOW_SUCCESS, payload: "Points has been accepted!" }
    ];
    store.dispatch(actions.acceptPoints());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should show accepted points message for main jury", () => {
    const state = {
      Fight: {
        role: "main"
      }
    };

    const store = mockStore(state);
    const expectedActions = [
      { type: types.POINTS_ACCEPTED },
      { type: types.SHOW_SUCCESS, payload: "Points has been accepted!" }
    ];
    store.dispatch(actions.acceptPoints());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should show premature end panel for point jury", () => {
    const state = {
      Fight: {
        role: "points"
      }
    };

    const store = mockStore(state);
    const expectedActions = [{ type: types.SHOW_PREMATURE_END_PANELS }];
    store.dispatch(actions.showPrematureEndPanels());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should show premature end panel for main jury", () => {
    const state = {
      Fight: {
        role: "main"
      }
    };

    const store = mockStore(state);
    const expectedActions = [{ type: types.SHOW_PREMATURE_END_PANELS }];
    store.dispatch(actions.showPrematureEndPanels());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should set warning", () => {
    const state = {};
    let point = { id: 1, name: "points", value: 3, action: "SET_POINTS" };
    const store = mockStore(state);
    const expectedActions = [{ type: types.SET_WARNINGS, payload: point }];
    store.dispatch(actions.setWarning(point));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
