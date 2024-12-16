const mongoose = require('mongoose')
const { Schema } = mongoose
const categorySchema = new Schema({
    title: { type: String },
    picture: { type: String },
    status: { type: String }
})
module.exports = mongoose.model("category", categorySchema)