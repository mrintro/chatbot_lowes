const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = process.env.port || 3000;
const path = require("path")

server.listen(port, () => console.log("server running on port:" + port));


// ?????
app.get('/',(req,res)=>{
  let pa = path.join(__dirname, '../client','Chatscreen.html');
  res.sendFile(pa);
  console.log("file sent");
})

const users={};

io.on("connection", socket => {
  const { id } = socket.id;
  console.log("user connected");
  // socket.on('new-user', username => {
  //   console.log("event from server!!");
    // users[{id}] = username;
    // socket.broadcast.emit('user-connected: event from server', username);
    socket.on('send message', msg =>{
      console.log(msg);
      socket.emit('receive message', {
        username: users[{id}],
        msg: msg
      });
    });
  

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[{id}]);
    delete users[{id}];
  });
});