const dbcontroller = require("../dbcontroller")

async function add(req, res) {
    try {
        const discord_id = req.params.did
        const guild_id = req.params.gid
        const role = req.body.role || "student"
        const UserInClasses = await dbcontroller.getModel("user_in_class")
        const Classes = await dbcontroller.getModel("class")
        const Users = await dbcontroller.getModel("user")
        const classroom = await Classes.findOne({guild_id})
        const user = await Users.findOne({discord_id})
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

module.exports = {
    add,
}