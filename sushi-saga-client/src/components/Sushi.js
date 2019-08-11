import React, { Fragment } from 'react'

const Sushi = ({ sushiObj, handleEatSushi, handleSushiPlateClick}) => {
  return (
    <div className="sushi"
      onClick={e => handleEatSushi(sushiObj.id, sushiObj.price)}>

      <div className="plate" onClick={e => handleSushiPlateClick(sushiObj)}>
       {sushiObj.eaten ? null : <img src={sushiObj.img_url} width="100%" />}
      </div>

      <h4 className="sushi-details">
        {sushiObj.name} - ${sushiObj.price}
      </h4>
    </div>
  )
}

export default Sushi