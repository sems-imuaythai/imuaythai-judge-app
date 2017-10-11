import * as actionTypes from "./types";
export const modelPointsToBeAccepted = state => {
  let pointsToAccept = [];

  for (let roundId in state.Fight.rounds) {
    let round = state.Fight.rounds[roundId];
    for (let judgeId in round.judges) {
      let judge = round.judges[judgeId];
      let redPoints = {
        points: judge.redPoints,
        judgeId: judge.id,
        fightId: judge.fightId,
        fighterId: state.Fight.fight.redAthleteId,
        roundId: round.id,
        accepted: true
      };
      let redPointsString = JSON.stringify(redPoints);
      pointsToAccept.push(redPointsString);

      let bluePoints = {
        points: judge.bluePoints,
        judgeId: judge.id,
        fightId: judge.fightId,
        fighterId: state.Fight.fight.blueAthleteId,
        roundId: round.id,
        accepted: true
      };
      let bluePointsString = JSON.stringify(bluePoints);
      pointsToAccept.push(bluePointsString);
    }
  }

  return pointsToAccept;
};

export const modelPointsToBeSend = (fighterId, state) => {
  const { points, roundId, fightId } = state.Fight;
  const { user } = state.Account;

  let pointsToSend = points.find(point => point.fighterId === fighterId);

  return {
    ...pointsToSend,
    roundId: roundId,
    fightId: fightId,
    judgeId: user.id
  };
};

export const editPoints = points => ({
  type: actionTypes.EDIT_POINTS,
  payload: points
});

export const setPoints = points => ({
  type: actionTypes.SET_POINTS,
  payload: points
});

export const addPointsToHistory = state => {
  const { points, roundId } = state.Fight;

  for (let pointId in points) {
    let point = points[pointId];

    let pointsArray = [
      {
        name: "Cautions",
        value: point.cautions
      },
      {
        name: "Knock down",
        value: point.knockDown
      },
      {
        name: "Warnings",
        value: point.warnings
      },
      {
        name: "J",
        value: point.j
      },
      {
        name: "X",
        value: point.x
      },
      {
        name: "Points",
        value: point.points
      }
    ];

    let round = {
      id: roundId - 1,
      fighterId: point.fighterId,
      points: pointsArray
    };

    state.PointsHistory.rounds = state.PointsHistory.rounds.concat([round]);
  }

  return state.PointsHistory.rounds;
};

export const canSendPoints = state => {
  return (
    state.Fight.points.find(p => p.points === 10) &&
    !state.Fight.points.find(p => p.points === 0)
  );
};

export const prepareInjury = (injury, state) => {
  return {
    injury: injury.name,
    judgeId: state.Account.user.id,
    fighterId: injury.fighterId,
    fightId: state.Fight.fightId,
    roundId: state.Fight.roundId
  };
};
