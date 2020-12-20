import React from "react";
import registerImg from "./register.svg";
import { useHistory } from "react-router-dom";
import "./style.scss";
import { apiPostUser } from "../../utils/api_users"
import { useForm } from 'react-hook-form'

const Register = (props) => {

    const { register, handleSubmit, errors } = useForm()
    let history = useHistory()

    const redirectToLogin = () => {
        history.push('/login');
    }
    const redirectToHome = () => {
        history.push('/');
    }
    const onSubmit = (data) => apiPostUser(
        data.username, data.email, data.password, (erreur) => {
            console.log(erreur)
        });

    // const handleSubmitClick = () => {
    //     console.log("EMail: " + this.state.email);
    //     console.log("Password: " + this.state.password);
    // }

    return (
      <form className="base-container" onSubmit= { handleSubmit(onSubmit)} >
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={registerImg} alt="accueil register"/>
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text"
                     name="username"
                     placeholder="username"
                     ref={register({ required: true, maxLength: 30 })} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email"
                     name="email"
                     placeholder="email"
                     ref={register({ required: true, maxLength: 30 })}
                     />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password"
                     name="password"
                     placeholder="password"
                     ref={register({ required: true, maxLength: 30 })}
                     />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="submit"
                  className="btn"
                  //onClick={handleSubmitClick}
                  >
            Register
          </button>
        </div>
        <div className="login-from-register-button">
            <span>Already registered ? </span>
            <span className="login-message" onClick={() => redirectToLogin()}>Login</span>
        </div>
        <div className="home-button">
            <span className="home-message" onClick={() => redirectToHome()}>Home</span>
        </div>
      </form>
    );
}


export default Register;
