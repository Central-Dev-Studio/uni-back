require("dotenv/config")
const env = process.env
require("/schemas")

const mongoose = require("mongoose")

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