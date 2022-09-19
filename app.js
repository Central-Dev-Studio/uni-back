const express = require("express")
const port = 3000
const app = express()
const { create_user, get_user } = require("./models/user.js")
const { create_class, add_student } = require("./models/class")
require("dotenv/config")
const env = process.env
const dbcontroller = require("./dbcontroller")

// ENDPOINTS    

//  USERS:
app.post("/create_user", async (req,res)=> {
    if (req.query.did && req.query.name && req.query.guild) {
        const newUser = await create_user(req.query.did, req.query.name, req.query.guild)
        if (newUser) {
            res.status(200)
            res.send({message: "Success!", user: newUser})
            return
        } else {
            res.status(402)
            res.send({message: "Couldn't create user!"})
        }

    } else {
        res.status(401)
        res.send({message: "Missing information!"})
        return
    }

})

app.get("/user", async (req,res)=> {
    if (req.query.did) {
        const user = await get_user(req.query.did)
        if (user) {
            res.status(200)
            res.send(user)
        } else {
            res.status(402)
            res.send({message: "Coudn't get user!"})
        }
    } else {
        res.status(401)
        res.send({message: "Missing did data!"})
    }
})

//  CLASSES:
app.post("/create_class", async (req,res)=> {
    if (req.query.guild && req.query.name) {
        const classroom = await create_class(req.query.guild, req.query.name)
        if (classroom) {
            res.status(200)
            res.send({message: "Success!", class: classroom})
            return
        } else {
            res.status(402)
            res.send({message: "Couldn't create classroom!"})
            return
        }
    } else {
        res.status(401)
        res.send({message: "Missing information!"})
        return
    }
})

app.post("/add_student", async (req,res)=> {
    if (req.query.did && req.query.guild) {
        const updStu = await add_student(req.query.did, req.query.guild)
        if (updStu) {
            res.status(200)
            res.send({message: "Success!", class: updStu})
        } else {
            res.status(402)
            res.send({message: "Couldn't add student!"})
        }
    } else {
        res.status(401)
        res.send({message: "Missing information!"})
    }
})

// API START

app.listen(port, async () => {
    await dbcontroller.connectDatabase()
    console.log(`Listening at port ${port}`)
})