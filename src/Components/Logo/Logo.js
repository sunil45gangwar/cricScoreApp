import React from 'react';

import Aux from '../../hoc/Aux/Aux';
import burgerLogo from '../../assets/images/logo.jpg';
import classes from './Logo.css';

const logo = (props) => (
    <Aux>
        <div className={classes.Logo} style={{ height: props.height }}>
            <img src={burgerLogo} alt="CricScore" />
        </div>
    </Aux>

);

export default logo;