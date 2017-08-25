import React, { Component } from 'react';
import { connect } from 'react-redux';
import FightMainJudgeView from '../../components/Fight/FightMainJudgeView';
import { clearMessage, notifyJuryConnected } from '../../actions/WebsocketActions';
import CenterSpinner from '../../components/Spinner/CenterSpinner';
import { parseMessage } from '../../common/helpers';
import { logout } from '../../actions/AccountActions';
import { exitFight } from '../../actions/FightActions';
import MyDrawer from '../../common/drawer';
import FightListPreviewContainer from './FightListPreviewContainer';
import FightPrematureEndPanels from '../../components/Fight/FightPrematureEndPanels'
import { bindActionCreators } from 'redux';

class MainJudgeContainer extends Component {
    constructor() {
        super()

        this.state = {
            roundId: 0,
            roundEndTime: 0,
            showPrematureEndPanels: false
        }
    }

    showPanels() {
        this.setState({
            showPrematureEndPanels: true
        })
    }
    setRound(roundId) {
        this.setState((prevState) => ({
            roundId: roundId == null ? prevState.roundId : roundId
        }))

    }

    render() {
        const parsedMessage = this.props.message ? parseMessage(this.props.message) : '';
        if (this.state.showPrematureEndPanels)
            return (<FightPrematureEndPanels fight={ this.props.fight } user={ this.props.user } sendMessage={ this.props.sendMessage } roundId={ this.state.roundId } logout={ this.props.logout }
                      sendMessage={ this.props.sendMessage } message={ parsedMessage } roundEndTime={ this.state.roundEndTime } isAdmin={ true } exitFight={ this.props.exitFight } />)
        else
            return (
                <MyDrawer content={ <FightListPreviewContainer isSidebar={true} /> }>
                  <FightMainJudgeView fight={ this.props.fight } user={ this.props.user } message={ parsedMessage } sendMessage={ this.props.sendMessage } juryConnected={ this.props.juryConnected }
                    notifyOnJuryConnected={ this.props.notifyJuryConnected } clearMessage={ this.props.clearMessage } logout={ this.props.logout } setRound={ this.setRound.bind(this) } showPanels={ this.showPanels.bind(this) }
                    exitFight={ this.props.exitFight } />
                </MyDrawer>

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
    return bindActionCreators(Object.assign({}, {
        logout
    }, {
        clearMessage
    }, {
        notifyJuryConnected
    }, {
        exitFight
    }), dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MainJudgeContainer);