const mongoose = require("mongoose")
const Schema = mongoose.Schema

// const UserClassTask = new Schema({
//     task: {type: Schema.ObjectId, ref: "task", required:true},
//     status: {type: String, default: "pending"},
//     grade: {type: Number, required:false}
// })

// const UserClassExample = new Schema({
//     class: {type: Schema.ObjectId, ref: "class", required:true},
//     grade: {type: Number, default: 0.0},
//     tasks: {type: [UserClassTask], required:true}
// })

// const UserClass = new Schema({
//     guild_id: {type: UserClassExample, required:false}
// })

const UserSchema = new Schema({
    name: {type: String, required: true},
    discord_id: {type: Number, required:true, unique:true},
    classrooms: {type: Object, required:false},
})

module.exports = mongoose.model("user", UserSchema)