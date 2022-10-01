const dbcontroller = require("../dbcontroller")

async function get(req, res) {
    try {
        const guild_id = req.params.gid
        const Classes = await dbcontroller.getModel("class")
        const classes = await Classes.findOne({guild_id})
        console.log(classes)
        res.status(200)
        res.send({message: "Success!", content:classes})
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
        console.log(classes)
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
        const info = req.params.info
        const Classes = await dbcontroller.getModel("class")
        const classroom = await Classes.findOneAndUpdate({guild_id}, {$set:info})
        console.log(classes)
        req.status(200)
        res.send({message: "Success!", content:classroom})
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    } 
}

async function del(res, res) {
    try {
        const guild_id = req.params.gid
        const Classes = await dbcontroller.getModel("class")
        const classroom = await Classes.deleteOne({guild_id})
        console.log(classes)
        res.status(200)
        res.send({message: "Success!", content:classroom})
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
