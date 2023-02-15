const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const aboutpp = new mongoose.Schema({
    UserId:{
        type:ObjectId,
        ref:"User"
    },
   about : {
            type: String,
            required:true,
            default:"About me"

    },
    photo:{
        data:Buffer,
        contentType:String
    }

});

module.exports = mongoose.model("aboutpp",aboutpp);