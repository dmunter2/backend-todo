const express = require('express')
const helmet = require('helmet')
const authRouter = require('../auth/auth-router')
const usersRouter = require('../users/user-router')
const todoRouter = require('../todo/todo-router')
const completedRouter = require('../completed/completed-router')
const cors = require('cors')
const server = express()

server.use(express.json())

server.use(cors())
server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)
server.use('/api/todo', todoRouter)
server.use('/api/completed', completedRouter)


server.get('/', (req,res) => {
    res.send('Welcome to the Backend!')
})


module.exports = server;