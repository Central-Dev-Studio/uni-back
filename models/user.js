const dbcontroller = require("../dbcontroller")

async function create_user(did,name,guild) {
    const Users = await dbcontroller.getModel("user")
    let classObj = {}
    let classRef = await get_class(guild)
    if (classRef) {

        classObj[guild] = {
            grade: 0.0,
            tasks: [],
            class: classRef._id
        }
    }
    const user = await Users.create({
        name,
        discord_id: did,
        classrooms: classObj
    })
    return user
    
}

async function bulk_user(infos,guild) {
    const Users = await dbcontroller.getModel("user")
    let classRef = await get_class(guild) 
    let path = "classrooms."+guild
    const bulk = infos.map(info => {
        let classObj = {}
        classObj[path] = {
            grade: 0.0,
            tasks: [],
            class: classRef._id
        }
        return {
            updateOne: {
                filter: {discord_id:info[1], name:info[0]},
                update: {
                    $set:classObj
                },
    
                upsert: true,
            }
        }
    })
    
    const response = await Users.bulkWrite(bulk)
    return response
}

async function get_user(did) {
    const Users = await dbcontroller.getModel("user")
    const user = await Users.findOne({discord_id:did})
    return user
}

async function update_professor(did, guild) {
    const Users = await dbcontroller.getModel("user")
    let path = "classrooms."+guild
    let toSet = {}
    let classRef = await get_class(guild)
    toSet[path] = {
        role: "Professor",
        class: classRef._id
    }
    const user = await Users.findOneAndUpdate({discord_id:did},{$set: toSet}, {new:true})
    return user
}

module.exports = {
    create_user,
    get_user,
    bulk_user,
    update_professor,
}
const { get_class } = require("./class")