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

async function return_students(students) {
    const Users = await dbcontroller.getModel("user")
    const bulkUser = students.map(join => {
        return ({
            replaceOne: {
                filter: {
                    discord_id: join[1]
                },
                replacement: {
                    discord_id: join[1],
                    name: join[0],
                },
                upsert: true
            }
        })
    })
    const users = await Users.bulkWrite(bulkUser)
    return users
}

async function create_classroom(guild_id, name) {
    const Classes = await dbcontroller.getModel("class")
    const classroom = await Classes.create({guild_id,name})
    return classroom
}

async function bulkStudInClass(students, classroom) {
    const Users_in_class = await dbcontroller.getModel("user_in_class")
    const bulkStud = students.map(user => {
        return ({
            replaceOne: {
                filter: {user,class:classroom},
                replacement: {user,class:classroom},
                upsert: true
            }
        })
    })
    const to_return = await Users_in_class.bulkWrite(bulkStud)
    return to_return
}

async function professor_in_class(discord_id, name, classroom) {
    const Users = await dbcontroller.getModel("user")
    const user = await Users.replaceOne({discord_id},{discord_id, name}, {upsert: true})
    const Users_in_class = await dbcontroller.getModel("user_in_class")
    const professor = await Users_in_class.replaceOne({user:user._id, class:classroom},{user:user._id, class:classroom, role:"professor"},{upsert:true})
    return professor
}

async function findMany_users(ids) {
    const Users = await dbcontroller.getModel("user")
    const users = await Users.find({discord_id: {$in: ids}})
    return users
}

async function result_find_users(students) {
    await return_students(students)
    students = students.map(join => {
        return join[1]
    })
    const users = await findMany_users(students)
    return users
}

module.exports = {
    find_create_user,
    find_user,
    find_class,
    return_students,
    create_classroom,
    bulkStudInClass,
    professor_in_class,
    findMany_users,
    result_find_users,
}