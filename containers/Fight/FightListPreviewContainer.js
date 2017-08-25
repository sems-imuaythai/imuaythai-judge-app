import React, { Component } from 'react';
import FightListView from '../../components/Fight/FightListView';
import { connect } from 'react-redux';

class FightListPreviewContainer extends Component {
    componentWillMount() {
        if (this.props.fights.length === 0)
            this.props.getFights();
    }
    render() {
        return (
            <FightListView fights={ this.props.fights } fetching={ this.props.fetching } isSidebar={true} />
            );
    }
}
const mapStateToProps = (state) => {
    return {
        fights: state.Fight.fightList,
        fetching: state.Fight.fetching,
    }
}

export default connect(mapStateToProps, null)(FightListPreviewContainer)