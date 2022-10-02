const dbcontroller = require("../dbcontroller")

async function find_create_user(discord_id, name) {
    const Users = await dbcontroller.getModel("user")
    const user = await Users.findOne({discord_id})
    if (!user) {
        user = await Users.create({discord_id,name})
    }
    return user
}

async function find_user(discord_id, fields) {
    fields = fields || {}
    const Users = await dbcontroller.getModel("user")
    const user = await Users.findOne({discord_id}, opts)
    return user
}

async function find_class(guild_id) {
    const Classes = await dbcontroller.getModel("class")
    const classroom = await Classes.findOne({guild_id})
    return classroom
}

module.exports = {
    find_create_user,
    find_user,
    find_class
}