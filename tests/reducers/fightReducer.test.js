import reducer from "../../reducers/FightReducer";
import * as types from "../../actions/types";

describe("Fight reducer", () => {
  it("should return initial state", () => {
    const expected = {
      fightList: [],
      fetching: false,
      fetched: false,
      fight: undefined,
      fightId: "",
      started: false,
      paused: false,
      role: undefined,
      rounds: [],
      points: []
    };

    expect(reducer(undefined, {})).toEqual(expected);
  });

  it("should get fights request", () => {
    const expected = {
      fetching: true,
      fetched: false
    };

    expect(reducer({}, { type: types.GET_FIGHTS_REQUEST })).toEqual(expected);
  });

  it("should get fight details request", () => {
    const expected = {
      fetching: true,
      fetched: false
    };

    expect(reducer({}, { type: types.GET_FIGHT_DETAILS_REQUEST })).toEqual(
      expected
    );
  });

  it("should create round", () => {
    const initialState = {
      Fight: {
        rounds: [],
        fight: {
          id: 5,
          fightJudgesMappings: [
            {
              main: 0,
              judge: {
                id: 1,
                firstName: "test",
                surname: "test"
              }
            },
            {
              main: 0,
              judge: {
                id: 2,
                firstName: "test",
                surname: "test"
              }
            },
            {
              main: 0,
              judge: {
                id: 3,
                firstName: "test",
                surname: "test"
              }
            }
          ]
        }
      }
    };
    const expected = {
      rounds: [
        {
          id: 1,
          judges: [
            {
              id: 1,
              firstName: "test",
              surname: "test",
              fightId: 5,
              redPoints: 0,
              bluePoints: 0
            },
            {
              id: 2,
              firstName: "test",
              surname: "test",
              fightId: 5,
              redPoints: 0,
              bluePoints: 0
            },
            {
              id: 3,
              firstName: "test",
              surname: "test",
              fightId: 5,
              redPoints: 0,
              bluePoints: 0
            }
          ]
        }
      ]
    };

    expect(
      reducer(initialState, { type: types.CREATE_ROUND, payload: 1 })
    ).toEqual(expected);
  });
});
