import React from 'react';
import classes from './Menu.module.css';

const menu = (props) => {

    return (
        <div className={classes.Menu} onClick={props.clicked}>
            <div className={classes.Top}/>
            <div className={classes.Middle}/>
            <div className={classes.Bottom}/>
        </div>
    )
}

export default menu;