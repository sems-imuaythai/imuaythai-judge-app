import React, { Component } from 'react';
import FightListView from '../../components/Fight/FightListView';
import { getFights } from '../../actions/FightActions';
import { subscribe, sendMessage } from '../../actions/WebsocketActions';
import CenterSpinner from '../../components/Spinner/CenterSpinner';
import { connect } from 'react-redux';

class FightListContaier extends Component {
    constructor() {
        super();

    }

    componentWillMount() {
        this.props.subscribe();
    }
    render() {

        return (
            <FightListView sendMessage={ this.props.sendMessage } />
            );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        fights: state.Fight.fightList,
        fetching: state.Fight.fetching,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getFights: () => {
            dispatch(getFights())
        },

        subscribe: () => {
            dispatch(subscribe())
        },

        sendMessage: (message) => {
            dispatch(sendMessage(message))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FightListContaier)