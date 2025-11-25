import { useState } from 'react';

function AddTaskForm({ addTask }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Что нужно сделать?"
        className="task-input"
      />
      <button type="submit" className="add-btn">Добавить</button>
    </form>
  );
}

export default AddTaskForm;