import React, { Component } from 'react';
import FightPointsView from '../../components/Fight/FightPointsView'

class FightPointsContainer extends Component {

    sendPoints(points) {
        this.props.sendMessage(points);
    }

    parseMessage(message) {
        var response = JSON.parse(message);
        var responseData = JSON.parse(response.data);

        response.data = responseData;

        return response;
    }
    render() {

        return (
            <FightPointsView parseMessage={ this.parseMessage.bind(this) } fight={ this.props.fight } />
            );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        message: state.Websocket.message
    }
}

export default FightPointsContainer;