const mongoose = require('mongoose')
const Schema = mongoose.Schema


const sessionSchema = new Schema({
    userId: {
        type: Number,
        require: true
    },
    duration: {
        type: Number,
        required: true
    },
    stakes: {
        type: String,
        required: true
    },
    startingStack: {
        type: Number,
        required: true
    },
    endingStack: {
        type: Number,
        required: true
    },
    handCount: {
        type: Number,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Session', sessionSchema)
