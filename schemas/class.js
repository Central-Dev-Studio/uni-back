const mongoose = require("mongoose")
const Schema = mongoose.Schema

// const ClassStudent = new Schema({
//     student: {type: Schema.ObjectId, ref: "user", required:true},
//     grade: {type: Number, default:0.0}
// })

const ClassSchema = new Schema({
    name: {type: String, required:true},
    guild_id: {type: Number, required:true, unique:true},
    professor: {type: Schema.ObjectId, ref:"user", required:false},
    students: {type: Object, default:{}},
    rules: {type: String, default:""},
})

module.exports = mongoose.model("class",ClassSchema)