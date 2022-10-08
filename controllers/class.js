const dbcontroller = require("../dbcontroller")
const { find_class, result_find_users, bulkStudInClass, professor_in_class } = require("../utils/util")

async function get(req, res) {
    try {
        const guild_id = req.params.gid
        const classroom = await find_class(guild_id)
        if (classroom) {
            console.log(classroom)
            res.status(200)
            res.send({message: "Success!", content:classroom})
        } else {
            res.status(400)
            res.send({message: "Can't find class!"})
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
    
}

async function create(req, res) {
    try {
        const info = req.body
        console.log(info)
        const Classes = await dbcontroller.getModel("class")
        const classroom = await Classes.create(info)
        console.log(classroom)
        res.status(200)
        res.send({message: "Success!", content:classroom})
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

async function update(req, res) {
    try {
        const guild_id = req.params.gid
        const info = req.body
        const Classes = await dbcontroller.getModel("class")
        const classroom = await Classes.findOneAndUpdate({guild_id}, {$set: info}, {new: true})
        if (classroom) {
            console.log(classroom)
            res.status(200)
            res.send({message: "Success!", content:classroom})
        } else {
            res.status(400)
            res.send({message: "Can't find class!"})
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    } 
}

async function del(req, res) {
    try {
        const guild_id = req.params.gid
        const Classes = await dbcontroller.getModel("class")
        const classroom = await Classes.deleteOne({guild_id})
        if (classroom.deletedCount > 0) {
            console.log(classroom)
            res.status(200)
            res.send({message: "Success!", content:classroom})
        } else {
            res.status(400)
            res.send({message: "Can't find class!"})
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

async function setup(req, res) {
    try {
        const guild_id = req.params.gid
        let students = req.body.students
        let professor = req.body.professor
        console.log(students)
        students = await result_find_users(students)
        console.log(students)
        const classroom = await find_class(guild_id)
        const student_in_class = await bulkStudInClass(students, classroom)
        professor = await professor_in_class(professor[1], professor[0], classroom._id)
        if (classroom && students && students.length > 0 && student_in_class && professor) {
            console.log(classroom)
            res.status(200)
            res.send({message: "Success!", content: {students,classroom,student_in_class,}})
        } else {
            res.status(400)
            res.send({message: "Can't setup class!"})
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

module.exports = {
    get,
    create,
    update,
    del,
    setup,
}
