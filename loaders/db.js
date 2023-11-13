const mongoose = require("mongoose");

const db=mongoose.connection;

db.once("open",()=>{
    console.log("MongoDB bağlatısı başarılıdır")
})

const connectDB = async ()=>{
    await mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
}

module.exports= {
    connectDB
}