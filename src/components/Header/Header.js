import React from 'react';
import classes from "./Header.module.scss";
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import Cross from '../../sourse/Vector.png'

const Header = ({title, button}) => {

    return (
        <div className={classes.mainContainer}>
            <div className={classes.secondContainer}>
                <img className={classes.logo} src={Cross}/>
                <p>{title}</p>
            </div>
            <Link to='/logIn' className={ button ? classes.exit : classes.exitNon }><Button variant="contained" color="primary" onClick={() => localStorage.clear()}>Выход</Button></Link>
        </div>
    );
};

export default Header;