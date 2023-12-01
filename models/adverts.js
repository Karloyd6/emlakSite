const mongoose = require("mongoose");
const {Schema} = mongoose;

const advertSchema = new Schema({
    advertId : String,
    title : String,
    description : String,
    price :String,
    adress : {
        city : String,
        county : String,
        district : String,
        hood: String,
        detail : String,
    },
    advert_images : Array,
    user : String,
    type : String,
    rentOrBuy : String
},{timestamps : true, versionKey: false})

module.exports = mongoose.model("adverts",advertSchema);