import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/Sidedrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosed = () => {
        this.setState({showSideDrawer : false})
    }

    openSidebarHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render () {
        return (
            <Aux>
                <Toolbar openSidebar={this.openSidebarHandler}/>
                <SideDrawer open={this.state.showSideDrawer} clicked={this.sideDrawerClosed}/>
                <main className={classes.Content}> 
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};


export default Layout;