import React, { Component } from 'react';
import { connect } from 'react-redux';
import FightMainJudgeView from '../../components/Fight/FightMainJudgeView';
import { clearMessage, notifyJuryConnected } from '../../actions/WebsocketActions';
import CenterSpinner from '../../components/Spinner/CenterSpinner';
import { parseMessage } from '../../common/helpers';
import {logout} from '../../actions/AccountActions';

class MainJudgeContainer extends Component {

    render() {
        const parsedMessage = this.props.message ? parseMessage(this.props.message) : '';
        return (
            <FightMainJudgeView fight={ this.props.fight } user={ this.props.user } message={ parsedMessage } sendMessage={ this.props.sendMessage } juryConnected={ this.props.juryConnected }
              notifyOnJuryConnected={ this.props.notifyJuryConnected } clearMessage={ this.props.clearMessage } logout={ this.props.logout } />
            );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        message: state.Websocket.message,
        juryConnected: state.Websocket.juryConnected
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => {
            dispatch(logout())
        },
        clearMessage: () => {
            dispatch(clearMessage())
        },
        notifyJuryConnected: () => {
            dispatch(notifyJuryConnected())
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainJudgeContainer);