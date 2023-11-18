const express = require("express");
const http = require("http")
const fileUpload = require("express-fileupload");
const helmet = require("helmet");
const cors = require("cors");
const config = require("./config")
const {advertRoutes, userRoutes} = require("./app_routes")
const path = require("path")
const loaders = require("./loaders");
const socketio =require("socket.io");

config();
loaders();

const app = express();
const server = http.createServer(app)

app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );
app.use(fileUpload());
app.use("/uploads", express.static(path.join(__dirname,"./","uploads")))
app.use(cors({
    origin : "*",
    methods : "POST, GET, PATCH, PUT, DELETE"
}))

app.use("/advert",advertRoutes)
app.use("/user",userRoutes);

const PORT = process.env.APP_PORT || 3001

// app.listen(PORT, ()=>{
//     console.log(`Uygulama ${PORT} portu üzerinden yayında...`)
// })

const io =socketio(server,{
  cors:{
    origin : "*",
    methods : ["GET", "POST", "OPTIONS", "DELETE", "PATCH"]
  }
})


server.listen(PORT, ()=>{
  console.log(`server on port : ${PORT}`)

  io.on("connection", socket => {

    socket.on("merhaba",(data)=>{
      console.log(data)
    });
    socket.emit("mal","sefldknslkfsğdfjsdğfıj")
  })
  
})

