const dbcontroller = require("../dbcontroller")
const { find_user } = require("../utils/util")

async function get(req, res) {
    try {
        const discord_id = req.params.did
        const user = await find_user(discord_id)
        if (user) {
            res.status(200)
            res.send({message: "Success!", content:user})
        } else {
            res.status(400)
            res.send({message: "Can't find user!"})
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

async function create(req, res) {
    try {
        const discord_id = req.body.discord_id
        const name = req.body.name
        const Users = await dbcontroller.getModel("user")
        const user = await Users.create({name,discord_id})
        console.log(user)
        res.status(200)
        res.send({message: "Success!", content:user})
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

async function update(req, res) {
    try {
        const discord_id = req.params.did
        const update = req.body
        const Users = await dbcontroller.getModel("user")
        const user = await Users.findOneAndUpdate({discord_id},{$set:update}, {new: true})
        console.log(user)
        res.status(200)
        res.send({message: "Success!", content:user})
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

async function del(req,res) {
    try {
        const discord_id = req.params.did
        const Users = await dbcontroller.getModel("user")
        const user = await Users.deleteOne({discord_id})
        console.log(user)
        res.status(200)
        res.send({message: "Success!", content: user})
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