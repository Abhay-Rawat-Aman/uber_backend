const express = require('express');
const { 
    registerRider, 
    loginRider
} = require('../controller/riderController');

const router = express.Router();

router.route("/rider/register").post(registerRider);
router.route("/rider/login").post(loginRider);

module.exports=router;