if(process.env.NODE_ENV != "production"){              //isse kbhi .env file ka content khi pe uplaod nhi hoga secuirity maintain rahegi..
    
    require('dotenv').config();
}
// console.log(process.env.SECRET)

const express = require("express");
const app =express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
app.engine('ejs',ejsMate);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))
app.set("viewengine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));
const sessions =require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const listingsRouter = require("./routes/listing")
const reviewsRouter = require("./routes/review")
const userRouter = require("./routes/user")

const passport = require("passport");
const passportLocal = require("passport-local");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");

const db_url =process.env.ATLASDB_URL;
main()
.then(()=>{
    console.log("connection build");
})
.catch((err) => {console.log(err)});
async function main(){
    
 await mongoose.connect(db_url);
}
//........................................................................Mongo-conect...SEssion and cookie.............................
const store = MongoStore.create({
    mongoUrl : db_url,
    crypto :{
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600,
})

const sessionOptions ={
    store,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized : true,
    cookie:{
       
        expires: Date.now() + 7*24*60*60*1000,      //1 week  expiry time 7*24*60*60*1000
        maxAge :  7*24*60*60*1000,
        httpOnly:true                                   ////for secuirity purpose
    }
}


app.use(sessions(sessionOptions));
app.use(flash())


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use((req,res,next)=>{
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  res.locals.curentuserinfo = req.user;
  next();                                             //listing.ejs mein new hotel create ho rha to wha pe jayenge

})



app.get("/", (req,res)=>{
    res.redirect("/listings");
})
app.use("/listings" , listingsRouter);                            ///is line sirf kaam hoga sara listing wla linmkr diya h na isliye
app.use("/" , userRouter); 
app.use("/Listings/:id/reviews" , reviewsRouter);  

app.use((err,req,res,next)=>{
//   let { message}=err;
//  res.render("listing/error.ejs" ,{message}); 
    req.flash('error',err.message);                           //saarri error flash message se print krva rhe h
    res.redirect("/Listings");
})

app.listen("3000" ,()=>{
    console.log("listening to port");
})