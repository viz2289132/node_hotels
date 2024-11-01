const { default: mongoose } = require('mongoose');
const Mongoose = require('mongoose');

// Define the Menu schema
const menuSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    taste: {
      type: String,
      enum: ['sweet', 'salty', 'spicy', 'sour'], // Assuming these are the possible taste options
      required: true,
    },
    is_drink: {
      type: Boolean,
      default: false,
    },
    ingredients: {
      type: [String], // Array of strings, each representing an ingredient
      default:[],
      required: true,
    },
    num_sales: {
      type: Number,
      default: 0,
      
    }
  
  
})

const MenuItem = mongoose.model('MenuItem' , menuSchema);

module.exports = MenuItem ;

