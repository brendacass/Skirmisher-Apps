import React from 'react'
import PropTypes from 'prop-types'

const TavernText = ({
  onClick,
  clientele,
  shortage,
  attitude,
  mystery,
  facility,
  game,
  quality,
  entertainment,
  misfortune,
  drink,
  atmosphere,
  accomodations,
  unwelcome,
  cleanliness,
  name,
  room
}) => (
  <div>
        <h3>{name}</h3>
        <br/>
        <blockquote>
            <span className="label">Clientele:</span> {clientele}<br/>
            <span className="label">Shortages:</span> {shortage}<br/>
            <span className="label">Barkeep's Attitude:</span>  {attitude}<br/>
            <span className="label">Mysterious Person Drinking Alone in the Corner:</span> {mystery}<br/>
            <span className="label">Facilities:</span> {cleanliness} {facility}<br/>
            <span className="label">Games:</span> {game}<br/>
            <span className="label">Live Entertainment:</span> {quality} {entertainment}<br/>
            <span className="label">Drink Too Much and You're Bound to Get:</span> {misfortune}<br/>
            <span className="label">House Drink:</span> The {drink}<br/>
            <span className="label">Atmosphere:</span> {atmosphere}<br/>
            <span className="label">Sleeping Accomodations:</span> {accomodations} {room}<br/>
            <span className="label">This Tavern doesn't Welcome:</span> {unwelcome}<br/><br/>

            <span className="disclaimer">Note: It is entirely possible that the clientele and unwelcome patrons fields can yield the same result (e.g., a tavern that caters to Orcs that
does not welcome Orcs). This is an entirely intentional feature that can lead to all sorts of fascinating and farcical adventures. Imagine a bartender that wants to attract humans, but is stuck putting up with unwanted Dwarves instead.</span>
        </blockquote>
        <button className="new-tavern-button" onClick={e=>{
            e.preventDefault();
            onClick();
          }}>New Tavern!</button>
    </div>
)

TavernText.propTypes = {
  onClick: PropTypes.func.isRequired,
  clientele: PropTypes.string.isRequired,
  shortage: PropTypes.string.isRequired,
  attitude: PropTypes.string.isRequired,
  mystery: PropTypes.string.isRequired,
  facility: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  quality: PropTypes.string.isRequired,
  entertainment: PropTypes.string.isRequired,
  misfortune: PropTypes.string.isRequired,
  drink: PropTypes.string.isRequired,
  atmosphere: PropTypes.string.isRequired,
  accomodations: PropTypes.string.isRequired,
  unwelcome: PropTypes.string.isRequired,
  cleanliness: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired
}

export default TavernText
