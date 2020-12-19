import React from "react";
import registerImg from "./register.svg";
import { withRouter } from "react-router-dom";
import "./style.scss";

const Register = (props) => {

    const redirectToLogin = () => {
        props.history.push('/login');
    }
    const redirectToHome = () => {
        props.history.push('/');
    }

    // const handleSubmitClick = () => {
    //     console.log("EMail: " + this.state.email);
    //     console.log("Password: " + this.state.password);
    // }

    return (
      <div className="base-container" >
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={registerImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text"
                     name="username"
                     placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email"
                     name="email"
                     placeholder="email"
                     //valueLink={this.linkState('email')}
                     />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password"
                     name="password"
                     placeholder="password"
                     //valueLink={this.linkState('password')}
                     />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button"
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
      </div>
    );
}


export default Register;
