const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const blogRoute = require('./blog');
const userRoute = require('./user');
router.use('/blogs',authMiddleware,blogRoute);
router.use('/users',userRoute);
module.exports=router;





