1) Agar Socket.io ko express se connect karna hai to ye code likhna padenga 

import app from "./src/app.js"
import  {createServer}  from "http"
import  {Server}   from "socket.io";


const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
});

httpServer.listen(3000,()=>{
  console.log("Server is running on port 3000")

})

2 chize yaad rakhna hai 
1) 
=> Jaha par bhoi socket io me tumhe io dikh raha honga iska matlab hai => Server
=> io =>server

2) 
=> or jaha par bhi sokcet dikh rha honga siak matlab hai ek single user
=> socket => Single user


io => Server
socket => single user


on => event ko listen karna 
emit => event ko fire karna

io.on("connection", (socket) => {
  
}); => Server par jaab naya connection banenga to uss time pe app is callback ko chalaonge 

  socket.on("message") => Jaab ek single user message ko file karenga hum uss event ko listen karenge


  socket.emit()
  socket.broadcast().emit()
  io.emit()