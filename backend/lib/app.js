
const db = require('./db')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

app.use(cors())

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send([
    '<h1>ECE DevOps Chat</h1>'
  ].join(''))
})

// Channels

app.get('/channels/:username', async (req, res) => {
  const channels = await db.channels.list(req.params.username)
  res.json(channels)
})

app.post('/channels', async (req, res) => {
    const channel = await db.channels.create(req.body)
    if(channel === "Channel existant") {
        res.status(404).json(channel)
    }
    else {
        res.status(201).json(channel)
    }
})

app.get('/channels/:id', async (req, res) => {
  const channel = await db.channels.get(req.params.id)
  res.json(channel)
})

app.put('/channels/:id', async (req, res) => {
  const channel = await db.channels.update(req.body)
  res.json(channel)
})

// Messages

app.get('/channels/:id/messages', async (req, res) => {
  const messages = await db.messages.list(req.params.id)
  res.json(messages)
})

app.post('/channels/:id/messages', async (req, res) => {
  const message = await db.messages.create(req.params.id, req.body)
  res.status(201).json(message)
})

// Users

app.get('/users', async (req, res) => {
  const users = await db.users.list()
  res.json(users)
})

app.post('/users', async (req, res) => {
  const user = await db.users.create(req.body)
  if(user === "Utilisateur existant") {
      res.status(404).json(user)
  }
  else {
      res.status(201).json(user)
  }
})

app.post('/login', async (req, res) => {
    const user = await db.users.login(req.body.username, req.body.password)
    if(user === "Mauvais mot de passe" || user === "Utilisateur inexistant") {
        res.status(404).json(user)
    }
    else {
        res.status(201).json(user)
    }
})

app.get('/email/:username', async (req, res) => {
    const email = await db.users.email(req.params.username)
    res.status(201).json(email)
})

app.get('/users/:id', async (req, res) => {
  const user = await db.users.get(req.params.id)
  res.json(user)
})

app.post('/add', async (req, res) => {
  const user = await db.channels.addUser(req.body.username, req.body.channel)
  res.json(user)
})

app.put('/users/:id', async (req, res) => {
  const user = await db.users.update(req.body)
  res.json(user)
})

module.exports = app
