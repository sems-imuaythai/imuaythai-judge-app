import React, { Component } from 'react';
import FightListView from '../../components/Fight/FightListView';
import {prefightLogout} from '../../actions/AccountActions';
import { getFights, setFightId } from '../../actions/FightActions';
import { subscribe, sendMessage } from '../../actions/WebsocketActions';
import CenterSpinner from '../../components/Spinner/CenterSpinner';
import { connect } from 'react-redux';

class FightListContaier extends Component {
    componentWillMount() {
        if (this.props.fights.length === 0)
            this.props.getFights();
    }
    render() {
        return (
            <FightListView fights={ this.props.fights } fetching={ this.props.fetching } setFightId={ this.props.setFightId } isSidebar={false} logout={this.props.logout} />
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
        setFightId: (id) => {
            dispatch(setFightId(id))
        },
        logout: () => {
            dispatch(prefightLogout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FightListContaier)