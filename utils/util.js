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

async function return_students(student_ids, name) {
    const Users = await dbcontroller.getModel("user")
    // fazer bulk utilizando find com filter em $in
    const bulkUser = student_ids.map(id => {
        return ({
            replaceOne: {
                filter: {
                    discord_id: {
                        $in: student_ids
                    }
                },
                replacement: {
                    discord_id: id,
                    name: name,
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

// async function bulkStudInClass(students, classroom)
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

async function professor_in_class(user, classroom) {
    const Users_in_class = await dbcontroller.getModel("user_in_class")
    const professor = await Users_in_class.replaceOne({user, class:classroom},{user, class:classroom},{upsert:true})
    return professor
}
module.exports = {
    find_create_user,
    find_user,
    find_class,
    return_students,
    create_classroom,
    bulkStudInClass,
    professor_in_class,
}