const { check } = require('express-validator/check')
var mongoose    =   require("mongoose");
//var connect= require('../config/config');
mongoose.connect('mongodb://localhost:27017/demoDb',{ useNewUrlParser: true });
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = new mongoSchema({
            'firstname': {
                        type : String, 
                        required: true
                    },
            'lastname':  {
                        type: String, 
                        required: true
                    },
            'email':  {
                        type: String, 
                        required: true
                    },

            'mobile': {
                        type: Number, 
                        required: true
                    },
            
            'password':   {
                            type: String, 
                            required: true
                        }
});
// create model if not exists.
module.exports = mongoose.model('userLogin',userSchema);