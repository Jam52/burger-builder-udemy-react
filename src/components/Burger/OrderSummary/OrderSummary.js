import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  

    componentDidUpdate () {
        console.log('Order Summer Did Update');

    };

    render () {

        const ingredientSummary = Object.keys(this.props.ingredients).map(item => {
            return (<li key={item}>
                        <span style={{textTransform : 'capitalize'}}>{item}:</span> {this.props.ingredients[item]}
                    </li>)
        });
    
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingreadients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
        <p>Total Cost: {this.props.totalPrice.toFixed(2)}</p>
                <p><stong>Continue To Checkout</stong></p>
                <Button clicked={this.props.purchasedCanclled} btnType='Danger'>CANCEL</Button>
                <Button clicked={this.props.purchasedContinued} btnType='Success'>CONTINUE</Button>
            </Aux>
        )
    }
};

export default OrderSummary;