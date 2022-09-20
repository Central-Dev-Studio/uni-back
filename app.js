const express = require("express")
const port = 3000
const app = express()
const { create_user, get_user, update_professor, bulk_user } = require("./models/user.js")
const { create_class, add_student, set_professor, set_student } = require("./models/class")
require("dotenv/config")
const env = process.env
const dbcontroller = require("./dbcontroller")

// ENDPOINTS    

//  USERS:
app.post("/create_user", async (req,res)=> {
    console.log("Creating user...")
    if (req.query.did && req.query.name && req.query.guild) {
        const newUser = await create_user(req.query.did, req.query.name, req.query.guild)
        if (newUser) {
            console.log("Success!")
            res.status(200)
            res.send({message: "Success!", user: newUser})
            return
        } else {
            console.log("Error!")
            res.status(402)
            res.send({message: "Couldn't create user!"})
        }

    } else {
        console.log("Bad Request!")
        res.status(401)
        res.send({message: "Missing information!"})
        return
    }

})

app.get("/user", async (req,res)=> {
    console.log("Getting user...")
    if (req.query.did) {
        const user = await get_user(req.query.did)
        if (user) {
            console.log("Success!")
            res.status(200)
            res.send(user)
        } else {
            console.log("Error!")
            res.status(402)
            res.send({message: "Coudn't get user!"})
        }
    } else {
        console.log("Bad Request!")
        res.status(401)
        res.send({message: "Missing did data!"})
    }
})

//  CLASSES:
app.post("/create_class", async (req,res)=> {
    console.log("Creating class...")
    if (req.query.guild && req.query.name) {
        const classroom = await create_class(req.query.guild, req.query.name)
        if (classroom) {
            console.log("Success!")
            res.status(200)
            res.send({message: "Success!", class: classroom})
            return
        } else {
            console.log("Error!")
            res.status(402)
            res.send({message: "Couldn't create classroom!"})
            return
        }
    } else {
        console.log("Bad Request!")
        res.status(401)
        res.send({message: "Missing information!"})
        return
    }
})

app.post("/add_student", async (req,res)=> {
    console.log("Adding student...")
    if (req.query.did && req.query.guild) {
        const updStu = await add_student(req.query.did, req.query.guild)
        if (updStu) {
            console.log("Success!")
            res.status(200)
            res.send({message: "Success!", class: updStu})
        } else {
            console.log("Error!")
            res.status(402)
            res.send({message: "Couldn't add student!"})
        }
    } else {
        console.log("Bad Request!")
        res.status(401)
        res.send({message: "Missing information!"})
    }
})

app.post("/setup_class", async (req,res)=> {
    console.log("Setting up class...")
    if (req.query.dids && req.query.guild && req.query.prof) {
        req.query.dids = JSON.parse(req.query.dids)
        let all_u = req.query.dids.map(e=> {
            return e
        })
        all_u.push([req.query.prof_name,req.query.prof])
        const students = await bulk_user(all_u, req.query.guild)
        const classroom = await set_student(req.query.dids,req.query.guild)
        const professor_class = await set_professor(req.query.prof, req.query.guild)
        const professor = await update_professor(req.query.prof, req.query.guild)
        
        if (classroom && professor_class && professor && students) {
            console.log("Success!")
            res.status(200)
            res.send({message: "Success!"})
        } else {
            console.log("Error!")
            res.status(402)
            res.send({message: "Coudn't setup class!"})
        }
    } else {
        console.log("Bad request!")
        res.status(401)
        res.send({message: "Missing information!"})
    }
})

// API START

app.listen(port, async () => {
    await dbcontroller.connectDatabase()
    console.log(`Listening at port ${port}`)
})