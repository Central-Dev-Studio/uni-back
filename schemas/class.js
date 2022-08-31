const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProfessorClass = new Schema({
    professor: {type: Schema.ObjectId, ref: "professors"}
})

const TaskClass = new Schema({
    task: {type: Schema.ObjectId, ref: "tasks"},
    end: {type: Date, required: true}
})

const ClassSchema = new Schema({
    name: {type: String, required: true},
    guild_id: {type: Number, required: true},
    professor: {type: [ProfessorClass], required: true},
    tasks: {type: [TaskClass], default: []}
})

module.exports = mongoose.model("classes",ClassSchema)