const mongoose = require('mongoose')
const { User } = require("./user");
const codeSchema = new mongoose.Schema({
    body: {
        type: String
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('code', codeSchema);