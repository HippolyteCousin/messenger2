const MY_HEADERS = { 'Accept': 'application/json', 'Content-Type': 'application/json' }

export const apiGetChannel = async(username, channels) => {
    try {
        const readValues = await fetch(`http://localhost:3001/channels/${username}`, { headers: MY_HEADERS, mode: 'cors', method: 'GET' })

        if(readValues.ok) {
            const res = await readValues.json()
            channels(res)
        }
    }
    catch (error) {
        console.log(error)
    }
}

export const apiCreateChannel = async(username, channel, error) => {
    try {
        const readValues = await fetch(`http://localhost:3001/channels`, { headers: MY_HEADERS, mode: 'cors', method: 'POST',
                                                                           body: JSON.stringify({
                                                                               username: username,
                                                                               name: channel
                                                                           })})

        if(readValues.ok) {
            const res = await readValues.json()
            console.log(res)
        }
    }
    catch (error) {
        console.log(error)
    }
}

export const apiPostUser = async(username, email, password, succes, erreur) => {
    try {
        const postValues = await fetch(`http://localhost:3001/users`, { headers: MY_HEADERS, mode: 'cors', method: 'POST',
                                                                        body: JSON.stringify({
                                                                            username: username,
                                                                            email: email,
                                                                            password: password}) })

        if(postValues.ok) {
            const res = await postValues.json()
            succes(res)
        }
        else {
            const res = await postValues.json()
            erreur(res)
        }
    }
    catch (error) {
        console.log(error)
    }
}


export const apiLogin = async(username, password, loggedIn, erreur) => {
    try {
        const postValues = await fetch(`http://localhost:3001/login`, { headers: MY_HEADERS, mode: 'cors', method: 'POST',
                                                                        body: JSON.stringify({
                                                                            username: username,
                                                                            password: password}) })

        if(postValues.ok) {
            const res = await postValues.json()
            loggedIn(res)
        }
        else {
            const res = await postValues.json()
            erreur(res)
        }
    }
    catch (error) {
        console.log(error)
    }
}

export const apiGetEmail = async(username, reponse, erreur) => {
    try {
        const postValues = await fetch(`http://localhost:3001/email/${username}`, { headers: MY_HEADERS, mode: 'cors', method: 'GET'})

        if(postValues.ok) {
            const res = await postValues.json()
            reponse(res)
        }
        else {
            const res = await postValues.json()
            erreur(res)
        }
    }
    catch (error) {
        console.log(error)
    }
}

export const apiAddUser = async(username, chan, succes, err) => {
    try {
        const postValues = await fetch(`http://localhost:3001/add/`, { headers: MY_HEADERS, mode: 'cors', method: 'POST',
                                                                       body: JSON.stringify({
                                                                            username: username,
                                                                            channel: chan
                                                                            })})

        if(postValues.ok) {
            const res = await postValues.json()
            succes(res)
        }
        else {
            const res = await postValues.json()
            err(res)
        }
    }
    catch (error) {
        console.log(error)
    }
}
