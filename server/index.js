const express = require("express")
const cors = require("cors")
const { createServer } = require("node:http")
const { Server } = require("socket.io")

const WHITELIST = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://chat-app-05192024.vercel.app/",
]
const port = process.env.PORT || 3000
const app = express()

app.use(
  cors({
    origin: WHITELIST,
  })
)

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: WHITELIST,
  },
})

io.on("connection", (socket) => {
  console.log("someone connected")

  socket.on("message", ({ channel, payload }) => {
    console.log(payload)

    if (channel && payload) io.emit(channel, payload)
  })
})

server.listen(port, () => {
  console.log("server running")
})
