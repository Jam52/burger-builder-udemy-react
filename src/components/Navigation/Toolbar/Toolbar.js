import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from '../Menu/Menu';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Logo height="80%" />
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
        <Menu clicked={props.openSidebar}/>
        
    </header>
)

export default toolbar;
