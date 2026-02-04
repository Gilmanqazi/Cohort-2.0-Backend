const express = require("express")

const app = express()
const cors = require("cors")
const path = require("path")
require("dotenv").config()
app.use(express.static(path.join(__dirname, "./public")));





app.use(express.json())
app.use(cors())

module.exports = app