const express = require("express")
const router = express.Router()
const controller = require("../controllers/class")

// ENDPOINTS:

router.get("/get/:discord_id", controller.get)

router.post("/create/:discord_id", controller.create)

router.post("/update", controller.update)

router.post("/delete/:discord_id", controller.del)

module.exports = router