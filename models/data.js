const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
      
    },
    category: {
        type: String,
      required: true
    
    },
    date: {
        type: Date,
     //required: true
   
        
    }


})


const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;