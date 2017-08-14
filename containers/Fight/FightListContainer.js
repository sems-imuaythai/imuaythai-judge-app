import React, { Component } from 'react';
import FightListView from '../../components/Fight/FightListView';
import { getFights, setFightId } from '../../actions/FightActions';
import { subscribe, sendMessage } from '../../actions/WebsocketActions';
import CenterSpinner from '../../components/Spinner/CenterSpinner';
import { connect } from 'react-redux';

class FightListContaier extends Component {
    componentWillMount() {
        if (this.props.fights.length === 0)
            this.props.getFights("A");
    }
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
        getFights: (ring) => {
            dispatch(getFights(ring))
        },
        setFightId: (id) => {
            dispatch(setFightId(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FightListContaier)