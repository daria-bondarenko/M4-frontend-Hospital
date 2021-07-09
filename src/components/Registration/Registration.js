import React, {useState} from 'react';
import axios from "axios";
import {Link, useHistory} from 'react-router-dom';
import classes from './Registration.module.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Building from '../../sourse/Vector-1.png';
import Snackbar from "@material-ui/core/Snackbar";


const Registration = () => {

    let history = useHistory();
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [openSnack, setOpenSnack] = React.useState(false);
    const [textSnack, setTextSnack] = React.useState('');
    let rexexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let rexexpResult = rexexp.test(newPassword);

    const onRegClick = async (e) => {
        if (newEmail.length >= 6) {
            if (rexexpResult) {
                if (newPassword === repeatPassword) {
                    await axios.post('http://localhost:4000/createNewUser', {
                        email: newEmail,
                        password: newPassword
                    }).then(res => {
                        localStorage.setItem('token', JSON.stringify(res.data.token));
                        localStorage.setItem('email', JSON.stringify(res.data.email));
                        setTextSnack('У тебя получилось зарегаться, поздравляю!');
                        setOpenSnack(true);
                        setTimeout(() => history.replace('/tricks'), 1000);
                    })
                        .catch(err => {
                            if (err.response.status === 404) {
                                setTextSnack('Такой пользователь уже существует');
                                setOpenSnack(true);
                            }
                            if (err.response.status === 409) {
                                setTextSnack('Что-то пошло не так, попробуй еще раз :)');
                                setOpenSnack(true);
                            }
                        });
                    setNewEmail('');
                    setNewPassword('');
                    setRepeatPassword('');

                } else {
                    setTextSnack('Пароли не совпадают :(');
                    setOpenSnack(true);
                }
            } else {
                setTextSnack('В пароле должно быть не менее 8 символов, одна заглавная буква и одна прописная и не должно быть специальных символов');
                setOpenSnack(true);
            }
        } else {
            setTextSnack('Логин должен содержать минимум 6 символов :)');
            setOpenSnack(true);
        }
    }


    return (
        <div className={classes.mainContainer}>
            <img src={Building}/>
            <div className={classes.whiteContainer}>
                <form noValidate autoComplete="off">
                    <div className={classes.title}>Login</div>
                    <TextField
                        label="Login"
                        variant="outlined"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}/>
                    <div className={classes.title}>Password</div>
                    <TextField
                        label="Password"
                        type={'password'}
                        variant="outlined"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}/>
                    <div className={classes.title}>Repeat Password</div>
                    <TextField
                        label="Repeat password"
                        type={'password'}
                        variant="outlined"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}/>
                </form>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => onRegClick(e)}
                >
                    Зарегистрироваться
                </Button>
                <Link to='/logIn'>
                    Авторизоваться
                </Link>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={openSnack}
                autoHideDuration={2000}
                message={textSnack}
                onClose={() => setOpenSnack(false)}
            />
        </div>
    );
};

export default Registration;
