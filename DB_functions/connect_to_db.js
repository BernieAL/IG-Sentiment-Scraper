
// require('dotenv').config()
const mongoose = require('mongoose');
// const config = require('config');
const chalk = require('chalk')
// const celebRecord = require('../DB_Schema/celebRecordSchema')

// async function connectDB (){
//     try {
//         await mongoose.connect('mongodb+srv://admin:123@cluster0.hyhot.mongodb.net/celebs?retryWrites=true&w=majority', {useNewUrlParser:true,useUnifiedTopology:true})
//         const db = mongoose.connection
//         console.log(chalk.redBright('Connection to DB successful'))
//     } catch (err) {
//         console.log(chalk.redBright('Not able to connect: ' + err))
//         return err
//     }
// }

async function connectDB(){
    await mongoose.connect('mongodb+srv://admin:123@cluster0.hyhot.mongodb.net/celebs?retryWrites=true&w=majority', {useNewUrlParser:true,useUnifiedTopology:true})
    const db = mongoose.connection
}


module.exports = {
    connectDB:connectDB
}

/* 

Rescources 
https://stackoverflow.com/questions/24621940/how-to-properly-reuse-connection-to-mongodb-across-nodejs-application-and-module
https://stackoverflow.com/questions/46539339/where-to-make-mongoose-connection-any-database-connection
https://stackoverflow.com/a/68254678

*/