const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ClassSchema = new Schema({
    name: {type: String, required: true},
    guild_id: {type: Number, required: true}
})

ClassSchema.pre("deleteOne", function (next) {
    this.model("user_in_class").deleteMany({class:this._id}, next)
})

module.exports = mongoose.model("class",ClassSchema)