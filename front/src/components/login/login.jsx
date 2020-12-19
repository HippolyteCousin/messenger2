import React from 'react';
import loginImg from "./login.svg";
import { withRouter } from "react-router-dom";
import "./style.scss";
import { useForm } from 'react-hook-form'


const LogIn = (props) => {

    const { register, handleSubmit, errors } = useForm()

    const redirectToRegister = () => {
        props.history.push('/register');
    }
    const redirectToHome = () => {
        props.history.push('/');
    }
    const onSubmit = data => console.log(data.username);

    return (
      <form className="base-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" ref={register}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" ref={register} />
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
