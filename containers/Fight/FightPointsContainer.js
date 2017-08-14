import React, { Component } from 'react';
import FightPointsView from '../../components/Fight/FightPointsView';
import * as requestType from '../../containers/Fight/requestTypes';
import { logout } from '../../actions/AccountActions';
import { connect } from 'react-redux';


class FightPointsContainer extends Component {
    constructor() {
        super();
        this.state = {
            fightStarted: false
        }
        this.parseMessage = this.parseMessage.bind(this);
    }

    sendPoints(points) {
        this.props.sendMessage(points);
    }

    parseMessage(message) {
        var responseData = null;
        var response = JSON.parse(message);

        try {
            responseData = JSON.parse(response.data);
        } catch (err) {
            //ignore
        }

        response.data = responseData;

        return response;
    }
    render() {
        if (this.props.message) {
            var request = this.parseMessage(this.props.message);
            switch (request.requestType) {
                case requestType.AcceptPoints:
                    alert("Points accepteed");
                    this.setState({clearState: true});
                    break;
                case requestType.StartRound:
                    this.setState({
                        fightStarted: true
                    });
                    break;
                case requestType.ShowPrematureEndPanel:
                    //TODO premature end panel
                    break;

                case requestType.EndRound:
                    this.setState({
                        fightStarted: false
                    });
                    break;
                case requestType.SendPoints:
                    alert("Point has been sent. Wait for main jury approval");
                    break;
                case requestType.EndFight:
                    this.props.logout();
                    break;

                default:
                    break;
            }
        }
        return (
            <FightPointsView sendPoints={ this.sendPoints.bind(this) } fight={ this.props.fight } user={this.props.user} />
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
            dispatch(actionCreator)
        }
    }
}
export default connect(mapStateToProps, null)(FightPointsContainer);