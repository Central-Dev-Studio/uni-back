const express = require("express")
const router = express.Router()
const controller = require("../controllers/user")

// ENDPOINTS:

router.get("/get/:did", controller.get)

router.post("/create", controller.create)

router.post("/update/:did", controller.update)

router.post("/delete/:did", controller.del)

module.exports = router