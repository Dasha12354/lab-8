import { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import ToDoList from './ToDoList';
import './index.css';

function App() {
  // Главное состояние — массив задач
  const [tasks, setTasks] = useState([]);

  // ← ЭТО ГЛАВНОЕ: загружаем задачи из localStorage при старте
  useEffect(() => {
    const savedTasks = localStorage.getItem('laba8-todo');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []); // [] = только один раз при загрузке страницы

  // ← ЭТО сохраняет задачи каждый раз, когда они меняются
  useEffect(() => {
    localStorage.setItem('laba8-todo', JSON.stringify(tasks));
  }, [tasks]);

  // Добавление задачи
  const addTask = (text) => {
    if (text.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: text.trim()
    };
    setTasks([...tasks, newTask]);
  };

  // Удаление задачи
  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Очистить всё
  const clearAll = () => {
    if (confirm('Удалить все задачи?')) {
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
