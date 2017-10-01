import * as actionType from "../actions/types";

const pointsHistoryInitialState = {
  rounds: []
};
const pointsHistory = (state = pointsHistoryInitialState, action) => {
  switch (action.type) {
    case actionType.ADD_POINTS_HISTORY:
      return {
        ...state,
        rounds: addPointsToHistory(state)
      };
    case actionType.ACCOUNT_LOGOUT:
      return {
        ...state,
        rounds: []
      };
    default:
      return state;
  }
};

export default pointsHistory;

const addPointsToHistory = state => {
  let points = [
    {
      name: "Cautions",
      value: this.state.cautions
    },
    {
      name: "Knock down",
      value: state.knockDown
    },
    {
      name: "Warnings",
      value: state.warnings
    },
    {
      name: "J",
      value: state.j
    },
    {
      name: "X",
      value: state.x
    },
    {
      name: "Points",
      value: state.points
    }
  ];
  let round = {
    id: state.roundId,
    fighterId: state.fighterId,
    points: points
  };
  state.rounds.concat([round]);
  return state;
};
