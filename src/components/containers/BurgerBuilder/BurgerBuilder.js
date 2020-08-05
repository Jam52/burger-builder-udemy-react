import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls'
import Modal from '../../UI/Modal/Modal.js';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.75,
    bacon: 1,
    meat: 2
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState = (ingredients) => {
        
        const sum = [...Object.values(ingredients)].reduce((sum, el) => sum + el, 0);
        this.setState({purchaseable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngrdients = {
            ...this.state.ingredients
        };
        updatedIngrdients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngrdients})
        this.updatePurchaseState(updatedIngrdients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
    
        if(oldCount <= 0) {
            return;
        }
        let updatedCount = oldCount - 1;
        const updatedIngrdients = {
            ...this.state.ingredients
        }
        updatedIngrdients[type] = updatedCount;
        const priceSubtraction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtraction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngrdients});
        this.updatePurchaseState(updatedIngrdients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancleHandler = () => {
        this.setState({purchasing: false});
    }

    puchaseContinueHandler = () => {
        alert('You continue!')
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancleHandler}>
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    purchasedCanclled={this.purchaseCancleHandler}
                    purchasedContinued={this.puchaseContinueHandler}
                    totalPrice={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingedientAdded={this.addIngredientHandler} 
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchaseable={this.state.purchaseable}
                ordered={this.purchaseHandler}/>
                
            </Aux>
        );
    }
}


export default BurgerBuilder;