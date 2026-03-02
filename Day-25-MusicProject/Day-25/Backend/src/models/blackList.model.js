const mongoose = require("mongoose")

const blackListTokenSchema =  new mongoose.Schema({
    token: {
        type: String,
        required: [ true, "token is required for blacklisting." ],
    }
}, {
    timestamps: true
})

const blacklistModel = mongoose.model("blacklistedtokens",blackListTokenSchema)
module.exports = blacklistModel