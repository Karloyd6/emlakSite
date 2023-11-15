const mongoose = require("mongoose");
const {Schema} = mongoose;

const advertSchema = new Schema({
    
    title : String,
    description : String,
    price :String,
    adress : {
        city : String,
        district : String,
        hood: String,
        detail : String,
    },
    advert_images : Array
    
    
    
},{timestamps : true, versionKey: false})

module.exports = mongoose.model("adverts",advertSchema);