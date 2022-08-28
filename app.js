const express = require("express")
const port = 300
const app = express()

require("dotenv/config")
const env = process.env



// API START

app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})