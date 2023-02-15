const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const follows = new mongoose.Schema({
    UserId: {
        type: ObjectId,
        ref: "User"
    },

    following: [{ type: ObjectId, ref: "User" }],
    followers: [{ type: ObjectId, ref: "User" }],

});

module.exports = mongoose.model("follows", follows);