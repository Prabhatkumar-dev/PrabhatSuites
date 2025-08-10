const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const {listingSchema}=require("../schema");
const Listing = require("../models/listing");
const Review = require("../models/review");
const {isloggedIn, isOwner, saveurlpath} = require("../middleware");
const ListingControllers = require("../controllers/listing")

const multer  = require('multer')
const {storage} =require("../cloudconfig.js")
const upload = multer({ storage})

const validateListings =(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let ermsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,ermsg);
    }
    else{
        next();
    }
}
//.....................................................................................................INDEX ROUTE
router
      .route("/" )
      .get (wrapAsync(ListingControllers.index ))
      .post (isloggedIn,upload.single('listing[image]'),wrapAsync(ListingControllers.create)
    );
      

//...................................................................................................SHOW ROUTE.....................
router.get("/show:id",wrapAsync( ListingControllers.show))
// populate("reviews")
//.................................................................................................NEW & CREATE ROUTE..............
router.get("/new",isloggedIn,ListingControllers.new);

// router.post("/", isloggedIn,wrapAsync(ListingControllers.create));
//....................................................................................................Edit & Update ........................
router.get("/:id/edit",  isloggedIn,isOwner,wrapAsync(ListingControllers.edit))

router.put("/:id", upload.single('listing[image]'),  wrapAsync( ListingControllers.update))
//......................................................................................................DELETE..............................
router.get("/:id/delet",isloggedIn,saveurlpath,isOwner,wrapAsync(ListingControllers.delete))

module.exports = router;