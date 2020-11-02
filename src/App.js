import React, { useState, useEffect } from 'react';
import './App.css';



function App() {

  const tasksModel = [
    {
      id: 1,
      description: "Do coding challenges",
      isActive: true,
      isCompleted: false
    },
    {
      id: 1,
      description: "Do coding challenges",
      isActive: true,
      isCompleted: false
    },
    {
      id: 1,
      description: "Do coding challenges",
      isActive: false,
      isCompleted: true
    }
  ]

  //Local state that represents the tasks data
  const [tasks, setTasks] = useState([]);

  //Local state that represents the selected filter selected by the user
  const [filter, setFilter] = useState('');

  //Only on the first rendering of the componenet 
  //No dependence
  useEffect(() => {
    setTasks(tasksModel);
  }, []);

  //If filter state change do...
  useEffect(() => {

  }, [filter])

  //Handler to call when the filter value is selected by the user...
  function filterChange(e) {
    //... and we set filter local state to its new value
    setFilter(e.target.value);
  }

  return (
    <div className="App">
      <h1>#Todo</h1>

      <form>
        <fieldset onChange={filterChange}>
          <label htmlFor="all"><input type="radio" value="" name="filter" id="all" /><span>all</span></label>
          <label htmlFor="active"><input type="radio" value="isActive" name="filter" id="active" /><span>active</span></label>
          <label htmlFor="completed"><input type="radio" value="isCompleted" name="filter" id="completed" /><span>completed</span></label>
        </fieldset>
        <div>
          <label htmlFor="task" style={{ display: "none" }}></label>
          <input type="text" name="task" id="task" placeholder="add details" />
          <input type="submit" value="add" />
        </div>
        <div>
          <ul>
            <li><input type="checkbox" name="" id="" /><label htmlFor="">Do coding challenges</label></li>
            <li><input type="checkbox" name="" id="" /><label htmlFor="">Do coding challenges</label></li>
            <li><input type="checkbox" name="" id="" /><label htmlFor="">Do coding challenges</label></li>
          </ul>
        </div>
      </form>
    </div>
  );
}

export default App;