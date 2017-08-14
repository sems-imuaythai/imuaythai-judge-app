import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFightDetails } from '../../actions/FightActions';
import { subscribe, sendMessage } from '../../actions/WebsocketActions';
import * as requestType from './requestTypes';
import FightPointsContainer from './FightPointsContainer';
import MainJudgeContainer from './MainJudgeContainer';
import TimekeeperContainer from './TimekeeperContainer';
import FightListContainer from './FightListContainer';
import CenterSpinner from '../../components/Spinner/CenterSpinner';



const GetJudgeRole = (props) => {
    const {fight, user, subscribe, sendMessage} = props;
    if (fight.refereeId === user.id) {
        subscribe();
        return "Referee";
    } else if (fight.timeKeeperId === user.id) {
        subscribe();
        return "Timekeeper";
    } else if (fight.fightJudgesMappings.find(judge => judge.judgeId === user.id && judge.main === 1)) {
        subscribe();
        var message = MainJudgeConnected();
        sendMessage(message);
        return "Main";
    } else if (fight.fightJudgesMappings.find(judge => judge.judgeId === user.id && judge.main === 0)) {
        subscribe();
        return "Points";
    }
    else
        return "";
}
const MainJudgeConnected = () => {
    var request = {
        requestType: requestType.JuryConnected,
        data: null
    }

    return JSON.stringify(request);
}


class FightScreenResolver extends Component {
    componentWillMount() {
        if (this.props.fight == undefined)
            this.props.getFightDetails(this.props.fightId);
    }
    render() {
        const {fight, sendMessage, user} = this.props;

        if (fight) {
            var judgeRole = GetJudgeRole(this.props);
            switch (judgeRole) {
                case "Main":
                    return <MainJudgeContainer fight={ fight } sendMessage={ sendMessage } />
                case "Points":
                    return <FightPointsContainer fight={ fight } sendMessage={ sendMessage } user={ user } />
                case "Timekeeper":
                    return <TimekeeperContainer fight={ fight } sendMessage={ sendMessage } />
                default:
                    return <FightListContainer />
            }
        }

        return <CenterSpinner/>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        fight: state.Fight.fight,
        user: state.Account.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getFightDetails: (id) => {
            dispatch(getFightDetails(id))
        },

        subscribe: () => {
            dispatch(subscribe())
        },

        sendMessage: (message) => {
            dispatch(sendMessage(message))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FightScreenResolver)