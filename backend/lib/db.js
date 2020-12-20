
const {v4: uuid} = require('uuid')
const {clone, merge} = require('mixme')
const microtime = require('microtime')
const level = require('level')
const db = level(__dirname + '/../db')

module.exports = {
  channels: {
    addUser: async (username, chan) => {
        return new Promise( (resolve, reject) => {
          let tabUsers = []

          db.createReadStream({
            gt: "channels:",
            lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
          }).on( 'data', ({key, value}) => {
            channel = JSON.parse(value)
            channel.id = key.split(':')[1]
            if(channel.name === chan) {
                if(channel.users) {
                    tabUsers = channel.users
                }
                tabUsers.push(username)
                db.put(`channels:${channel.id}`, JSON.stringify({
                    username: channel.username,
                    name: channel.name,
                    users: tabUsers
                }))
            }
          }).on( 'error', (err) => {
            reject(err)
          }).on( 'end', () => {
            resolve(username)
          })
        })
    },
    create: async (channel) => {
      if(!channel.name) throw Error('Invalid channel')
      const id = uuid()
      await db.put(`channels:${id}`, JSON.stringify(channel))
    },
    get: async (id) => {
      if(!id) throw Error('Invalid id')
      const data = await db.get(`channels:${id}`)
      const channel = JSON.parse(data)
      return merge(channel, {id: id})
    },
    list: async (username) => {
      return new Promise( (resolve, reject) => {
        const channels = []
        let table = []
        db.createReadStream({
          gt: "channels:",
          lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          channel = JSON.parse(value)
          channel.id = key.split(':')[1]
          if(channel.username === username) {
              channels.push(channel)
          }
          else if(channel.users) {
            table = channel.users.filter((user) => user === username)
            if(table.length > 0) {
                channels.push(channel)
            }
          }
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(channels)
        })
      })
    },
    update: (id, channel) => {
      const original = store.channels[id]
      if(!original) throw Error('Unregistered channel id')
      store.channels[id] = merge(original, channel)
    },
    delete: (id, channel) => {
      const original = store.channels[id]
      if(!original) throw Error('Unregistered channel id')
      delete store.channels[id]
    }
  },
  messages: {
    create: async (channelId, message) => {
      if(!channelId) throw Error('Invalid channel')
      if(!message.author) throw Error('Invalid message')
      if(!message.content) throw Error('Invalid message')
      creation = microtime.now()
      await db.put(`messages:${channelId}:${creation}`, JSON.stringify({
        author: message.author,
        content: message.content
      }))
      return merge(message, {channelId: channelId, creation: creation})
    },
    list: async (channelId) => {
      return new Promise( (resolve, reject) => {
        const messages = []
        db.createReadStream({
          gt: `messages:${channelId}:`,
          lte: `messages:${channelId}` + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          message = JSON.parse(value)
          const [, channelId, creation] = key.split(':')
          message.channelId = channelId
          message.creation = creation
          messages.push(message)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(messages)
        })
      })
    },
  },
  users: {
      create: async (myUser) => {

        return new Promise((resolve, reject) => {
            const users = []
            db.createReadStream({
                gt: "users:",
                lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
            }).on('data', ({ key, value }) => {
                user = JSON.parse(value)
                user.id = key.split(':')[1]
                users.push(user)
            }).on('error', (err) => {
                reject(err)
            }).on('end', (err) => {
                if (users.length === 0) {
                const id = uuid()
                db.put(`users:${id}`, JSON.stringify(myUser))
                resolve(myUser)
                } else {
                    users.some((e, index) => {
                        if (myUser.username === e.username || myUser.email === e.email) {
                            resolve("Utilisateur déjà existant")
                            return true
                        }
                        else if (index + 1 === users.length) {
                            const id = uuid()
                            db.put(`users:${id}`, JSON.stringify(myUser))
                            resolve("Registered successfully")
                        }
                    })
                }
            })
        })
    },
    get: async (id) => {
      if(!id) throw Error('Invalid id')
      const data = await db.get(`users:${id}`)
      const user = JSON.parse(data)
      return merge(user, {id: id})
    },
    email: async (username) => {
      return new Promise( (resolve, reject) => {

        db.createReadStream({
          gt: "users:",
          lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          user = JSON.parse(value)

          if(user.username === username) {
              resolve(user.email)
          }
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(user)
        })
      })
    },
    list: async () => {
      return new Promise( (resolve, reject) => {
        const users = []
        db.createReadStream({
          gt: "users:",
          lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          user = JSON.parse(value)
          user.id = key.split(':')[1]
          users.push(user)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(users)
        })
      })
    },
    update: (id, user) => {
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      store.users[id] = merge(original, user)
    },
    delete: (id, user) => {
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      delete store.users[id]
    },
    login: async (username, password) => {

            return new Promise((resolve, reject) => {

                const users = []
                let total = 0

                db.createReadStream({
                    gt: "users:",
                    lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
                }).on('data', ({ key, value }) => {
                    user = JSON.parse(value)
                    user.id = key.split(':')[1]
                    users.push(user)
                }).on('error', (err) => {
                    reject(err)
                    }).on('end', (err) => {
                        users.some((e, index) => {
                            if (username === e.username && password === e.password) {
                                resolve(e)
                                return true
                            }
                            else {
                                if (username === e.username && password !== e.password) {
                                    resolve("Mauvais mot de passe")
                                    return true
                                }
                            }
                            total += 1
                            if (total === users.length) {
                                resolve("Utilisateur inexistant")
                            }
                        })
                    })
                })
            }
        },
  admin: {
    clear: async () => {
      await db.clear()
    }
  }
}
