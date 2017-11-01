import * as actions from "../../actions/PointActions";
import * as types from "../../actions/types";
import configureMockStore from "redux-mock-store";

describe("Point actions", () => {
  it("should prepare points to send", () => {
    const initialState = {
      Fight: {
        points: [
          {
            fighterId: 3,
            cautions: 0,
            knockDown: 0,
            warnings: 0,
            j: 0,
            x: 0,
            points: 10
          },
          {
            fighterId: 4,
            cautions: 0,
            knockDown: 0,
            warnings: 0,
            j: 0,
            x: 0,
            points: 8
          }
        ],
        roundId: 1,
        fightId: 5
      },
      Account: {
        user: {
          id: 16
        }
      }
    };

    const expected = {
      fighterId: 3,
      cautions: 0,
      knockDown: 0,
      warnings: 0,
      j: 0,
      x: 0,
      points: 10,
      roundId: 1,
      fightId: 5,
      judgeId: 16
    };

    expect(actions.modelPointsToBeSend(3, initialState)).toEqual(expected);
  });
});
