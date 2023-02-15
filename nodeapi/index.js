const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const fs = require('fs');
const cors = require('cors');
var cookieParser = require('cookie-parser')
dotenv.config();

//db
mongoose.connect(process.env.MONGO_URI)
.then(function() {
    console.log("DB Connected");

})

mongoose.connection.on("error", function (err){
    console.log("DB connection error : "+err.message)
});

//bring routes;
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//apiDocs
app.get('/',(req,res)=>{
  fs.readFile('docs/apiDocs.json',(err,data)=>{
    if(err){
      res.status(400).json({
        error:err
      });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});

// const myOwnMiddleware = function(req,res,next){
//     console.log("Middleware applied");
//     next();
// }

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(expressValidator());
app.use(cors());
// app.use(myOwnMiddleware);
app.use("/",postRoutes);
app.use("/",authRoutes);
app.use("/",userRoutes);

app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      res.status(401).json({error: "unauthorized!"});
    } else {
      next(err);
    }
  });

const port = process.env.PORT || 8080;//if not available, basic 8080

app.listen(port, function(){

console.log("A node Js api is listening on port "+ port)

});            