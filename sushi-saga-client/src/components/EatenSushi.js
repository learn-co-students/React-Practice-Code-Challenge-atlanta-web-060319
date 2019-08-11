import React from 'react'

const EatenSushi = ({sush}) => {
    return (
        <div>
            <div>  
            <img src={sush.img_url} width="100%" />
            <h4>{sush.name} - ${sush.price}</h4>
            </div>
        </div>
    )

}



export default EatenSushi