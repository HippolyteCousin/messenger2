import React from "react";
import { useHistory } from "react-router-dom";
import { apiCreateChannel } from "../../utils/api_users"
import { useForm } from 'react-hook-form'

const url = require('url')
const qs = require('querystring')

const Home = (props) => {
    const user = (qs.parse(url.parse(window.location.href).query)['id'])

    const { register, handleSubmit, errors } = useForm()
    let history = useHistory()

    const logOut = () => {
        history.push('/');
    }

    const callApi = () => {
        apiCreateChannel(user,
            (erreur) => {
                console.log(erreur)
            })
    }

    return (
        <div className="base-container" >
            <div className="header">Bienvenue retour, {user} !</div>
            <div className="content">
            </div>
            <div className="footer" >
              <button onClick={() => callApi()}>
                Create a channel
              </button>
            </div>
            <div className="log-out-button">
                <span className="register-message" onClick={() => logOut()}>Log Out</span>
            </div>
        </div>
    )
}


export default Home;
