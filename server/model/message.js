const { check } = require('express-validator/check')
var mongoose    =   require("mongoose");
//var connect= require('../config/config');
mongoose.connect('mongodb://localhost:27017/demoDb',{ useNewUrlParser: true });
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var messageSchema  = new mongoSchema({
         'userid':{
                 type: String,
                    required:true
                },
        'username':{
                    type: String,
                    required:true
                }, 
        'message':{
                        type : String, 
                        required: true
                 },
        'date':{
                        type: Date, 
                        required: true
                }
        
                 
});
// create model if not exists.
module.exports = mongoose.model('userMessage',messageSchema);