import { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import ToDoList from './ToDoList';
import './index.css';

function App() {
  // ←←← ЭТО ИМЕННО КАК В МЕТОДИЧКЕ НА СТР. 9 ←←←
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  // ←←← ЭТО ТОЖЕ ИМЕННО КАК В МЕТОДИЧКЕ ←←←
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (text.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: text.trim() }]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearAll = () => {
    if (confirm('Очистить все задачи?')) {
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
