import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { apiCreateChannel, apiGetChannel, apiAddUser } from "../../utils/api_users"
import { useForm } from 'react-hook-form'

const url = require('url')
const qs = require('querystring')
const myMessages = [{
    "content": "Bienvenue dans le channel",
    "auteur": "Bot"
    }]

const Channel = (props) => {
    const user = (qs.parse(url.parse(window.location.href).query)['id'])
    const chan = (qs.parse(url.parse(window.location.href).query)['chan'])

    const { register, handleSubmit, errors } = useForm()
    const [myErrors, setErrors] = useState('')
    const [message, setMessage] = useState(myMessages)

    let history = useHistory()

    const redirectToHome = (data) => {
        history.push("home?id=" + user);
    }
    const onSubmit = (data) => {
        apiAddUser(data.username, chan,
            (succes) => {
                console.log("succes")
            },
            (erreur) => {
                setErrors(erreur)
        })
    }

    const sendMessage = (content) => {
        const msg = {
            "content": content,
            "auteur": user
        }
        setMessage(message => [...message, msg])
    }


    return (
        <form className="base-container" onSubmit={handleSubmit(onSubmit)} >
            <div className="header">
                {user} est actuellement sur {chan}
            </div>
            <div className="form-group">
              <input type="text"
                     name="username"
                     placeholder="username"
                     ref={register({ required: true, maxLength: 30 })} />
            </div>
              <button type="submit"
                      className="btn">
                Ajouter un user au channel
              </button>
            <div>
                {message.map((i) =>
                    <div className="affichage-messages"> {i.auteur} : {i.content} </div>)}
                    <input classeName="saisie"
                           type="text"
                           name="message"
                           placeholder="message"
                           onKeyPress = {e => e.key === 'Enter'? sendMessage(e.target.value):null}/>
                <div className="home-button">
                    <span className="register-message" onClick={() => redirectToHome()}>Home</span>
                </div>
            </div>
        </form>
    )
}


export default Channel;
