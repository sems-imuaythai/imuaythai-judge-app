import * as actionType from "../actions/types";

const fightInitialState = {
  fightList: [],
  fetching: false,
  fetched: false,
  fight: undefined,
  fightId: "",
  started: false,
  paused: false,
  role: undefined,
  rounds: []
};

const fight = (state = fightInitialState, action) => {
  switch (action.type) {
    case actionType.GET_FIGHTS_REQUEST:
    case actionType.GET_FIGHT_DETAILS_REQUEST:
      return {
        ...state,
        fetching: true,
        fetched: false
      };
    case actionType.GET_FIGHTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        fightList: action.payload
      };
    case actionType.GET_FIGHT_DETAILS_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        fight: action.payload
      };
    case actionType.GET_FIGHTS_REJECTED:
    case actionType.GET_FIGHT_DETAILS_REJECTED:
      return {
        ...state,
        fetching: false
      };

    case actionType.SET_FIGHT_ID:
      return {
        ...state,
        fightId: action.payload
      };

    case actionType.SET_ROLE_IN_FIGHT:
      return {
        ...state,
        role: action.payload
      };

    case actionType.CREATE_ROUND:
      return {
        ...state,
        rounds: state.rounds.concat([createRound(state)])
      };

    case actionType.ACCOUNT_LOGOUT:
    case actionType.ACCOUNT_PREFIGHT_LOGOUT:
    case actionType.EXIT_FIGHT:
      return {
        ...state,
        fight: undefined,
        fightId: "",
        role: undefined
      };

    default:
      return state;
  }
};

export default fight;

export const createRound = state => {
  const { fight } = state.Fight;
  const judgeMappings = fight.fightJudgesMappings.filter(
    judge => judge.main === 0
  );
  let round = {
    id: roundId,
    judges: []
  };
  for (let key in judgeMappings) {
    let mapping = judgeMappings[key];
    let judge = {
      id: mapping.judge.id,
      fightId: fight.id,
      firstName: mapping.judge.firstName,
      surname: mapping.judge.surname,
      redPoints: 0,
      bluePoints: 0
    };

    round.judges.push(judge);
  }
  return round;
};

export const receivePoints = (points, state) => {
  const { fight } = state.Fight;
  let round = state.rounds.find(r => r.id === points.roundId);
  let roundArrayId = state.rounds.indexOf(round);
  let judge = round.judges.find(j => j.id === points.judgeId);
  let judgeArrayId = round.judges.indexOf(judge);
  if (fight.redAthleteId === points.fighterId) judge.redPoints = points.points;
  else judge.bluePoints = points.points;

  round.judges = round.judges
    .slice(0, judgeArrayId)
    .concat(judge)
    .concat(round.judges.slice(judgeArrayId + 1));

  return state.rounds
    .slice(0, roundArrayId)
    .concat(round)
    .concat(state.rounds.slice(roundArrayId + 1));
};

export const editPoints = sate;
