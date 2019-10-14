const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Todo = require('./models/data');

const app = express();
// Setting up the View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
var contactList = [];
// Getting value from the database
app.get('/', function(req, res){
    Todo.find({}, function(err, todos){
        if(err){
            console.log("error in fetching Todo List Item from db");
            return;
        }
        return res.render('home',{
            title: "TODO APP",
             item_list: todos,   
        });

    }); 
});
//Controller Used for Sending data from web Page to database
app.post('/create-todo-item', function(req, res){
    Todo.create({
        name: req.body.name,
        category: req.body.category,
        date:req.body.date
    }, function(err, newitem){
        if(err){console.log('Error in creating a DataItem!')
            return;
        }
           //console.log('***', newitem);
            return res.redirect('back');
    });
});
// Listen the Server
app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Server is running on Port', port);
});
// Deleting Contact From the database
app.get('/delete-todolist-item/', function(req, res){
    console.log(req.query);
    let id=req.query.id
    Todo.findByIdAndDelete(id,function(err){
        if(err)
        {
            console.log('error in deleting in database');
            return;
        }
        return res.redirect('back');

    });
});
