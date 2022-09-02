const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProfessorClass = new Schema({
    professor: {type: Schema.ObjectId, ref: "professors"}
})

const TaskClass = new Schema({
    task: {type: Schema.ObjectId, ref: "tasks"},
    end: {type: Date, required: true}
})

const StudentClass = new Schema({
    student: {type: Schema.ObjectId, ref: "students"},
    grade: {type: Number, default: 0.00}
})

const GroupClass = new Schema({
    group: {type: Schema.ObjectId, ref: "groups", required: true},
    grade: {type: Number, default: 0.0}
})

const ClassSchema = new Schema({
    name: {type: String, required: true},
    guild_id: {type: Number, required: true},
    professor: {type: [ProfessorClass], required: true},
    tasks: {type: [TaskClass], default: []},
    students: {type: [StudentClass], default: []},
    groups: {type: [GroupClass], default: []}
})

module.exports = mongoose.model("classes",ClassSchema)