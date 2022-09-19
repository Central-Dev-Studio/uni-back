const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    name: {type: String, required:true},
    class: {type: Schema.ObjectId, ref: "class", required:true},
    value: {type: Number, default: 0.0},
    end: {type: Date, required: false}
})

module.exports = mongoose.model("task", TaskSchema)