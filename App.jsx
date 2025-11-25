import { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import ToDoList from './ToDoList';
import './index.css'; // подключаем стили

function App() {
  const [tasks, setTasks] = useState([]);

  // Загружаем задачи из localStorage при старте
  useEffect(() => {
    const saved = localStorage.getItem('todo-tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // Сохраняем в localStorage при любом изменении tasks
  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (text.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: text.trim()
    };
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