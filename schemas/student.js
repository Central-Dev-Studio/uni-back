const mongoose = require("mongoose")
const Schema = mongoose.Schema

const StundentClassSchema = new Schema({ // SUJEITO A MUDANÇAS
    class: {type: Schema.ObjectId, ref: "classes"},
    grade: {type: Number, default: 0.0}
})

const StudentTask = new Schema({ // SUJEITO A MUDANÇAS
    task: {type: Schema.ObjectId, ref: "tasks"},
    status: {type: String, default: "pendent"}
})

const StudentSchema = new Schema({
    name: {type: String, required: true},
    discord_id: {type: Number, required: true},
    class: {type: [StundentClassSchema], required: true},
    grade: {type: Number, default: 0.0},
    tasks: {type: [StudentTask], default: []}
})

module.exports = mongoose.model("students",StudentSchema)