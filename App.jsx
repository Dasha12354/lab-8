import { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import ToDoList from './ToDoList';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);

  // ←←← ЭТО САМОЕ ГЛАВНОЕ — загрузка при старте
  useEffect(() => {
    const saved = localStorage.getItem('laba8-tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // ←←← ЭТО сохраняет при любом изменении
  useEffect(() => {
    localStorage.setItem('laba8-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (text.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: text.trim() }]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearAll = () => {
    if (confirm('Точно очистить все задачи?')) {
      setTasks([]);
    }
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
