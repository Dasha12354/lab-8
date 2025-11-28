import { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import ToDoList from './ToDoList';
import './index.css';

function App() {
  // Это наше состояние — массив задач
  const [tasks, setTasks] = useState([]);

  // 1. При загрузке страницы — достаём задачи из браузера
  useEffect(() => {
    const savedTasks = localStorage.getItem('my-todo-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);   // пустой массив = выполнится только один раз при старте

  // 2. Каждый раз, когда tasks меняется — сохраняем в браузер
  useEffect(() => {
    localStorage.setItem('my-todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (!text.trim()) return;
    const newTask = { id: Date.now(), text: text.trim() };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearAll = () => {
    setTasks([]);
  };

  return (
    <div className="app">
      <h1>Мои задачи</h1>
      
      <AddTaskForm addTask={addTask} />
      
      <ToDoList tasks={tasks} removeTask={removeTask} />
      
      {tasks.length > 0 && (
        <button className="clear-all" onClick={clearAll}>
          Очистить всё
        </button>
      )}
    </div>
  );
}

export default App;
