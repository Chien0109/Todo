
import { useEffect, useState } from 'react';
import './App.css';
import Task from './Task';
import Taskform from './Taskform';

function App() {

  const [tasks, setTasks] = useState([])

    useEffect(() => {
      if (tasks.length === 0) return;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks])

    useEffect(() => {
      const tasks = JSON.parse(localStorage.getItem('tasks'))
      setTasks(tasks);
    }, [])

  function addTasks(name) {
    setTasks(prev => {
      return [...prev, { name: name, done: false }];
    })
  }

  function removeTask(indexToRemove) {
    setTasks(prev => {
      return prev.filter((taskObject, index) => {
        return index !== indexToRemove;
      })
    });
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev]
      newTasks[taskIndex].done =newDone
      return newTasks
    })
  }

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  function getMassage() {
    const percentage = numberComplete / numberTotal * 100;

    if (percentage === 0) {
      return 'Never stop learning because life never stops teaching'
    }

    if (percentage === 100) {
      return 'Once you stop learning, you will start dying'
    }

    return 'If I fail, I try again and again, and again'
  }
  function renameTask(index, newName) {
    setTasks (prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    })
  }

  return (
    <main>
      <h1>{numberComplete}/{numberTotal} Complete</h1>
      <h2>{getMassage()}</h2>
      <Taskform onAdd = {addTasks}/>
      {tasks.map((task, index )=> (
        <Task {...task} 
        onRename={newName => renameTask(index, newName)}
        onTrash={() => removeTask(index)}
        onToggle = {done => updateTaskDone(index, done)} />
      ))}
    </main>
  );
}

export default App;
