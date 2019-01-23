const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
var {check} = require("express-validator");

const apiRouter = require("./api");


app = express();

app.set("view engine","ejs");
app.set("views",path.join(__dirname,path.join("views")));


//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/api",apiRouter.router);


//set Static Path

app.use(express.static(path.join(__dirname,"Public")));





app.listen(3000,() => console.log("Server Started at Port 3000"));


