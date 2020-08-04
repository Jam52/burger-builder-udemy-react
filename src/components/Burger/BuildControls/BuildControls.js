import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
        {controls.map(item => (
        <BuildControl 
            key={item.label} 
            label={item.label}
            removed={() => props.ingredientRemoved(item.type)}
            added={() => props.ingedientAdded(item.type)}
            disabled={props.disabled[item.type]}
           />
        ))}
    </div>
    )
    
}

export default buildControls;