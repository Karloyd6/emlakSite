const express = require("express");
const httpStatus = require("http-status");
const { index, create, login } = require("../controllers/users")

const router = express.Router();

router.get("/",index)

router.post("/create",create);

router.post("/login",login);

module.exports= router;