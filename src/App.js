import React, { useState, useEffect } from 'react';
import './App.scss';


const tasksModel = [
  {
    id: 1,
    description: "Do coding challenges",
    isActive: true,
    isCompleted: false
  },
  {
    id: 2,
    description: "Do coding challenges",
    isActive: true,
    isCompleted: false
  },
  {
    id: 3,
    description: "Do coding challenges",
    isActive: false,
    isCompleted: true
  }
]

function App() {

  //Local state that represents the tasks data
  const [tasks, setTasks] = useState([]);

  //Local state that represents the task that is being created by the user
  const [createdTask, setCreatedTask] = useState('');

  const [filtredTasks, setFiltredTasks] = useState([]);

  //Local state that represents the selected filter selected by the user
  const [filter, setFilter] = useState('');

  //Only on the first rendering of the componenet 
  //No dependence
  useEffect(() => {
    setTasks(tasksModel);
    setFiltredTasks(tasksModel);
  }, []);

  //If filter state change do...
  useEffect(() => {
    if (filter) {
      //Create a new tasks array filtred depending on the value of filter
      setFiltredTasks(tasks.filter(task => task[filter]));
    } else {
      //Otherwise, set filtredTasks to the original array of tasks
      setFiltredTasks(tasks);
    }


  }, [filter, tasks])

  //Handler to call when the filter value is selected by the user...
  function filterChange(e) {
    //... and we set filter local state to its new value
    setFilter(e.target.value);
  }

  //Handler to call when user needs to add a task
  function submitTask(e) {
    e.preventDefault();

    //Create a new task data object
    const task = {
      //Generate a random id
      id: Math.floor(Math.random() * 100),
      description: createdTask,
      isActive: true,
      isCompleted: false
    }

    //Add this tasks to a new array created from the original tasks array
    let currentTasks = [...tasks, task];

    //Set tasks local state with this new array => avoid mutation of array
    setTasks(currentTasks);
  }

  function inputChange(e) {
    setCreatedTask(e.target.value);
  }

  function checkTask(e, id) {
    // console.log(!!e.target.checked);
    //If the task is checked by the user => isActive = false & isCompleted = true
    //else => isActive = true & isCompleted = false

    //Get the task and copy it thanks to the spread operator 
    const task = { ...tasks.find(task => task.id === id) };
    task.isActive = !e.target.checked;
    task.isCompleted = e.target.checked;

    let currentTasks = [...tasks];
    //Remove the original task and add its copy => avoid mutation
    currentTasks = currentTasks.filter(task => task.id !== id);

    //Add the copy of the task 
    currentTasks.push(task);

    setTasks(currentTasks);
  }

  return (
    <div className="todo">
      <h1 className="todo__title">#Todo</h1>

      <form className="todo__form" onSubmit={submitTask}>
        <fieldset className="todo__fieldset" onChange={filterChange}>
          <label htmlFor="all"><input type="radio" value="" name="filter" id="all" defaultChecked /><span>all</span></label>
          <label htmlFor="active"><input type="radio" value="isActive" name="filter" id="active" /><span>active</span></label>
          <label htmlFor="completed"><input type="radio" value="isCompleted" name="filter" id="completed" /><span>completed</span></label>
        </fieldset>
        <div>
          <label htmlFor="task" style={{ display: "none" }}></label>
          <input value={createdTask} onChange={inputChange} type="text" name="task" id="task" placeholder="add details" />
          <input type="submit" value="add" />
        </div>
        <div>
          <ul>
            {filtredTasks.map(task => {
              return (
                <li key={task.id}><input defaultChecked={task.isCompleted} type="checkbox" name="task" id="" onChange={(e) => checkTask(e, task.id)} /><label htmlFor="">{task.description}</label></li>
              )
            })}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default App;
