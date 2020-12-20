import React from 'react';
import loginImg from "./login.svg";
import { useHistory } from "react-router-dom";
import "./style.scss";
import { useForm } from 'react-hook-form'
import { apiLogin } from "../../utils/api_users"

const LogIn = (props) => {

    const { register, handleSubmit, errors } = useForm()
    let history = useHistory()

    const redirectToRegister = () => {
        history.push('/register');
    }
    const redirectToHome = () => {
        history.push('/');
    }
    const onSubmit = (data) => {
        apiLogin(data.username, data.password,
            (loggedIn) => {
                history.push({
                    pathname: '/home',
                    search: '?id=' + data.username})
            },
            (erreur) => {
                console.log(erreur)
            })
    }

    return (
      <form className="base-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="accueil login"/>
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" ref={register({ required: true, maxLength: 30 })}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" ref={register({ required: true, maxLength: 30 })} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="submit" className="btn">
            Login
          </button>
        </div>
        <div className="register-from-login-button">
            <span>Dont have an account ? </span>
            <span className="register-message" onClick={() => redirectToRegister()}>Register</span>
        </div>
        <div className="home-button">
            <span className="home-message" onClick={() => redirectToHome()}>Home</span>
        </div>
      </form>
    );
}

export default LogIn;
