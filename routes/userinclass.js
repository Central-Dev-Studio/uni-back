const express = require("express")
const router = express.Router()
const controllers = require("../controllers/userinclass")

// ENDPOINTS:

router.post("/add/:gid/:did", controllers.add)

module.exports = router