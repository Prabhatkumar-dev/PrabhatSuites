const express = require("express");
const router = express.Router({mergeParams:true});                                        //{mergeParams:true} --bcz listing.reviews jo use kiya h wo basically listing.js ka part h to uske params ko bhu require krna padega
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const {reviewSchema}=require("../schema");
const Review = require("../models/review");
const Listing = require("../models/listing");
const {isloggedIn, isAuther} = require("../middleware");
const ReviewControllers = require("../controllers/reviews")

const validateReview =(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let ermsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,ermsg);
    }
    else{
        next();
    }
}

//............................................................Review Route.. /Listings/:id/reviews(iski jagah pe only /)..................................................
router.post("/", isloggedIn,validateReview, wrapAsync(ReviewControllers.createroute) )                                                
//...................................DELETE REVIEW............................................................................
router.post("/:reviewid", isloggedIn,isAuther, wrapAsync(ReviewControllers.deletereview))

module.exports = router;