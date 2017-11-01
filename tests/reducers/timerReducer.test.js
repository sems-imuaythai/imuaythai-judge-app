import reducer from "../../reducers/TimerReducer";
import * as types from "../../actions/types";

describe("timer reducer", () => {
  it("should return initial value", () => {
    const expected = {
      pauseTimerStart: false,
      pauseTimerReset: false,
      pauseTimerCallback: undefined,
      fightTimerStart: false,
      fightTimerReset: false,
      fightTimerCallback: undefined,
      active: ""
    };

    expect(reducer(undefined, {})).toEqual(expected);
  });

  it("should handle fight timer start", () => {
    const expected = {
      fightTimerStart: true,
      fightTimerReset: false
    };
    expect(
      reducer(
        {},
        {
          type: types.START_FIGHT_TIMER
        }
      )
    ).toEqual(expected);
  });

  it("should handle fight timer stop", () => {
    const expected = {
      fightTimerStart: false
    };
    expect(
      reducer(
        {},
        {
          type: types.STOP_FIGHT_TIMER
        }
      )
    ).toEqual(expected);
  });

  it("should handle fight timer reset", () => {
    const expected = {
      fightTimerStart: false,
      fightTimerReset: true
    };
    expect(
      reducer(
        {},
        {
          type: types.RESET_FIGHT_TIMER
        }
      )
    ).toEqual(expected);
  });

  it("should handle set callback fight timer", () => {
    const testfunc = () => {
      console.log("test");
    };
    const expected = {
      fightTimerCallback: testfunc
    };
    expect(
      reducer(
        {},
        {
          type: types.SET_CALLBACK_FIGHT_TIMER,
          payload: testfunc
        }
      )
    ).toEqual(expected);
  });
  it("should handle pause timer start", () => {
    const expected = {
      pauseTimerStart: true,
      pauseTimerReset: false
    };
    expect(
      reducer(
        {},
        {
          type: types.START_PAUSE_TIMER
        }
      )
    ).toEqual(expected);
  });

  it("should handle pause timer stop", () => {
    const expected = {
      pauseTimerStart: false
    };
    expect(
      reducer(
        {},
        {
          type: types.STOP_PAUSE_TIMER
        }
      )
    ).toEqual(expected);
  });

  it("should handle pause timer reset", () => {
    const expected = {
      pauseTimerStart: false,
      pauseTimerReset: true
    };
    expect(
      reducer(
        {},
        {
          type: types.RESET_PAUSE_TIMER
        }
      )
    ).toEqual(expected);
  });

  it("should handle set callback pause timer", () => {
    const testfunc = () => {
      console.log("test");
    };
    const expected = {
      pauseTimerCallback: testfunc
    };
    expect(
      reducer(
        {},
        {
          type: types.SET_CALLBACK_PAUSE_TIMER,
          payload: testfunc
        }
      )
    ).toEqual(expected);
  });

  it("should handle set active timer", () => {
    const expected = {
      active: "fight"
    };

    expect(
      reducer(
        {},
        {
          type: types.SET_ACTIVE_TIMER,
          payload: "fight"
        }
      )
    ).toEqual(expected);
  });
});
