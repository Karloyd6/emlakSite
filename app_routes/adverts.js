const express = require("express");
const httpStatus = require("http-status");
const { index, create, image_uploads, deleteAdvert, updateAdvert } = require("../controllers/adverts")
const validate = require("../middlewares/validations");
const schemas = require("../validation/adverts")
const router = express.Router();

router.get("/",index)
router.get("/:_id",index)

router.route("/")
.post(validate(schemas.advertValidation),create)

router.route("/image_uploads/:_id")
.post(image_uploads);

router.delete("/:_id",deleteAdvert);

router.route("/update/:_id")
.post(validate(schemas.advertValidation),updateAdvert)

module.exports = router;