import {connect} from 'react-redux';
import {getTavern} from '../actions';
import TavernText from '../components/tavern-text'

const mapStateToProps = state => {
  return {
    clientele:state.clientele,
    shortage:state.shortage,
    attitude:state.attitude,
    mystery:state.mystery,
    facility:state.facility,
    game:state.game,
    quality:state.quality,
    entertainment:state.entertainment,
    misfortune:state.misfortune,
    drink:state.drink,
    atmosphere:state.atmosphere,
    accomodations:state.accomodations,
    unwelcome:state.unwelcome,
    cleanliness:state.cleanliness,
    name:state.name,
    room:state.room
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick:()=>{dispatch(getTavern())}
  }
}

const ConnectedTavernText = connect(
  mapStateToProps,
  mapDispatchToProps
)(TavernText);

export default ConnectedTavernText
