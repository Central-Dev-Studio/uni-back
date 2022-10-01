const express = require("express")
const bodyParser = require("body-parser");
const port = 3000
const app = express()
require("dotenv/config")
const env = process.env
const dbcontroller = require("./dbcontroller")

app.use(async (req, res, next) => {
    if (req.query.pass == env.SECRET_KEY) {
      next();
    } else {
      res.send({ message: "Wrong password!" });
    }
  }, bodyParser.json());

//  USERS:
const UserRouter = require("./routes/user")
app.use("/user", UserRouter)

//CLASSES:
const ClassRouter = require("./routes/class")
app.use("/class", ClassRouter)

// API START

app.listen(port, async () => {
    await dbcontroller.connectDatabase()
    console.log(`Listening at port ${port}`)
})