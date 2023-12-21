const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

// import express from 'express'
// import config from 'config'
// import mongoose from 'mongoose'
// import path from 


// const fileURLToPath = require('url')
// const dirname = require('path')

// const filename = fileURLToPath(import.meta.url)
// const _dirname = dirname(filename)

const fileURLToPath = require('url').fileURLToPath;
const dirname = require('path').dirname;

const filename = fileURLToPath(require('url').pathToFileURL(__filename));
const _dirname = dirname(filename);

const app = express()
app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t/', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(_dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'))
    })
}
const PORT = config.get("port") || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {})        
        app.listen(PORT, () => console.log(`App.js has been started on port ${PORT}`))
    } catch (e) {
        console.log(`Server error`, e.message)
        process.exit(1)
    }
}
start()