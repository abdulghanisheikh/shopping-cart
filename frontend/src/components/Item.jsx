import React from 'react';

const Item=({name,status,addToCart})=>{
    return(
        <div className="item">
            <h1>{name}</h1>
            <h2>status: {status==="active"?<span style={{color:'green'}}>{status}</span>:status}</h2>
            <p onClick={addToCart}>Add to Cart</p>
        </div>
    )
}

export default Item;