const express = require("express");
const fs = require("fs");

const apiRouter = express.Router();


function Task(id,taskName,isDone){
    this.id = id;
    this.taskName = taskName;
    this.isDone = isDone;

}


apiRouter.get("/",(req,res) => {
    console.log("hi");
    fs.readFile(`${__dirname}/storage.json`,"utf8",(error,data) => {

        if(error){
            console.log(error);
            return;
        }
        tasks = JSON.parse(data);
        
        res.json(tasks);        
        
    })
    
    
});

apiRouter.get("/view/task/:id",(req,res) => {
    id = Number(req.params.id);
    data = fs.readFileSync("storage.json","utf8");
    data = data.toString();

    tasks = JSON.parse(data);

    if(id >= 0 && id < tasks.length){
        res.json(tasks[id]);
    }
    else{
        res.json({
            error: "Task with id :" + id.toString() + " doesn't exist"
        })
    }
    
});



apiRouter.post("/add/task",(req,res)=> {

    data = fs.readFileSync("storage.json","utf8");
    data = data.toString();
    
    id = Math.floor(Math.random()*100000000)
    tasks = JSON.parse(data);
    task = new Task(id,req.body.taskName,false);
    tasks.push(task);
    
    

    fs.writeFile("storage.json",JSON.stringify(tasks),(err,data) => {
        if(err) {
            res.json({
                error : err
            })
        } 
        
        else {
            res.json({
                response : "created successfully",
                task_id : id
            });
        }
    })

}

);

apiRouter.delete("/delete/task/:id",(req,res) => {
    id = Number(req.params.id);
    data = fs.readFileSync("storage.json","utf8");
    data = data.toString();

    tasks = JSON.parse(data);
    
    aInd = tasks.findIndex(x => x.id === id);
    
    if(aInd >= 0){
        tasks.splice(aInd,1);

        fs.writeFile("storage.json",JSON.stringify(tasks),(err,data) => {
            if(err) {
                res.json({
                    error : err
                })
            } 
            
            else {
                res.json({
                    response : "Deleted succussfully",
                    task_id : id
                });
            }
        })
    }

    else{
        res.json({
            error : "task id: " + id + " not found" 
        })
    }



})


apiRouter.put("/update/task/:id",(req,res) => {
    id = Number(req.params.id);
    data = fs.readFileSync("storage.json","utf8");
    //data = data.toString();

    tasks = JSON.parse(data);
    aInd = tasks.findIndex(x => x.id === id);

    if(aInd >= 0){
        
        /*if(req.body.isDone === "true")
            tasks[aInd].isDone = true;

        else    
            tasks[aInd].isDone = false;*/

        tasks[aInd].isDone = !tasks[aInd].isDone

        console.log(tasks[aInd]);
        

        fs.writeFile("storage.json",JSON.stringify(tasks),(err,data) => {
            if(err) {
                res.json({
                    error : err
                })
            } 
            
            else {
                res.json({
                    status : "updated successfully",
                    task : tasks[aInd]
                });
            }
        })
    }

    else
        res.json({
            error : "task with id " + id + " not found"
        })

    
    

})


module.exports.router = apiRouter;