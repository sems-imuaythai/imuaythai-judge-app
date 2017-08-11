import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFightDetails } from '../../actions/FightActions';
import { subscribe, sendMessage } from '../../actions/WebsocketActions';
import CenterSpinner from '../../components/Spinner/CenterSpinner';
import FightPointsContainer from './FightPointsContainer';
import MainJudgeContainer from './MainJudgeContainer';
import TimekeeperContainer from './TimekeeperContainer';
import FightListContainer from './FightListContainer';



const GetJudgeRole = (fight, userId) => {
    //TODO: get judge role
}


class FightScreenResolver extends Component {
    componentWillMount() {
        if (fight == undefined)
            this.props.getFightDetails(this.props.fightId);

        this.props.subscribe();
    }
    render() {
        const {userId, fight, sendMessage} = this.props;

        if (fight) {
            var judgeRole = GetJudgeRole(fight, userId);
            switch (judgeRole) {
                case "Main":
                    return <MainJudgeContainer fight={ fight } sendMessage={ sendMessage } />
                case "Points":
                    return <FightPointsContainer fight={ fight } sendMessage={ sendMessage } />
                case "Timekeeper":
                    return <TimekeeperContainer fight={ fight } sendMessage={ sendMessage } />
                default:
                    return <FightListContainer />
            }
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        fight: state.Fight.fight,
        userId: state.Account.userId
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

export default FightScreenResolver;