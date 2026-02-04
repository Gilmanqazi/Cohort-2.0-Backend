const express = require("express")

const app = express()
const cors = require("cors")
const path = require("path")
app.use(express.static(path.join(__dirname,"public","index.html")))




app.use(express.json())
app.use(cors())

module.exports = app