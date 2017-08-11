import React, { Component } from 'react';
import FightListView from '../../components/Fight/FightListView';
import { getFights, setFightId } from '../../actions/FightActions';
import { subscribe, sendMessage } from '../../actions/WebsocketActions';
import CenterSpinner from '../../components/Spinner/CenterSpinner';
import { connect } from 'react-redux';

class FightListContaier extends Component {
    render() {

        return (
            <FightListView fights={ this.props.fights } fetching={ this.props.fetching } setFightId={ this.props.setFightId } />
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FightListContaier)