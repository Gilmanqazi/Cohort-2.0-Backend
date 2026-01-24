const express = require("express")
const app = express() // Server instance create karna

app.get('/home', (rej,res)=>{
  res.send("Gilman Quazi Mujahed")
})

app.listen(24) // Server start karna
