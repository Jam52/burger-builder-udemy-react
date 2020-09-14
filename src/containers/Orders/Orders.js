import React, { Component } from 'react';
import Order from './Order/Order';
import classes from './Orders.module.css';
import axios from '../../axios-orders';


class Orders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            loading: true
        }
    }

    componentDidMount() {
        console.log('[orders]componentDidMount')
        axios.get('/orders.json')
        .then(response => {
            console.log(response.data)
            let fetchOrders = []
            for(let key in response.data) {
                fetchOrders.push({
                    ...response.data[key],
                    id: key
                })
            }
            this.setState({loading: false})
            this.setState({orders: fetchOrders})
        })
        .catch(error => {
            console.log('[orders]componentDidMount' + error)
            this.setState({loading: false})
        })
    }

    componentWillUnmount() {
        console.log('[Orders]componentWillUnmount')
    }
    
    render () {
        return(
            <div className={classes.Orders}>
                {this.state.orders.map(item => {
                    return <Order ingredients={item.ingredients} price={+item.price} id={item.id}/>
                })}
            </div>
        );
    }
}

export default Orders;