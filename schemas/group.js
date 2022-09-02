const mongoose = require("mongoose")
const Schema = mongoose.Schema

const GroupMembers = new Schema({
    student: {type: Schema.ObjectId, ref:"students", required: true}
})

const GroupTasks = new Schema({
    task: {type: Schema.ObjectId, ref: "tasks", required: true},
    grade: {type: Number, default: 0.0}
})

const GroupSchema = new Schema({
    creator: {type: Schema.ObjectId, ref: "students", required: true},
    members: {type: [GroupMembers], required: true},
    taks: {type:[GroupTasks], default: []},
    description: {type: String, default: "Sem descrição"},
    name: {type: String, default: "Meu Grupo"}
})

module.exports = mongoose.model("groups", GroupSchema)