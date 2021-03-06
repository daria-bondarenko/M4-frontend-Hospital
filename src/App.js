import React from "react";
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Header from "./components/Header/Header";
import Registration from "./components/Registration/Registration";
import Auth from "./components/Auth/Auth";
import TricksPage from "./components/TricksPage/TricksPage";
import './App.css';

const App = () => {

  return (
    <div className="App">
      <Switch>
        <Route path='/logIn'>
          <Header title={'Войти в систему'} button={false}/>
          <Auth/>
        </Route>
        <Route path='/signUp'>
          <Header title={'Зарегистрироваться в системе'} button={false}/>
          <Registration/>
        </Route>
        <Route path='/tricks'
               render={() => {
                 return (localStorage.getItem('token')) ? (
                   <TricksPage/>
                 ) : (
                   <Redirect from="/tricks" to="/logIn"/>
                 );
               }}
        />
        <Redirect to='/login' from='/'/>
      </Switch>
    </div>
  );
}

export default App;

