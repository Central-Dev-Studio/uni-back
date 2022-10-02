const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserInClassSchema = new Schema({
    grade: {type: Number, deafult: 0.00},
    role: {type: String, default: "student"},
    user: {type: Schema.ObjectId, ref: "user", required: true},
    class: {type: Schema.ObjectId, ref: "class", required: true},
})

UserInClassSchema.index({user:1, class:1}, {unique: true})

module.exports = mongoose.model("user_in_class", UserInClassSchema)