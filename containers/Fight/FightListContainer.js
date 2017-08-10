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
    render() {

        return (
            <FightListView />
            );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        //fights: state.Fight.fightList,
        // fetching: state.Fight.fetching,
        // ring: state.Settings.ring,
        //socket: state.Websocket.socket
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getFights: (ring) => {
            dispatch(getFights(ring))
        },

        subscribe: (ring) => {
            dispatch(subscribe(ring))
        },

        sendMessage: (socket, message) => {
            dispatch(sendMessage(socket, message))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FightListContaier)