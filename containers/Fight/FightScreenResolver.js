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
    const {fight, user, subscribe} = props;
    if (fight.timeKeeperId === user.id) {
        subscribe();
        return "Timekeeper";
    } else if (fight.fightJudgesMappings.find(judge => judge.judgeId === user.id && judge.main === 1)) {
        subscribe();
        return "Main";
    } else if (fight.fightJudgesMappings.find(judge => judge.judgeId === user.id && judge.main === 0)) {
        subscribe();
        return "Points";
    }
    else
        return "";
}


class FightScreenResolver extends Component {
    componentWillMount() {
        if (this.props.fight == undefined || this.props.fight.id !== this.props.fightId)
            this.props.getFightDetails(this.props.fightId);
    }

    componentWillReceiveProps(newProps){
        if(this.props.fight !== undefined && newProps.fightId !== this.props.fight.id)
            this.props.getFightDetails(this.props.fightId);
    }    

    render() {
        const {fight, sendMessage, user} = this.props;      

        if (fight) {
            let judgeRole = GetJudgeRole(this.props);
            switch (judgeRole) {
                case "Main":
                    return <MainJudgeContainer fight={ fight } sendMessage={ sendMessage } user={ user } />
                case "Points":
                    return <FightPointsContainer fight={ fight } sendMessage={ sendMessage } user={ user } />
                case "Timekeeper":
                    return <TimekeeperContainer fight={ fight } sendMessage={ sendMessage } user={ user } />
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