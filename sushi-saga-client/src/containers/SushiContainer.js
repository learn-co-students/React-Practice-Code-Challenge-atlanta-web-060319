import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from "../components/Sushi";
import EatenSushi from '../components/EatenSushi'

const SushiContainer = ({
  getEatenSushis,
  sushiToDisplay,
  handleMoreSushi,
  handleEatSushi,
  handleSushiPlateClick
}) => {
  return (
    <Fragment>
      <div className="belt">
        {getEatenSushis.map(sush => (<EatenSushi key={sush.id} sush={sush}/>))}
        {sushiToDisplay.map(sushiObj => (<Sushi key={sushiObj.id} sushiObj={sushiObj} handleEatSushi={handleEatSushi} handleSushiPlateClick={handleSushiPlateClick}/>))}
        <MoreButton handleMoreSushi={handleMoreSushi}/> 
      </div>
    </Fragment>
  )
}

export default SushiContainer