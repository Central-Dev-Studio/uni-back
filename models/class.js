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
    let path = "students."+did
    let toSet = {}
    toSet[path] = {student: student._id, grade:0.0}
    const classroom = await Classes.findOneAndUpdate({guild_id:guild},{ $set:toSet})
    return classroom
}

async function set_student(did_l,guild) {
    const Classes = await dbcontroller.getModel("class")
    let toSet = {}
    for (let i=0;i<did_l.length;i++) {
        let student = await get_user(did_l[i][1])
        let path = "students."+did_l[i][1]
        toSet[path] = {student: student._id, grade:0.0}
    }
    const classroom = await Classes.findOneAndUpdate({guild_id:guild},toSet, {new:true})
    return classroom
}

async function set_professor(did,guild) {
    const Classes = await dbcontroller.getModel("class")
    const professor = await get_user(did)
    const classroom = await Classes.findOneAndUpdate({guild_id:guild},{$set: {professor: professor._id}}, {new:true})
    return classroom
}

module.exports = {
    get_class,
    create_class,
    add_student,
    set_professor,
    set_student
}
const { get_user } = require("./user")