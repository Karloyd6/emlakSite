const express = require("express");
const httpStatus = require("http-status");
const { index, create, image_uploads, deleteAdvert, updateAdvert, deleteImage, listByType } = require("../controllers/adverts")
const validate = require("../middlewares/validations");
const schemas = require("../validation/adverts");
const authenticate = require("../middlewares/authenticate")
const router = express.Router();

// GET ALL ADVERTS
router.route("/").get(index)
// GET ADVERTS BY İD
router.get("/:_id",index)
// GET ADVERTS WİTH QUERY
router.route("/type/:type").get(listByType)

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