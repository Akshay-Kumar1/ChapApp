var express = require('express');
var router = express.Router();
var app = express();
var users = require('../controller/ucontroller')
var auth=require('../router/authRouter.js')
const { check, validationResult } = require('express-validator/check');

var usermod = require('../model/users');
// var validator=require('express-validator');
var db = new usermod();
var response = {};
router.use('/auth', auth);    
// app.use('/', router);
router.post("/login", users.login);
router.post('/register', [
    check('firstname').isLength({ min: 3 }).isAlpha(),
    check('lastname').isLength({ min: 3 }).isAlpha(),
    check('mobile').isMobilePhone("en-IN"),
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    db.firstname = req.body.firstname;
    db.lastname = req.body.lastname;
    db.mobile = req.body.mobile;
    db.email = req.body.email;
    db.password = require('crypto')
        .createHash('sha1')
        .update(req.body.password)
        .digest('base64');
    //var mail = req.body.email;
    usermod.find({ "email":db.email }, function (err, data, ) {
        if (data.length > 0 ) {
            response = {
                "error": false,
                "message": "User Email id already exists ",
            }
            return res.status(404).send(response);
            
        }
        if (err) {
            response = {
                "error": true,
                "message": "There was a error fetching the data "
            }
            return res.status(404).send(response);
        }
        else {
            // console.log(db.email)
            db.save(function (err) {
                if (err) {
                    response = {
                        "error": true,
                        "message": "There was a error storing the data "
                    }
                }
                else {
 
                    response = { "error": false, "message": "Data successfully added to the database  "                }
                }
                return res.status(202).send(response);
            });
        }
    });
    
});
app.use('/', router);

module.exports = router;