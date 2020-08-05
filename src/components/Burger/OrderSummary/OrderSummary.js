import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(item => {
        return (<li key={item}>
                    <span style={{textTransform : 'capitalize'}}>{item}:</span> {props.ingredients[item]}
                </li>)
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingreadients:</p>
            <ul>
                {ingredientSummary}
            </ul>
    <p>Total Cost: {props.totalPrice.toFixed(2)}</p>
            <p><stong>Continue To Checkout</stong></p>
            <Button clicked={props.purchasedCanclled} btnType='Danger'>CANCEL</Button>
            <Button clicked={props.purchasedContinued} btnType='Success'>CONTINUE</Button>
        </Aux>

    )
};

export default orderSummary;