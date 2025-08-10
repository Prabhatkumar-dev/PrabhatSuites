//for controlling all the routes of lisitng

const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const {listingSchema}=require("../schema");
const Review = require("../models/review");

module.exports.index = async(req,res)=>{
   
    const alllistings =  await Listing.find({});
    res.render("listing/index.ejs",{alllistings});
};
module.exports.new = (req,res)=>{
   
   res.render("listing/new.ejs");
}
module.exports.create =async(req,res)=>{
    let url = req.file.path;
    let filename = req.file.filename;
//  let {title,description,image,price,location,country} = req.body; ...................isko insert krne mein dikkat aa skti h...to naam bdl lo html mein
   let result =listingSchema.validate(req.body);
   const newlisting = new Listing(req.body.listing);
   newlisting.owner = req.user
   newlisting.image ={url,filename}
   console.log(newlisting);

   await newlisting.save();
    req.flash("success","New Hotel Added Successfully!");
    res.redirect("/Listings");
   

}
module.exports.edit = async (req,res)=>{
    
    let {id} = req.params;
    let edit = await Listing.findById(id);
    let originalImageUrl = edit.image.url;
    originalImageUrl=  originalImageUrl.replace("/upload","/upload/h_200,w_270,")
    console.log("uuuuuu-----", originalImageUrl)
    res.render("listing/edit.ejs",{edit, originalImageUrl});
}
module.exports.update =async(req,res)=>{
     let {id} = req.params;
      const listing = await Listing.findByIdAndUpdate(id,{...req.body.listing})    //destrucuture krne ke liye ... kiya h 
      console.log("listingimage ::", listing);
      if( typeof req.file !== "undefined"){ 
      let url = req.file.path;
        let filename = req.file.filename;
        listing.image ={url,filename};
        await listing.save();   
    }
        req.flash("success"," Details Updated !");
      res.redirect("/Listings")
          
}

module.exports.delete =async (req,res)=>{
    try{
        let {id}= req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success"," Hotel Deleted Successfully!");
    res.redirect("/Listings");}
    catch(err){
       req.flash("error"," err");
    }
}

module.exports.show =async (req,res)=>{
    let {id} = req.params;
    let hotel = await Listing.findById(id).populate({path:"reviews", populate: {path:"author"}}).populate("owner");
    // console.log(hotel);
    if(!hotel){
       req.flash("error","Hotel not found..!");
       res.redirect("/Listings");
    }
   
    res.render("listing/show.ejs",{hotel});
}

