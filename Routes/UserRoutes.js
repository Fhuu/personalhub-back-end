const express = require("express");
const router = express.Router();
const controller = require("../Controller/userController")

router.get("/test", controller.try);
router.post("/create", controller.create)
router.post("/login", controller.authenticate);

module.exports = router;