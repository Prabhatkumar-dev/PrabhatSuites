const {reviewSchema}=require("../schema");
const Review = require("../models/review");
const Listing = require("../models/listing");



module.exports.createroute =  async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let review = new Review(req.body.review);
    review.author = req.user._id;
    
    listing.reviews.push(review);                ///push krne ke liye reviews array hona chahiye listing mein 
    console.log("after adding review",listing)
    await listing.save();
    await review.save();
    req.flash("success"," Review has been added !");
  res.redirect(`/Listings/show${listing._id}`);
  
}
module.exports.deletereview = async (req,res)=>{
    let {id,reviewid}= req.params;
      await Review.findByIdAndDelete(reviewid);             //abhie sirf review se delete hua h pr lisitng se nhi
      await Listing.findByIdAndUpdate (id,{$pull :{reviews : reviewid}})
        req.flash("success"," Review has been Delete!");
  res.redirect(`/Listings/show${id}`);
    
   
}