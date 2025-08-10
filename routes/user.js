const express = require("express");
const router = express.Router();                                      
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError");
const User = require("../models/user");                   //to create new user    
const passport = require("passport")  ;
const {saveurlpath} = require("../middleware.js")
const usercontroller = require("../controllers/users.js")              

//..........................................................SIGNUP.........................
router.get("/signup", usercontroller.signup)
router.post("/signup" ,  wrapAsync(usercontroller.postsignup))
//.........................................................LOGIN/LOGOUT.............................................
router.get("/login",usercontroller.loginform)
router.post("/login", saveurlpath, passport.authenticate("local",{ failureRedirect: '/login' , failureFlash:true}), usercontroller.login)

router.get("/logout",usercontroller.logout)





module.exports = router;