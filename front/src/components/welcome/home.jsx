import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { apiCreateChannel, apiGetChannel, apiGetEmail } from "../../utils/api_users"
import { useForm } from 'react-hook-form'
import Gravatar from 'react-gravatar'

const url = require('url')
const qs = require('querystring')

const Home = (props) => {
    const user = (qs.parse(url.parse(window.location.href).query)['id'])

    const { register, handleSubmit, errors } = useForm()
    const [myErrors, setErrors] = useState('')
    const [chan, setChannels] = useState([]);
    const [email, setEmail] = useState([]);
    let history = useHistory()

    const logOut = () => {
        history.push('/');
    }

    const onSubmit = (data) => apiCreateChannel(
        user, data.channel, (erreur) => {
            setErrors(erreur)
        });

    const printChannels = () => {
        apiGetChannel(user, (channels) => {
            setChannels(channels)
        })
    }
    useEffect(() => {
        apiGetEmail(user, (reponse) => {
            setEmail(reponse)

        })
        printChannels()
    }, [])

    const redirectToChan = (data) => {
        history.push("channel?id=" + user + "&chan=" + data);
    }

    return (
        <form className="base-container" onSubmit= { handleSubmit(onSubmit)} >
            <div className="header">
                <div>
                    Bienvenue, {user} !
                </div>
                <Gravatar className="avatar"
                          email={email}
                          default="monsterid"
                          />
            </div>
            <div className="content">
                <div className="form-group">
                  <input type="text"
                         name="channel"
                         placeholder="channel"
                         ref={register({ required: true, maxLength: 30 })} />
                </div>
              <button type="submit"
                      className="btn">
                Create a channel
              </button>
              <div className="titre">
                Liste de vos channels :
              </div>
              <div className="chan">
                {chan.map((i) =>
                    <div className="channels-button" onClick={() => redirectToChan(i.name)}> {i.name} </div>)}
              </div>
            {myErrors &&
                <div className="alert-erreur" role="alert">
                    {myErrors}
                </div>
            }
            <div className="log-out-button">
                <span className="register-message" onClick={() => logOut()}>Log Out</span>
            </div>
            </div>
        </form>
    )
}


export default Home;
