const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    name: {type: String, required:true},
    class: {type: Schema.ObjectId, ref: "class", required:true},
    value: {type: Number, default: 0.0},
    end: {type: Date, required: false},
    status: {type: String, default: "open"}
})

async function del(task) {
    await task.model("user_task").deleteMany({task: task._id})
}

TaskSchema.pre("deleteOne", async function () {
    await del(this)
})

// TaskSchema.pre("deleteMany", async function () {
//     console.log(this._conditions)
//     await del(this)
// })

module.exports = mongoose.model("task", TaskSchema)