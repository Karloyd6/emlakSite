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
    info : {
        room: String,
        m2: String,
        bath: String,
        floor: String,
        allFloor: String,
        buildAge: String,
        heating: String,
        front: String,
        exchange: String,
        credit: String
    },
    advert_images : Array,
    user : String,
    type : String,
    rentOrBuy : String
},{timestamps : true, versionKey: false})

module.exports = mongoose.model("adverts",advertSchema);