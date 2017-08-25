import { connect } from 'react-redux'
import FightPointsHistoryView from '../../components/Fight/FightPointsHistoryView'

const mapStateToProps = (state) => {
    return {
        rounds: state.PointsHistory.rounds,
        fight: state.Fight.fight
    }
}

export default connect(mapStateToProps)(FightPointsHistoryView)