const dbcontroller = require("../dbcontroller")
const { find_user, find_class } = require("../utils/util")

async function add(req, res) {
    try {
        const discord_id = req.params.did
        const guild_id = req.params.gid
        const role = req.body.role || "student"
        const UserInClasses = await dbcontroller.getModel("user_in_class")
        const classroom = await find_class(guild_id, {_id:1})
        const user = await find_user(discord_id, {_id:1})
        if (classroom && user) {
            const result = await UserInClasses.create({
                role,
                user: user._id,
                class: classroom._id
            })
            console.log(result)
            res.status(200)
            res.send({message: "Success!", content: result})
        } else {
            res.status(400)
            res.send({message: "Wrong Request!"})
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

async function get(req, res) {
    try {
        const discord_id = req.params.did
        const guild_id = req.params.gid
        const user = await find_user(discord_id, {_id:1})
        const classroom = await find_class(guild_id, {_id:1})
        const UserInClasses = await dbcontroller.getModel("user_in_class")
        if (user && classroom) {
            const result = UserInClasses.findOne({user,class:classroom})
            if (result) {
                console.log(result)
                res.status(200)
                res.send({message: "Success!",in_class:true, content: result})
            } else {
                res.status(401)
                res.send({message: "User not in class!",in_class:false})
            }
        } else {
            res.status(400)
            res.send({message: "Couldn't find user or class!"})
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

async function leave(req, res) {
    try {
        const guild_id = req.params.gid
        const discord_id = req.params.did
        const UserInClasses = await dbcontroller.getModel("user_in_class")
        const user = await find_user(discord_id, {_id:1})
        const classroom = await find_class(guild_id, {_id:1})
        const result = await UserInClasses.deleteOne({user,class:classroom})
        if (result.deletedCount>0) {
            res.status(200)
            res.send({message: "Success!", content: result})
        } else {
            console.log(result)
            res.status(400)
            res.send({message: "Couldn't find user in class"})
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

module.exports = {
    add,
    get,
    leave,
}