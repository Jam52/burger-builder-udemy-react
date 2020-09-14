import React from 'react'
import classses from './Order.module.css';

const order = (props) => {

    let ingredients = []
    for(let ing in props.ingredients){
        ingredients.push({name: ing, amount: props.ingredients[ing]})
    }
    console.log(props.ingredients)
    console.log(ingredients)

    return (
        <div className={classses.Order}>
             <p>Ingredients:</p>{ingredients.map(ing => {
                 return <span>{`${ing.name}: ${ing.amount}`}</span>
             })}
            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default order;