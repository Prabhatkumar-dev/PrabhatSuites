const User = require("../models/user");                   //to create new user    
const passport = require("passport")  ;
const {saveurlpath} = require("../middleware.js")  


module.exports.signup = (req,res)=>{
    res.render("users/signup.ejs")
}
module.exports.postsignup = async(req,res)=>{
    
        try{
           let {username , email , password } = req.body;
          const newuser = new User({email,username});
           const registereduser =  await User.register(newuser,password);
           
           req.login(registereduser,(err)=>{
            if(err){
                return next(err)
            }
            else{
                req.flash("success","You are successfully registered  ");
                res.redirect("/Listings")
            }
           }) 
        }
        catch(e){
            req.flash("error", e.message)
            res.redirect("/signup")
        }
   
}
module.exports.loginform = (req,res)=>{
    res.render("users/login.ejs");
} 
module.exports.login =  async(req,res)=>{
    req.flash("success","Welcome Back");
    //  res.locals.originalUrl = req.session.redirectUrl;  .... show6891a44f90621376701a1ea1
    let redirectpath = res.locals.originalUrl || "/Listings";

        res.redirect( redirectpath );
   
}
module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You are successfully logged out");
        res.redirect("/Listings")
    })
}