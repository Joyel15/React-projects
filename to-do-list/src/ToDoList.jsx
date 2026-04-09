import React, {useState,useEffect} from "react";

function ToDoList(){

const [tasks,setTasks] = useState(()=>{
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : ["Drink 3L Water","Read a book","Workout"] ;
});

const [newTask,setNewTask] = useState();

useEffect(() => {
  localStorage.setItem("tasks",JSON.stringify(tasks));
},[tasks]);

function handleInput(event){
 setNewTask(event.target.value);
}

function addTask(){
    if(newTask.trim() !== ""){
      setTasks(t => [...t,newTask])
      setNewTask("");
    }
}

function deleteTask(index){
  const updatedTasks = tasks.filter((_,i) => i !== index)
  setTasks(updatedTasks);
}

function moveTaskUp(index){

  if(index > 0){
    const updatedTasks = [...tasks];
    [updatedTasks[index],updatedTasks[index-1]] = [updatedTasks[index - 1],updatedTasks[index]]
    setTasks(updatedTasks);
  }

}

function moveTaskDown(index){
if(index < tasks.length-1){
    const updatedTasks = [...tasks];
    [updatedTasks[index],updatedTasks[index + 1]] = [updatedTasks[index + 1],updatedTasks[index]]
    setTasks(updatedTasks);
  }
}

  return(
  <div className="flex justify-center">

<div className="flex flex-col justify-center bg-amber-200 p-15 m-3 rounded-3xl outline-1">
<h2 className="text-4xl font-bold text-blue-800 text-center mb-4">TO-DO-LIST</h2>

<div>
<input type="text" value={newTask} onChange={handleInput} placeholder="Enter new task"
className="p-3 bg-white rounded-xl outline-1 outline-gray-400 text-2xl"/>
<button onClick={addTask} className="bg-blue-700 text-white p-2 rounded-xl ml-2 text-2xl">
  ADD</button>
</div>

<ol className="list-decimal list-inside">
  {tasks.map((task,index) =>
     <li key={index} className="text-2xl p-2 m-2">
      <span className="text-2xl text-orange-600 font-bold ">{task}</span>
      
      <div>
      <button onClick={() => deleteTask(index)} 
        className="bg-red-700 text-white text-xl p-2 rounded-xl m-1 px-2 py-1"
        >DELETE</button>

      <button onClick={() => moveTaskUp(index)}
        className="bg-green-700 text-white
         text-xl px-2 py-1 rounded-xl m-1"
        >UP</button>

      <button onClick={() => moveTaskDown(index)}
        className="bg-yellow-400 text-white text-xl px-2 py-1 rounded-xl m-1"
        >DOWN</button>
      </div>
     </li>    
  )}
</ol>

</div>
</div>)
}

export default ToDoList;