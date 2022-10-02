async function delOne() {
    const doc = await this.model.findOne(this.getQuery())
    if (doc) {
        await this.model.model("user_in_class").deleteMany({class: doc._id})
        await this.model.model("task").deleteMany({class: doc._id})
        console.log("delOne class hook activated")
    } 
}

module.exports = {
    delOne
}