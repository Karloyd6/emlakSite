const mongoose = require("mongoose");
const {Schema} = mongoose;

const advertSchema = new Schema({
    
    title : String,
    description : String,
    price :String,
    infos : {
        roomCount : String,
        areaMeasureNet : String,
        areaMeasureBrt :String,
        levelOn : String,
        levelAll : String,
        buildAge : String,
        heating : String,
        furnished : String
    },
    adress : {
        city : String,
        district : String,
        hood: String,
        detail : String,
    },
    rentOrBuy : String,
    advert_images : Array
    
    
    
},{timestamps : true, versionKey: false})

module.exports = mongoose.model("adverts",advertSchema);