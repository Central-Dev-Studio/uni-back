const dbcontroller = require("../dbcontroller")

async function create_user(did,name,guild) {
    const Users = await dbcontroller.getModel("user")
    let classObj = {}
    let classRef = await get_class(guild)
    classObj[guild] = {
        grade: 0.0,
        tasks: [],
        class: classRef._id
    }
    const user = await Users.create({
        name,
        discord_id: did,
        classes: classObj
    })
    return user
    
}

async function get_user(did) {
    const Users = await dbcontroller.getModel("user")
    const user = await Users.findOne({discord_id:did})
    return user
}

module.exports = {
    create_user,
    get_user,
}
const { get_class } = require("./class")