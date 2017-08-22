import { connect } from 'react-redux'
import React, { Component } from 'react';
import * as requestTypes from './requestTypes';
import FightTimekeeperView from '../../components/Fight/FightTimekeeperView';
import { logout } from '../../actions/AccountActions'
import { parseMessage } from '../../common/helpers'


class TimekeeperContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          timerStart: false,
          timerReset: false
        };
    
        this.toggleTimer = this.toggleTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
      }
    
      toggleTimer() {
        this.setState({
          timerStart: !this.state.timerStart,
          timerReset: false
        });
      }
    
      resetTimer() {
        this.setState({
          timerStart: false,
          timerReset: true
        });
      }

    sendTime(time) {
        let request = {
            requestType: requestTypes.SendTime,
            data: time.toString()
        }
        let requestString = JSON.stringify(request);
        this.props.sendMessage(requestString)
    }

    componentDidUpdate() {
        switch (this.props.message.requestType) {
            case requestTypes.EndFight:
                this.props.logout();
                break;

            default:
                break;
        }
    }
    render() {
        return (
            <FightTimekeeperView sendTime={ this.sendTime.bind(this) } user={ this.props.user } fight={ this.props.fight } timerStart={this.state.timerStart} resetTimer={this.resetTimer} toggleTimer={this.toggleTimer} timerReset={this.state.timerReset}/>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimekeeperContainer)