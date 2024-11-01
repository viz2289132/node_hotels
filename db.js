const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/hotels';

mongoose.connect(mongoURL , {
    useNewUrlParser : true ,
    useUnifiedTopology : true 
})

const db = mongoose.connection;

//define event listner for database connection

db.on('connected' , ()=>{
    console.log('connected to mongodb server');
})

db.on('disconnected' ,()=>{
    console.log('MOngoDB disonnected');
} )

db.on('error' , (err)=>{
  console.log('Mongodb connection error :' ,err);
})

module.exports =db ;