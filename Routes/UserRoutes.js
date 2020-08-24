const express = require("express");
const router = express.Router();
const controller = require("../Controller/userController");
const passport = require("passport");

router.get("/test", controller.try);
router.post("/create", controller.create, passport.authenticate('local'))
router.post("/login", passport.authenticate('local'), controller.checkLogin);
router.get("/status", controller.checkLogin);

module.exports = router;