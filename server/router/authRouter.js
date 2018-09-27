var express = require('express');
var router = express.Router();

var users = require('../controller/ucontroller.js');
var auth = require('../authentication/index.js');

router.get('/users/:id/list',auth, users.listOfUsers);
module.exports = router;