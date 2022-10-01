const mongoose = require("mongoose")
const Schema = mongoose.Schema
const hooks = require("../hooks/user")

const UserSchema = new Schema({
    name: {type: String, required:true},
    discord_id: {type: Number, required:true, unique:true},
})

// HOOKS

UserSchema.pre("deleteOne", hooks.delOne)

module.exports = mongoose.model("user", UserSchema)