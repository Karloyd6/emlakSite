const express = require("express");
const httpStatus = require("http-status");
const { index, create, image_uploads, deleteAdvert, updateAdvert, deleteImage } = require("../controllers/adverts")
const validate = require("../middlewares/validations");
const schemas = require("../validation/adverts");
const authenticate = require("../middlewares/authenticate")
const router = express.Router();

router.route("/").get(index)
router.get("/:_id",index)

router.route("/")
.post(authenticate,validate(schemas.advertValidation),create)

router.route("/image_uploads/:_id")
.post(authenticate,image_uploads);

router.route("/delete_image/:_id&:url")
.delete(authenticate,deleteImage)

router.route("/:_id").delete(authenticate,deleteAdvert);

router.route("/update/:_id")
.post(authenticate,validate(schemas.advertValidation),updateAdvert)

module.exports = router;