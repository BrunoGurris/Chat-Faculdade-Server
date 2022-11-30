const express = require('express');
const serverless = require("serverless-http");
const { Server } = require('socket.io');
const app = express();
const server = serverless.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`user ${socket.id} is connected.`)

    socket.on('message', data => {
        socket.broadcast.emit('message:received', data)
    })

    socket.on('disconnect', () => {
        console.log(`user ${socket.id} left.`)
    })
})

module.exports = app;
module.exports.handler = serverless(app);