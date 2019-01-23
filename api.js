const express = require("express");
const fs = require("fs");

const apiRouter = express.Router();


function Task(taskName,isDone){
    this.taskName = taskName;
    this.isDone = isDone;
}


apiRouter.get("/",(req,res) => {
    fs.readFile("storage.json","utf8",(error,data) => {
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

    tasks = JSON.parse(data);
    task = new Task(req.body.taskName,false);
    tasks.push(task);


    fs.writeFile("storage.json",JSON.stringify(tasks),(err,data) => {
        if(err) {
            res.json({
                error : err
            })
        } 
        
        else {
            res.json({
                response : "created successfully"
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
    
    if(id >= 0 && id < tasks.length){
        tasks.splice(id,1);

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
    data = data.toString();

    tasks = JSON.parse(data);

    if(id >= 0 && id < tasks.length){
        tasks[id].taskName = req.body.taskName;
        tasks[id].isDone = req.body.isDone;

        fs.writeFile("storage.json",JSON.stringify(tasks),(err,data) => {
            if(err) {
                res.json({
                    error : err
                })
            } 
            
            else {
                res.json({
                    status : "updated successfully",
                    task : tasks[id]
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