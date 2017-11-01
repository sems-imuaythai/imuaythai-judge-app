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
        rounds: createRound(state)
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
        ...fightInitialState
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
    case actionType.RESET_POINTS:
      return {
        ...state,
        points: preparePoints(state)
      };
    case actionType.BLOCK_POINTS:
      return {
        ...state,
        points: blockPoints(action.payload, state)
      };
    case actionType.UNBLOCK_POINTS:
      return {
        ...state,
        points: unblockPoints(state)
      };
    default:
      return state;
  }
};

export default fight;

export const createRound = state => {
  const { fight } = state;
  const judgeMappings = fight.fightJudgesMappings.filter(
    judge => judge.main === 0
  );
  let round = {
    id: state.roundId,
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
      redCautions: 0,
      redKnockDown: 0,
      redWarnings: 0,
      redJ: 0,
      redX: 0,
      bluePoints: 0,
      blueCautions: 0,
      blueKnockDown: 0,
      blueWarnings: 0,
      blueJ: 0,
      blueX: 0
    };

    round.judges.push(judge);
  }

  return state.rounds.concat([round]);
};

export const receivePoints = (points, state) => {
  const { fight } = state;
  let round = state.rounds.find(r => r.id === points.roundId);
  let roundArrayId = state.rounds.indexOf(round);
  let judge = round.judges.find(j => j.id === points.judgeId);
  let judgeArrayId = round.judges.indexOf(judge);
  if (fight.redAthlete.id === points.fighterId) {
    judge.redPoints = points.points;
    judge.redCautions = points.cautions;
    judge.redKnockDown = points.knockDown;
    judge.redWarnings = points.warnings;
    judge.redJ = points.j;
    judge.redX = points.x;
  } else {
    judge.bluePoints = points.points;
    judge.blueCautions = points.cautions;
    judge.blueKnockDown = points.knockDown;
    judge.blueWarnings = points.warnings;
    judge.blueJ = points.j;
    judge.blueX = points.x;
  }

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

  state.points = [];

  let redPoints = {
    fighterId: fight.redAthlete.id,
    cautions: 0,
    knockDown: 0,
    warnings: 0,
    j: 0,
    x: 0,
    points: 0,
    disabled: true
  };
  state.points = state.points.concat([redPoints]);

  let bluePoints = {
    fighterId: fight.blueAthlete.id,
    cautions: 0,
    knockDown: 0,
    warnings: 0,
    j: 0,
    x: 0,
    points: 0,
    disabled: true
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

const blockPoints = (fighterId, state) => {
  let point = state.points.find(p => p.fighterId === fighterId);
  let pointArrayId = state.points.indexOf(point);

  point.disabled = true;

  return state.points
    .slice(0, pointArrayId)
    .concat(point)
    .concat(state.points.slice(pointArrayId + 1));
};

const unblockPoints = state => {
  return state.points.map((item, index) => {
    return {
      ...item,
      disabled: false
    };
  });
};
