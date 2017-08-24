import { connect } from 'react-redux'
import React, { Component } from 'react';
import * as requestTypes from './requestTypes';
import FightTimekeeperView from '../../components/Fight/FightTimekeeperView';
import { logout } from '../../actions/AccountActions'
import { parseMessage } from '../../common/helpers';
import { clearMessage } from '../../actions/WebsocketActions'


class TimekeeperContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timerStart: false,
            timerReset: false,
            startRound: false,
            pauseRound: false,
            disabled: true
        };

        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(message) {
        let parsedMessage = JSON.stringify(message);

        this.props.sendMessage(parsedMessage);
    }

    setRound() {
        if (this.state.startRound) {
            this.sendMessage({
                requestType: requestTypes.EndRound,
                data: null
            });
        } else {
            this.sendMessage({
                requestType: requestTypes.StartRound,
                data: null
            });
        }
    }

    toggleRound() {
        if (this.state.pauseRound) {
            this.sendMessage({
                requestType: requestTypes.ResumeRound,
                data: null
            });
        } else {
            this.sendMessage({
                requestType: requestTypes.PauseRound,
                data: null
            });
        }
    }

    prematureEndRound(){
        this.sendMessage({
            requestType: requestTypes.EndRound,
            data: null
        });
    }

    componentDidUpdate() {
        if (this.props.message) {
            let match = true;
            let message = parseMessage(this.props.message);

            switch (message.requestType) {
                case requestTypes.StartRound:
                    this.setState({
                        timerStart: true,
                        timerReset: false,
                        startRound: true,
                        pauseRound: false,
                    });
                    break;

                case requestTypes.EndFight:
                    this.props.logout();
                    break;

                case requestTypes.ResumeRound:
                    this.setState({
                        pauseRound: false,
                        timerStart: true
                    });
                    break;

                case requestTypes.PauseRound:
                    this.setState({
                        pauseRound: true,
                        timerStart: false
                    });
                    break;

                case requestTypes.JuryConnected:
                    this.setState({
                        disabled: false,
                    });
                    break;

                case requestTypes.EndRound:
                    this.setState({
                        timerStart: false,
                        timerReset: true,
                        startRound: false,
                        pauseRound: false,
                    });
                    break;
                default:
                    match = false;
                    break;
            }

            if (match) {
                this.props.clearMessage();
            }
        }
    }
    render() {
        return (
            <FightTimekeeperView user={ this.props.user } fight={ this.props.fight } timerStart={ this.state.timerStart } timerReset={ this.state.timerReset } setRound={ this.setRound.bind(this) } toggleRound={ this.toggleRound.bind(this) } paused={ this.state.pauseRound } startRound={ this.state.startRound } prematureEndRound={this.prematureEndRound.bind(this)}
            />
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimekeeperContainer)