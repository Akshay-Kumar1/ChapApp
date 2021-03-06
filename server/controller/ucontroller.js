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
        // var username=result[0].firstname+' '+result[0].lastname;
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
                    "userid": result[0]._id,
                    "username":result[0].firstname+' '+result[0].lastname
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
    var userModel = require('../model/users');
    var response = {};
    var arrList=[];
    var userid=req.params.id;
    //var username=result[0].firstname+' '+result[0].lastname;
    userModel.find({"_id":{$ne:userid }},function (err,data) {
        console.log(data);
        for(key in data){
                arrList.push({email:data[key].email,name:data[key].firstname+' '+data[key].lastname,
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

exports.addtodb=function (userid,username,message,date) {
    var userModel = require('../model/message');
    var db = new userModel();
    var response={};
    db.userid=userid;
    db.username=username;
    db.message=message;
    db.date=date;
    db.save(function (err) {
        if (err) {
            response = {
                "error": true,
                "message": "error storing data"
            }
        }
        else {
            response = { "error": false, "message":"succesfully added to database" }
        }
    });
    console.log(response)

}
exports.getmsgs=function(req,res){
    var userModel = require('../model/message');
    var response = {};
    userModel.find({},function(err,data){
        if(data){
            response={
                "error":false,
                "message":data
                
            }
            res.status(200).send(response);
        }
        else{
            response={
                "error":true,
                "message":"something went wrong",
                
            }
            console.log(err);
            res.status(401).send(response);
        }
       
    })
}
exports.peerMessages=function(senderId,senderName,receiverId,receiverName,message,date){
    var messageMod=require('../model/singleChat');
    var msgdb=new messageMod();
    var response={};
    msgdb.message= message;
    
    msgdb.senderId=senderId;
    msgdb.receiverId= receiverId;
    msgdb.senderName= senderName;
    msgdb.receiverName= receiverName;
    msgdb.date=date;
    // console.log(username);

    msgdb.save(function (err) {
        
        if (err) {
            response = {
                "Success": false,
                "message": "Error adding data",
                "err": err
            };
        } else {
            response = {
                "Success": true,
                "message": "Successfully Sent"
            };
        }
        console.log(response);
        
    });
}
exports.singleChatList= function(req,res)
{
    var messageMod=require('../model/singleChat');
    
    var response={};
    var receiverId=req.params.receiverId;
    var senderId=req.params.senderId;
    messageMod.find({$or:[{'receiverId':receiverId,'senderId':senderId},{'senderId':receiverId,'receiverId':senderId}]}, function(err,result){
        if (err) {
            response = {
                "Success": false,
                "message": "Error fetching data"
            };
            return res.status(404).send(err);
        } else {
            response={
                "Success": true,
                "message": result
            }
            
        }
            return res.status(200).send(response);
    });
}
// exports.addChat=function(senderName,receiverName,message,date,senderId,receiverId)
// {
//     var userModel = require('../model/privateChat');
//     var db = new userModel();
//     var response={};
//     db.senderName=senderName;
//     db.receiverName=receiverName;
//     db.message=message;
//     db.date=date;
//     db.senderId=senderId;
//     db.receiverId=receiverId;
//     db.save(function (err) {
//         if (err) {
//             response = {
//                 "error": true,
//                 "message": "error storing data"
//             }
//         }
//         else {
//             response = { "error": false, "message":"succesfully added to database" }
//         }
//     });
//     console.log(response)

// }
// exports.getSingleMsgs=function(req,res){
//     var userModel = require('../model/privateChat');
//     var response = {};
//     var receiverId=req.params.receiverId;
//     var senderId=req.params.senderId;
//     userModel.find({$or:[{'receiverId':receiverId,'senderId':senderId},{'senderId':senderId,'receiverId':receiverId}]},function(err,data){
//         if(data){
//             response={
//                 "error":false,
//                 "message":data
                
//             }
//             res.status(200).send(response);
//         }
//         else{
//             response={
//                 "error":true,
//                 "message":"something went wrong",
                
//             }
//             console.log(err);
//             res.status(401).send(response);
//         }
       
//     })
// }
