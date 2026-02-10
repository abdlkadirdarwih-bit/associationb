


   const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
//  imageId:String,
 mainImage: String, 
// imageId: [String], // an array of image URLs
    
        title :String,
            description:String,


})

const ServiceModel = mongoose.model("services", ServiceSchema)

module.exports = ServiceModel