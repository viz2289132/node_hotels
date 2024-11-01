// Import Mongoose
const mongoose = require('mongoose');

// Define the Person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  work:{
    type: String,
    enum :['chef' , 'waiter' , 'manager'],
    required : true

  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
    },
  address: {
    type: String,
    required: true,
    
  },
  salary: {
    type: Number,
   
  },
});

// Create a model from the schema
const Person = mongoose.model('Person', personSchema);

// Export the model
module.exports = Person;
