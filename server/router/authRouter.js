var express = require('express');
var router = express.Router();

var users = require('../controller/ucontroller.js');
var auth = require('../authentication/index.js');

router.get('/users/:id/list',auth,users.listOfUsers);
router.get('/users/:id/msgs',auth,users.getmsgs);
router.get('/users/singleChatList/:receiverId/and/:senderId',auth,users.singleChatList);
module.exports = router;