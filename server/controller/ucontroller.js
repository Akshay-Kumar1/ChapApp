// const { check } = require('express-validator/check')
// exports.registration = function (req, res) {

//     var usermod = require('../model/users');
//     var db = new usermod();
//     var response = {};

//     db.email = req.body.email;
//     // Hash the password using SHA1 algorithm.
//     db.password = require('crypto')
//         .createHash('sha1')
//         .update(req.body.password)
//         .digest('base64');
//     db.firstname=req.body.firstname
//     db.lastname=req.body.lastname
//     db.mobile=req.body.mobile
//     var mail = req.body.email;
//     check(mail).isEmail();
//     usermod.find({ "email": mail }, function (err, data) {
//         if (data.length > 0) {
//             response = {
//                 "error": false,
//                 "message": "email is already registered",
//             }
//             return res.status(404).send(response);
//         }
//         if (err) {
//             response = {
//                 "error": true,
//                 "message": "error retrieving data"
//             }
//             return res.status(404).send(response);
//         }
//         else {
//             db.save(function (err) {
//                 if (err) {
//                     response = {
//                         "error": true,
//                         "message": "error storing data"
//                     }
//                 }
//                 else {
//                     response = { "error": false, "message": "data added in postman" }
//                 }
//                 return res.status(202).send(response);
//             });
//         }
//     });

// }
var jwt = require('jsonwebtoken')
var config = require('../config/token.js')
exports.login = function (req, res) {
    var usermod = require('../model/users');
    var db = new usermod();
    var response = {};
    var password = require('crypto')
        .createHash('sha1')
        .update(req.body.password)
        .digest('base64');
    db.email = req.body.email;

    usermod.find({ email: db.email, password: password }, function (err, result) {
        //console.log("result: " + result);
        if (err) {
            response = {
                "Success": false,
                "message": "error fetching data"
            };
            return res.status(400).send(err);
        }
        else {
            var token = jwt.sign({ id: db._id}, config.secret, {
                expiresIn: 86400 
            });
            if (result.length > 0) {
                var response = {
                    "Success": true,
                    "message": "Login Successful",
                    "token" :token,
                    "userid": result[0]._id
                };
                return res.status(200).send(response);
            }
            else {

                var response = {
                    "Success": false,
                    "message": "Incorrect Password"
                };
                return res.status(401).send(response);
            }

        }
    });
}
exports.listOfUsers=function (req,res) {
    // return res.status(200).send("all good");
    var userModel = require('../model/users');
    var response = {};
    var arrList=[];
    var userid=req.params.id;
    userModel.find({"_id":{$ne:userid }},function (err,data) {
        console.log(data);
        for(key in data){
                arrList.push(response={email:data[key].email,
                                        userid:data[key]._id});
        }
        if(err)
            {
                response={ "error":true,
                            "message":"error retrieving data"
                }
            }
            else{
                response={
                    "error":false,
                    "message":arrList
                }
            }
        return res.status(200).send(response);
    })
}
