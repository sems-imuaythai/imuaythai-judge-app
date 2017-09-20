export const preparePointsToSend = () => {
  return (dispatch, getState) => {
    let pointsToAccept = [];

    for (let roundId in this.state.rounds) {
      let round = this.state.rounds[roundId];
      for (let judgeId in round.judges) {
        let judge = round.judges[judgeId];
        let redPoints = {
          points: judge.redPoints,
          judgeId: judge.id,
          fightId: judge.fightId,
          fighterId: this.props.fight.redAthleteId,
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
  };
};
