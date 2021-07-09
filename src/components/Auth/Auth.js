import React, {useState} from 'react';
import classes from './Auth.module.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link, useHistory} from "react-router-dom";
import Building from '../../sourse/Vector-1.png'
import Snackbar from '@material-ui/core/Snackbar';
import axios from "axios";

const Auth = () => {

    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSnack, setOpenSnack] = React.useState(false);
    const [textSnack, setTextSnack] = React.useState('');

    const onLogClick = async () => {

        if (email.length >= 6 && password.length >= 8) {
        await axios.post('http://localhost:4000/authUser', {
            email: email,
            password: password
        }).then(res => {
            localStorage.setItem('token', JSON.stringify(res.data.token));
            localStorage.setItem('email', JSON.stringify(res.data.email));
            setTextSnack('У тебя получилось залогиниться, поздравляю!');
            setOpenSnack(true);
        }).then(res => {
            setTimeout(() => history.replace('/tricks'), 1000 )
        })

            .catch(err => {
                if (err.response.status === 404) {
                    setTextSnack('Такой пользователь не существует');
                    setOpenSnack(true);
                }
                if (err.response.status === 401) {
                    setTextSnack('Пароль не верный :(');
                    setOpenSnack(true);
                }
            });
        setEmail('');
        setPassword('');
        } else {
            setTextSnack('Проверьте введенные данные! Данные не верны');
            setOpenSnack(true);
        }
    }


    return (
        <div className={classes.mainContainer}>
            <img src={Building}/>
            <div className={classes.whiteContainer}>
                <form noValidate autoComplete="off" >

                    <div className={classes.title}>Login</div>
                    <TextField
                        label="Login"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    <div className={classes.title}>Password</div>
                    <TextField
                        label="Password"
                        type={'password'}
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </form>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onLogClick()}>
                    Войти
                </Button>
                <Link to='/signUp'>
                    Зарегистрироваться
                </Link>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={openSnack}
                autoHideDuration={1600}
                message={textSnack}
                onClose={() => setOpenSnack(false)}
        />
        </div>
    );
};

export default Auth;
