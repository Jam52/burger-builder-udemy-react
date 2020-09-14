import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.75,
    bacon: 1,
    meat: 2
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        console.log('[BurgerBuilder]' + this.state.ingredients)
        if(this.state.ingredients === null){
            axios.get('https://reactburgercourse.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            }).catch(error => {
                this.setState({error: true})
            })
        }
       
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
        // alert('You continue!')
        // this.setState({loading: true})
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: "Jamie", 
        //         address: {
        //             street: "Some street", 
        //             zipCode: "KB983", 
        //             country: 'Canada'
        //         }, 
        //         email: "jamie@email.com", 
        //         deliveryMethod: "fastest"}
        // }
        // axios.post('/orders.json', order)
        //     .then (response => {
        //         console.log('Order Placed: ', response)
        //         this.setState({loading: false});
        //         this.setState({purchasing: false});

        //     })
        //     .catch(error => {
        //         console.log('Order Placed ERROR:', error)
        //         this.setState({loading: false})

        //     })
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummery = null;

        let burger = this.state.error ? <p>Cannot Connect to Server</p> : <Spinner/>

        if(this.state.ingredients) {
                burger = (
                    <Aux>
                        <Burger ingredients={this.state.ingredients}/>
                        <BuildControls 
                        ingedientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}/>
                    </Aux>
                )
                orderSummery = (
                    <OrderSummary 
                            ingredients={this.state.ingredients}
                            purchasedCanclled={this.purchaseCancleHandler}
                            purchasedContinued={this.puchaseContinueHandler}
                            totalPrice={this.state.totalPrice}/>
                )
            }

            if(this.state.loading) {
                orderSummery = <Spinner />
            }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancleHandler}>
                   {orderSummery}
                </Modal>
                {burger}
            </Aux>
        );
    }
}


export default BurgerBuilder;