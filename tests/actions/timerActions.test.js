import * as actions from "../../actions/TimerActions";
import * as types from "../../actions/types";

describe("timer actions", () => {
  it("should start fight timer", () => {
    const expected = {
      type: types.START_FIGHT_TIMER
    };

    expect(actions.startFightTimer()).toEqual(expected);
  });

  it("should stop fight timer", () => {
    const expected = {
      type: types.STOP_FIGHT_TIMER
    };
    expect(actions.stopFightTimer()).toEqual(expected);
  });

  it("should reset fight timer", () => {
    const expected = {
      type: types.RESET_FIGHT_TIMER
    };
    expect(actions.resetFightTimer()).toEqual(expected);
  });

  it("should start pause timer", () => {
    const expected = {
      type: types.START_PAUSE_TIMER
    };

    expect(actions.startPauseTimer()).toEqual(expected);
  });

  it("should stop pause timer", () => {
    const expected = {
      type: types.STOP_PAUSE_TIMER
    };
    expect(actions.stopPauseTimer()).toEqual(expected);
  });

  it("should reset pause timer", () => {
    const expected = {
      type: types.RESET_PAUSE_TIMER
    };
    expect(actions.resetPauseTimer()).toEqual(expected);
  });

  it("should set callback fight timer", () => {
    const callback = () => {
      console.log("test");
    };

    const expected = {
      type: types.SET_CALLBACK_FIGHT_TIMER,
      payload: callback
    };

    expect(actions.setCallbackFightTimer(callback)).toEqual(expected);
  });

  it("should set callback pause timer", () => {
    const callback = () => {
      console.log("test");
    };

    const expected = {
      type: types.SET_CALLBACK_PAUSE_TIMER,
      payload: callback
    };

    expect(actions.setCallbackPauseTimer(callback)).toEqual(expected);
  });

  it("should set active timer", () => {
    const expected = {
      type: types.SET_ACTIVE_TIMER,
      payload: "fight"
    };

    expect(actions.setActiveTimer("fight")).toEqual(expected);
  });
});
