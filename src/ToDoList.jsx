import React,{useState} from "react"

function ToDoList(){
     const [tasks,setTasks]=useState([]);
     const [newTask,setNewTask]=useState("");

     function handleInputChange(event){
        setNewTask(event.target.value);
        }

     
 
     function addTask(){
        if(newTask.trim()!==""){
        setTasks((t)=>[...t,newTask]);
        setNewTask("");}

     }

     function deleteTask(index){
        const newTasks = tasks.filter((value, i)=>i!=index);
        setTasks(newTasks);


     }

     function moveTaskUp(index){
       if(index>0){
        const updateTask=[...tasks];
        [updateTask[index],updateTask[index-1]]=[updateTask[index-1],updateTask[index]];
        setTasks(updateTask);
       }

     }

     function moveTaskDown(index){
      if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = 
      [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
         
     }
     return(
     <div className="to-do-list">
            <h1>To-Do-List</h1>
            <div>
                <input
                   type="text"
                   placeholder="Enter your text here"
                   value={newTask}
                   onChange={handleInputChange}/>
                <button className="add-button"
                        onClick={addTask}>ADD</button>
                <ol>
                    {tasks.map((task,index)=>
                     <li key={index}>
                     <span className="text">{task}</span>
                      <button
                        className="move-button"
                        onClick={()=>moveTaskUp(index)}>
                        👆
                      </button>
                      <button
                        className="move-button"
                        onClick={()=>moveTaskDown(index)}>
                            👇
                      </button>      
                      
                      <button
                        className="delete-button"
                        onClick={()=>deleteTask(index)}>
                         ❌
                      </button>
                     </li>
                    
                    )}
                </ol>
            </div>
     </div>);
}
export default ToDoList 