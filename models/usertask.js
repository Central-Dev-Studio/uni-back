const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserTaskSchema = new Schema({
    user_status: {type: String, default: "pending"},
    grade: {type: Number, default: 0.00},
    user: {type: Schema.ObjectId, ref: "user", required: true},
    task: {type: Schema.ObjectId, ref: "task", required: true},
})

module.exports = mongoose.model("user_task", UserTaskSchema)