import React, { Component } from 'react';
import FightPointsView from '../../components/Fight/FightPointsView';
import * as requestType from '../../containers/Fight/requestTypes';
import { logout } from '../../actions/AccountActions';
import { connect } from 'react-redux';
import { parseMessage } from '../../common/helpers'
import { clearMessage } from '../../actions/WebsocketActions';


class FightPointsContainer extends Component {


    render() {
        const parsedMessage = this.props.message ? parseMessage(this.props.message) : '';
        console.log('====================================');
        console.log(parsedMessage);
        console.log('====================================');
        return (
            <FightPointsView fight={ this.props.fight } user={ this.props.user } message={ parsedMessage } sendMessage={ this.props.sendMessage } clearMessage={this.props.clearMessage} />
            );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        message: state.Websocket.message
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FightPointsContainer);