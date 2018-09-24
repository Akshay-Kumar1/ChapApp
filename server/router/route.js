var express= require('express');
var router=express.Router();
var app = express();
var users=require('../controller/controller')

const { check, validationResult } = require('express-validator/check');

var usermod = require('../model/users.js');
// var validator=require('express-validator');
var db = new usermod();
var response = {};

router.post("/login", users.login);
router.post('/register', [
    check('firstname').isLength({ min: 3 }),
    check('lastname').isLength({ min: 3 }),
    check('mobile').isNumeric().isLength({min:10,max:10}),
    check('email').isEmail(),
    check('password').isLength({min:5})
  ], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

db.firstname = req.body.firstname;
db.lastname = req.body.lastname;
db.mobile = req.body.mobile;

db.email = req.body.email;
// Hash the password using SHA1 algorithm.
db.password = require('crypto')
    .createHash('sha1')
    .update(req.body.password)
    .digest('base64');
    var mail = req.body.email;
    //check(mail).isEmail();
    usermod.find({ "email": mail }, function (err, data) {
        if (data.length > 0) {
            response = {
                "error": false,
                "message": "email is already registered",
            }
            return res.status(404).send(response);
        }
        if (err) {
            response = {
                "error": true,
                "message": "error retrieving data"
            }
            return res.status(404).send(response);
        }
        else {
            db.save(function (err) {
                if (err) {
                    response = {
                        "error": true,
                        "message": "error storing data"
                    }
                }
                else {
                    response = { "error": false, "message": "data added" }
                }
                return res.status(202).send(response);
            });
        }
    });

   });


app.use('/', router);
module.exports=router;