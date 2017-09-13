import { saveState, loadState } from "../common/localStorage";

test("load from localStorage", () => {
  const state = {
    param1: "param1",
    param2: {
      param3: "param3"
    }
  };
  saveState(state);

  let loadedState = loadState();

  expect(state).toEqual(loadedState);
});
