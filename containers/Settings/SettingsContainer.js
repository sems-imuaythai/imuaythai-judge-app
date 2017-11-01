import { connect } from "react-redux";
import SettingsView from "../../components/Settings/SettingsView";
import * as settingsActionCreators from "../../actions/SettingsActionCreators";
import { bindActionCreators } from "redux";

const mapStateToProps = state => {
  return {
    host: state.Settings.host,
    websocket: state.Settings.websocket,
    ring: state.Settings.ring,
    contests: state.Settings.contests,
    contest: state.Settings.contest,
    fetched: state.Settings.fetched,
    fetching: state.Settings.fetching
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(settingsActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
