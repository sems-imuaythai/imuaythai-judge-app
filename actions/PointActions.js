import * as actionTypes from "./types";
export const preparePointsToSend = state => {
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
        fighterId: this.props.fight.blueAthleteId,
        roundId: round.id,
        accepted: true
      };
      let bluePointsString = JSON.stringify(bluePoints);
      pointsToAccept.push(bluePointsString);
    }
  }

  return pointsToAccept;
};

export const editPoints = points => ({
  type: actionTypes.EDIT_POINTS,
  payload: points
});
