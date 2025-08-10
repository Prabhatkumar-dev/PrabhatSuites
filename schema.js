const joi = require("joi");
module.exports.listingSchema = joi.object({
    listing:joi.object({
    title:joi.string().required(),
    description:joi.string().required(),
    location: joi.string().required(),
    country:joi.string().required(),
    price:joi.number().required().min(0),
    image:joi.string().required(),
}).required(),})


//schema side mein verify krne ke liye ki data ka firmat sahi h aur vallid h ... hopscotch se verufy krte h
// for review
module.exports.reviewSchema = joi.object({
  review:joi.object({
    rating:joi.number().required().min(1).max(5),
    comment:joi.string().required(),
  }).required()
})
//isko require kro method banao phir middleware mein pass kro