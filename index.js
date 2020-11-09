const app = require('express')();
const server  = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server);

app.use(cors())

const chat = []

io.on("connection", (socket) => {
  console.log('New connection!')
  socket.on('equation-submit', res => {
    if (chat.length > 9) {
      chat.shift()
    }
    chat.push(res)
    io.emit('chat-return', chat)
  })
  io.emit('chat-return', chat)

  socket.on('disconnect', res => {
    console.log('User disconnected')
    socket.emit('disconnected')
  })
})

const port = 3000;

server.listen(port, () => 
  console.log(`Listening on port ${port}...`)
)