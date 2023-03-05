const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema ({
    name: String,
    password: String
});

module.exports = mongoose.model("User", userSchema);