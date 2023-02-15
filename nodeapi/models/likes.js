const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const like = new mongoose.Schema({

    UserId: {
        type: ObjectId,
        ref: "User"
    },
    PostId: {
        type: ObjectId,
        ref: "Post"
    },
    Value:{
        type:String,
        default:0
    }
});

module.exports = mongoose.model("like", like);