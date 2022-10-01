async function delOne() {
    const doc = await this.model.findOne(this.getQuery())
    await this.model.model("user_in_class").deleteMany({user: doc._id})
    await this.model.model("user_task").deleteMany({user: doc._id})
}

module.exports = {
    delOne
}