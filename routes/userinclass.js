const express = require("express")
const router = express.Router()
const controllers = require("../controllers/userinclass")

// ENDPOINTS:

router.get("/get/:gid/:did", controllers.get)

router.post("/add/:gid/:did", controllers.add)

//router.post("/leave/:gid/:did", controller.leave)

module.exports = router