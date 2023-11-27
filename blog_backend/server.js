import express from 'express'
import mongoose from 'mongoose'

const server = express()
let PORT = 3000

mongoose.connect()

server.listen(PORT, () => { console.log('Listening on por -> ' + PORT) })