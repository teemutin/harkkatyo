//schema for post
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postSchema = new Schema ({
    author: String,
    header: String,
    post: String
});

module.exports = mongoose.model("Post", postSchema);