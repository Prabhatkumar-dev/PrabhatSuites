const Listing = require("./models/listing");
const Review = require("./models/review");

 
 //yha pe basically yeh dekh rhe h ki agr user login nhi h to wo edit na kr paye cheezo ko..
    module.exports.isloggedIn = (req,res,next)=>{
         if(!req.isAuthenticated()){
            req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must logIn first to add listings");
          return res.redirect("/login")
    }
    next();
    }
    module.exports.saveurlpath = (req,res,next)=>{
        if(req.session.redirectUrl){
            res.locals.originalUrl = req.session.redirectUrl;
        }
        next();
    };
//............................................................Authorization
module.exports.isOwner = async (req,res,next)=>{
    let {id }= req.params;
    let listing = await Listing.findById(id);
        
   if(! (listing.owner._id).equals(req.user.id)){
        req.flash("error","You don't have permission to do this action");
       return res.redirect(`/Listings/show${id}`);
     }
     next();

}
module.exports.isAuther = async(req,res,next)=>{
   let {reviewid}= req.params;
     let {id }= req.params;
   let review = await Review.findById(reviewid);
   if(! (review.author).equals(req.user.id)){
      req.flash("error","You don't have permission to do this action");
       return res.redirect(`/Listings/show${id}`);
   }
   next();

}