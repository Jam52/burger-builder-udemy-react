import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tasets perfect!</h1>
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button clicked={props.purchaseCancelled} btnType="Danger">CANCLE</Button>
            <Button clicked={props.purchaseContinued} btnType="Success">CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;