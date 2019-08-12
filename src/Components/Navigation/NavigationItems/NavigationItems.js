import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Matches</NavigationItem>
        <NavigationItem link="/scores" >Scores</NavigationItem>
        <NavigationItem link="/schedule">Schedule</NavigationItem>
        <NavigationItem link="/upcoming">Upcoming</NavigationItem>
        <NavigationItem link="/search" >Find Player</NavigationItem>
    </ul>
);

export default navigationItems;