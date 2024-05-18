const express = require("express")
const { createServer } = require("node:http")
const { Server } = require("socket.io")

const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
})

io.on("connection", (socket) => {
  socket.on("message", ({ channel, payload }) => {
    if (channel && payload) socket.broadcast.emit(channel, payload)
  })
})

server.listen(3001, () => {
  console.log("server running at http://localhost:3001")
})