import React from "react";
import { withRouter } from "react-router-dom";

function welcome(props) {

    const redirectToLogin = () => {
        props.history.push('/login');
    }
    const redirectToRegister = () => {
        props.history.push('/register');
    }

    return (
        <div className="base-container" >
            <div className="header">Welcome</div>
            <div className="footer">
            <div className="login-from-home-button">
                <span>Déjà membre ? </span>
                <span className="register-message" onClick={() => redirectToLogin()}>Login</span>
            </div>
            </div>
            <div className="footer">
            <div className="register-from-home-button">
                <span>Don't have an account ? </span>
                <span className="register-message" onClick={() => redirectToRegister()}>Register</span>
            </div>
            </div>
        </div>
    )
}


export default withRouter(welcome);
