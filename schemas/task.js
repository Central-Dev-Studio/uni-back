const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TaskClass = new Schema({
    class: {type: Schema.ObjectId, ref: "classes"}
})

const TaskSchema = new Schema({
    name: {type: required, required: true},
    description: {type: String, default: "Sem descrição."},
    classes: {type: [TaskClass], required: true},
    grade: {type: Number, default: 0.0},
    status: {type: String, default: "programado"}
})

module.exports = mongoose.model("tasks", TaskSchema)