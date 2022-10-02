async function delOne() {
    const doc = await this.model.findOne(this.getQuery())
    if (doc) {
        await this.model.model("user_in_class").deleteMany({user: doc._id})
        await this.model.model("user_task").deleteMany({user: doc._id})
        console.log("delOne user hook: ok")
    }
}

module.exports = {
    delOne
}