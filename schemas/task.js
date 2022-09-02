const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TaskGroup = new Schema({
    group: {type: Schema.ObjectId, ref: "groups", required: true},
    status: {type: String, default: "inscrito"},
    grade: {type: Number, default: 0.00}
})

const TaskClass = new Schema({
    class: {type: Schema.ObjectId, ref: "classes"},
    groups: {type: [TaskGroup], required: false}
})

const TaskSchema = new Schema({
    name: {type: required, required: true},
    description: {type: String, default: "Sem descrição."},
    classes: {type: [TaskClass], required: true},
    grade: {type: Number, default: 0.0},
    status: {type: String, default: "programado"},
    group: {type: Boolean, default: false}
})

module.exports = mongoose.model("tasks", TaskSchema)