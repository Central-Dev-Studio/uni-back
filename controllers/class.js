const dbcontroller = require("../dbcontroller")

async function get(req, res) {
    try {
        const guild_id = req.params.gid
        const Classes = await dbcontroller.getModel("class")
        const classes = await Classes.findOne({guild_id})
        if (classes) {
            console.log(classes)
            res.status(200)
            res.send({message: "Success!", content:classes})
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

module.exports = {
    get,
    create,
    update,
    del,
}
