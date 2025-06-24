const express=require("express");
const bp=require("body-parser");
const fs=require("fs");

const app=express();
app.use(bp.json());

function readFile(){
    if(!fs.existsSync('tasks.json')){
        return [];
    }
    // const filecontent=fs.readFileSync("tasks.json","utf8");
    // const tasks=JSON.parse(filecontent);
    const data=fs.readFileSync('tasks.json','utf8').trim();
    if(data==="") return [];
    return JSON.parse(data);

}

function writeFile(tasks){
    fs.writeFileSync('tasks.json',JSON.stringify(tasks));
}

app.post('/tasks',(req,res)=>{
    const input=req.body;
    let tasks=readFile();
    tasks=[...tasks,input];
    writeFile(tasks);
    res.send("Task added succesfully.");
});

app.get('/tasks',(req,res)=>{
     const tasks = readFile(); 

    if (tasks.length === 0) {
        return res.status(200).json({ message: "There is nothing present", tasks: [] });
    }

    res.json({ tasks });
});

app.delete('/tasks/:index',(req,res)=>{
           const tasks=readFile();
           tasks.splice(req.params.index,1);
           writeFile(tasks);
           res.send("task deleted succesfully.");
});


app.listen(3000,()=>console.log("The server is running on PORT:3000"));