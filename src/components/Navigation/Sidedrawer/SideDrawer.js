import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Sidedrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sidedrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Closed];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.clicked}/>
                <div className={attachedClasses.join(' ')}>
                    <div className={classes.Logo}>
                        <Logo/>
                    </div>
                    
                    <nav>
                        <NavigationItems />
                    </nav>
                </div>
        </Aux>
    )
}

export default sidedrawer;