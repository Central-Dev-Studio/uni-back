const mongoose = require("mongoose")
const Schema = mongoose.Schema
const hooks = require("../hooks/class")

const ClassSchema = new Schema({
    name: {type: String, required: true},
    guild_id: {type: Number, required: true, unique: true}
})

// HOOKS

ClassSchema.pre("deleteOne", hooks.delOne)

module.exports = mongoose.model("class",ClassSchema)