const mongoose = require('mongoose')

const celebRecord = new mongoose.Schema({
    Name: {
        type:String,
        required:true,
    },
    Handle:{
        type:String,
        default: 'test'
    },
    PositiveSentimentRating:{
        type:Number,
        required:true,
        default:0,
    },
    NegativeSentimentRating:{
        type:Number,
        required:true,
        default:0,
    },
    LastPost:{
        type:String,
        required:true,
        default:'0'
    }
})

module.exports = mongoose.model('celebRecord',celebRecord)