const express = require("express");
const fileUpload = require("express-fileupload");
const helmet = require("helmet");
const cors = require("cors");
const config = require("./config")
const {advertRoutes, userRoutes} = require("./app_routes")
const path = require("path")
const loaders = require("./loaders")

config();
loaders();

const app = express();

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

app.listen(PORT, ()=>{
    console.log(`Uygulama ${PORT} portu üzerinden yayında...`)
})
