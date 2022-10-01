require("dotenv/config")
const env = process.env
const mongoose = require("mongoose")
require("./models/userinclass")
require("./models/usertask")
require("./models/user")
require("./models/class")
require("./models/task")
// Controller responsible for acessing the mongodb database

class dbController {
    async connectDatabase() {
        await mongoose.connect(env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connected to the database")
    }

    async getModel(model) {
        if (mongoose.connection.readyState != 1) await this.connectDatabase()
        return mongoose.model(model)
      }
}

if (!global.dbController) {
    console.log("dbController instanciado")
    global.dbController = new dbController()
  }
  
  module.exports = global.dbController