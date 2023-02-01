import React, { useState } from "react";
import "./App.css";

function App() {
  const [index, setIndex] = useState(0);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [done, setDone] = useState([]);

  function addTask(i) {
    if (!task) {
      return;
    }
    setTasks([...tasks, task]);
    setDone([...done, false]);
    setTask("");
  }

  function deleteTask(i) {
    setTasks(tasks.filter((_item, j) => i !== j));
    setDone(done.filter((_item, j) => i !== j));
  }

  function updateTask(i) {
    if (task) {
      setTasks(
        tasks.map((item, j) => {
          if (i - 1 === j) return task;
          return item;
        })
      );
    }
    setTask("");
    setIndex(0);
  }

  function showTask(i) {
    setTask(tasks[i]);
    setIndex(i + 1);
  }

  function doneTask(i) {
    setDone(
      done.map((item, j) => {
        if (i === j) return !item;
        return item;
      })
    );
  }

  return (
    <div>
      <div id="actions-container">
        <input
          type="text"
          placeholder="Add Tasks"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        {Boolean(index) && (
          <input
            type="button"
            value="Update"
            onClick={() => updateTask(index)}
          />
        )}
        {!Boolean(index) && (
          <input type="button" value="Add" onClick={() => addTask()} />
        )}
      </div>
      <div>
        {tasks.map((item, i) => {
          return (
            <span key={i} className={done[i] ? "done" : ""}>
              {!done[i] && (
                <i className="fa-regular fa-square" onClick={() => doneTask(i)}>
                  &ensp;
                </i>
              )}
              {done[i] && (
                <i
                  className="fa-regular fa-square-check"
                  onClick={() => doneTask(i)}
                >
                  &ensp;
                </i>
              )}
              {item}
              <i
                className="fa-regular fa-trash-can task"
                onClick={() => deleteTask(i)}
              ></i>
              <i
                className="fa-regular fa-pen-to-square task"
                onClick={() => showTask(i)}
              ></i>
              <br />
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default App;
