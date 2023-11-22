const express = require("express");
const httpStatus = require("http-status");
const { index, create, login, changePassword, profileImageUpload, updateUser } = require("../controllers/users");
const authenticate = require("../middlewares/authenticate")
// const validate = require("../middlewares/validations");
// const schema = require("../validation/")

const router = express.Router();

// router.get("/",index)
router.route("/:_id").get(index)

router.post("/create",create);

router.post("/login",login);

router.route("/update/chgpass/:_id")
.post(changePassword);

router.route("/update/:_id")
.post(updateUser)

router.route("/userimage/:_id").post(profileImageUpload)

module.exports= router;