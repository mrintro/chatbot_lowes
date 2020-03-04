const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = process.env.port || 3000;

server.listen(port, () => console.log("server running on port:" + port));


// ?????
app.get('/',(req,res)=>{
  res.render('Chat');
})

io.on("connection", socket => {
  const { id } = socket.client;
  console.log(`User connected: ${id}`);
})