const dbcontroller = require("../dbcontroller")

async function get_class(guild) {
    const Classes = await dbcontroller.getModel("class")
    const classroom = await Classes.findOne({guild_id:guild})
    return classroom
}


async function create_class(guild,name) {
    const Classes = await dbcontroller.getModel("class")
    const classroom = await Classes.create({
        name:name,
        guild_id: guild
    })
    return classroom
}

async function add_student(did,guild) {
    const Classes = await dbcontroller.getModel("class")
    const student = await get_user(did)
    let path = "students."+guild
    let toSet = {}
    toSet[path] = {student: student._id, grade:0.0}
    const classroom = await Classes.findOneAndUpdate({guild_id:guild},{ $set:toSet})
    return classroom
}

module.exports = {
    get_class,
    create_class,
    add_student
}
const { get_user } = require("./user")