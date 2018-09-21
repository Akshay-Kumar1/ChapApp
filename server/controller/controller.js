exports.registration=function(req,res){

    var usermod=require('../model/users');
    var db = new usermod();
    var response = {};
   
    db.email = req.body.email; 
    // Hash the password using SHA1 algorithm.
    db.password =  require('crypto')
                      .createHash('sha1')
                      .update(req.body.password)
                      .digest('base64');
                      db.fname=req.body.fname
                      db.lname=req.body.lname
    db.save(function(err)
    {
    // save() will run insert() command of MongoDB.
    // it will add new data in collection.
        if(err) {
            response = {"error" : true,"message" : "Error adding data", "err":err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
}

exports.login=function(req,res){

}