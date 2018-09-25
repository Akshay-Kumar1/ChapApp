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
            if (result.length > 0) {
                var response = {
                    "Success": true,
                    "message": "Login Successful"
                };
                return res.status(200).send(response);
            }
            else {

                var response = {
                    "Success": true,
                    "message": "password incorrect"
                };
                return res.status(401).send(response);
            }

        }
    });
}

