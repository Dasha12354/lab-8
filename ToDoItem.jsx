function ToDoItem({ task, removeTask }) {
  return (
    <li className="todo-item">
      <span>{task.text}</span>
      <button 
        className="delete-btn"
        onClick={() => removeTask(task.id)}
      >
        Удалить
      </button>
    </li>
  );
}

export default ToDoItem;