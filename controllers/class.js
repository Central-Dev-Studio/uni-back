const dbcontroller = require("../dbcontroller")
const { find_class } = require("../utils/util")

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
        const students = req.body.students
        const professor = req.body.professor
        // pegar lista de ids dos documentos de students e criar user_in_class com base nisso - fazer isso através de uma função em utils que faz um map com bulkwrite
    }
}

module.exports = {
    get,
    create,
    update,
    del,
}
