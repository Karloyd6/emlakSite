const express = require("express");
const httpStatus = require("http-status");
const { index, create, login, changePassword, profileImageUpload } = require("../controllers/users");
// const validate = require("../middlewares/validations");
// const schema = require("../validation/")

const router = express.Router();

router.get("/",index)

router.post("/create",create);

router.post("/login",login);

router.route("/update/chgpass/:_id")
.post(changePassword);

router.post("/userimage/:_id",profileImageUpload)

module.exports= router;