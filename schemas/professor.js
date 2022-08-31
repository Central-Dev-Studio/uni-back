const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProfessorClass = new Schema({
    class: {type: Schema.ObjectId, ref: "classes"}
})

const ProfessorSchema = new Schema({
    name: {type: String, required: true},
    classes: {type: [ProfessorClass], required: true},
    discord_id: {type: Number, required: true}
})

module.exports = mongoose.model("professors", ProfessorSchema)