const express = require("express")
const router = express.Router()
const controller = require("../controllers/class")
const userClassRouter = require("./userinclass")

// ENDPOINTS:

router.get("/get/:gid", controller.get)

router.post("/create", controller.create)

router.post("/update/:gid", controller.update)

router.post("/delete/:gid", controller.del)

router.post("/setup/:gid", controller.setup)

router.use("/in", userClassRouter)

module.exports = router