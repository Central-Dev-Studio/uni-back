const express = require("express")
const router = express.Router()
const controllers = require("../controllers/userinclass")

// ENDPOINTS:

router.get("/get/:gid/:did", controllers.get)

router.post("/add/:gid/:did", controllers.add)

module.exports = router