//Server create karna 
//or server config karna
const express = require("express") //import express library 

const app = express()  //Server Create Karna // initialize the app

app.use(express.json())  //middleware on json

module.exports = app //export the app