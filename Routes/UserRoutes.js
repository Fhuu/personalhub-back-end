const express = require("express");
const router = express.Router();
const controller = require("../Controller/userController")

router.get("/test", controller.try);
router.post("/create", controller.create, controller.authenticate)
router.post("/login", controller.authenticate, controller.checkSession);
router.get("/checkSession", controller.checkSession);

module.exports = router;