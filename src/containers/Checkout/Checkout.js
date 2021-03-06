import React, { Component } from 'react';
import CheckoutSummery from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            meat: 1,
            cheese: 1
        },
        totalPrice: 0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search)
        console.log(query)
        let ingredients = {};
        let price = 0;
        for(let param of query.entries()){
            if(param[0] === 'price'){
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        
        }

        this.setState({ingredients: ingredients, totalPrice: price})
    }

    checkoutCancelledHandler = () => {
        console.log('purchace cancelled')
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        console.log('purchace continued')
        this.props.history.replace('/checkout/contact-data')
    }

    render () {

        return(
            <div>
                <CheckoutSummery 
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.checkoutCancelledHandler}
                    purchaseContinued={this.checkoutContinueHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
            </div>
        )
    }
}

export default Checkout;