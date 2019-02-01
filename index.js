const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
var {check} = require("express-validator");

const cors = require('cors');

const apiRouter = require("./api");
//const FILE = require("storage.json")
//var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
//var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
 
var port = process.env.PORT || 3000;

app = express();

app.set("view engine","ejs");
app.set("views",path.join(__dirname,path.join("views")));


//Body Parser Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/api",apiRouter.router);

app.get("/",(req,res) => {
  res.json("Connection Success");
})
//set Static Path

app.use(express.static(path.join(__dirname,"Public")));




app.listen(port,() => {
  console.log(`Listening on PORT ${port}`)
});

