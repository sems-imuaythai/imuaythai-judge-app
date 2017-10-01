import * as actionType from "../actions/types";

const fightInitialState = {
  fightList: [],
  fetching: false,
  fetched: false,
  fight: undefined,
  fightId: "",
  started: false,
  paused: false,
  roundId: "",
  role: undefined,
  rounds: [],
  points: []
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
        role: action.payload,
        points: action.payload === "points" ? preparePoints(state) : []
      };

    case actionType.CREATE_ROUND:
      return {
        ...state,
        rounds: createRound(action.payload, state)
      };
    case actionType.EDIT_POINTS:
      return {
        ...state,
        rounds: editPoints(action.payload, state)
      };
    case actionType.RECEIVED_POINTS:
      return {
        ...state,
        rounds: receivePoints(action.payload, state)
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
    case actionType.SET_WARNINGS:
      return {
        ...state,
        points: setWarning(action.payload, state)
      };

    case actionType.START_ROUND:
      return {
        ...state,
        roundId: action.payload,
        started: true
      };

    case actionType.END_ROUND:
      return {
        ...state,
        started: false
      };
    case actionType.PAUSE_ROUND:
      return {
        ...state,
        paused: true
      };
    case actionType.RESUME_ROUND:
      return {
        ...state,
        paused: false
      };
    case actionType.END_FIGHT:
      return state;

    default:
      return state;
  }
};

export default fight;

export const createRound = (roundId, state) => {
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

  return state.rounds.concat([round]);
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

export const editPoints = (points, state) => {
  let round = state.rounds.find(r => r.id === points.roundId);
  let roundArrayId = state.rounds.indexOf(round);
  let judge = round.judges.find(j => j.id === points.judgeId);
  let judgeArrayId = round.judges.indexOf(judge);
  judge.redPoints = points.redPoints;
  judge.bluePoints = points.bluePoints;

  round.judges = round.judges
    .slice(0, judgeArrayId)
    .concat(judge)
    .concat(round.judges.slice(judgeArrayId + 1));

  return state.rounds
    .slice(0, roundArrayId)
    .concat(round)
    .concat(state.rounds.slice(roundArrayId + 1));
};

export const preparePoints = state => {
  const { fight } = state;
  let redPoints = {
    fighterId: fight.redAthleteId,
    cautions: 0,
    knockDown: 0,
    warnings: 0,
    j: 0,
    x: 0,
    points: 0
  };
  state.points = state.points.concat([redPoints]);

  let bluePoints = {
    fighterId: fight.blueAthleteId,
    cautions: 0,
    knockDown: 0,
    warnings: 0,
    j: 0,
    x: 0,
    points: 0
  };
  state.points = state.points.concat([bluePoints]);

  return state.points;
};

const setWarning = (warning, state) => {
  let point = state.points.find(point => point.fighterId === warning.id);
  let pointArrayId = state.points.indexOf(point);
  switch (warning.action) {
    case "INCREMENT_WARNING":
      point[warning.name] = point[warning.name] + 1;
      break;
    case "DECREMENT_WARNING":
      if (point[warning.name] > 0)
        point[warning.name] = point[warning.name] - 1;
      break;
    case "SET_POINTS":
      point[warning.name] = warning.value;
      break;
  }

  return state.points
    .slice(0, pointArrayId)
    .concat(point)
    .concat(state.points.slice(pointArrayId + 1));
};
