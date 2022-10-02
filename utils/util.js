const dbcontroller = require("../dbcontroller")

async function find_create_user(discord_id, name) {
    const Users = await dbcontroller.getModel("user")
    const user = await Users.findOne({discord_id})
    if (!user) {
        user = await Users.create({discord_id,name})
    }
    return user
}
       
module.exports = {
    find_create_user
}